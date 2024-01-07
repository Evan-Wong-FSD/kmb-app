import React, { useEffect, useState } from 'react'
import { Icon, IconElement, Menu, MenuGroup, MenuItem, IndexPath, Spinner } from '@ui-kitten/components'
import { StopETA, Stop, RouteEtaToStop, ETA, Location } from '../../../type'
import { View } from 'react-native'
import { Dimensions } from 'react-native'
import axios from 'axios'
import { Axios } from '../../../store/slice/Axios'
import { useSelector, useDispatch } from 'react-redux'
import { changeLocation } from '../../../store/slice/Map'

const windowHeight = Dimensions.get('window').height
const menuGroupHeight = windowHeight * 0.07
const waitingMinutes = (eta, dataTimestamp) => {
  const time = (timestamp) => new Date(timestamp).getTime()
  return new Date(time(eta) - time(dataTimestamp)).getMinutes()
}
const PinIcon = (props): IconElement => (<Icon {...props} name='pin' />)
const blankMenuItem = () => new Array(3).fill(null).map((elem, index) => (<MenuItem key={index} title='--分鐘' />))

export const List = (props): React.ReactElement => {
  const { baseURL } = useSelector(Axios)
  const stopEta: StopETA = props.route.params.stopEta
  const dispatch = useDispatch(), setLocation = (coords: Location) => dispatch(changeLocation(coords))
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>()
  const [routeEtaToStops, setRouteEtaToStops] = useState<RouteEtaToStop[]>([])

  const newRouteEtaToStop = async (stopId) => {
    const routeEtaToStop: RouteEtaToStop = { stopId, etas: new Array(3).fill(null) }
    const res = await axios.get(`${baseURL}/v1/transport/kmb/eta/${stopId}/${stopEta.route}/${stopEta.service_type}`)
    for (let i = 0; i < res.data.data.length; i++) {
      const elem: ETA = res.data.data[i]
      routeEtaToStop.etas[i] = waitingMinutes(elem.eta, elem.data_timestamp)
    }
    return routeEtaToStop
  }

  const updateRouteEtaToStops = async () => {
    const routeEtaToStopsClone: RouteEtaToStop[] = JSON.parse(JSON.stringify(routeEtaToStops))
    Promise.all(routeEtaToStopsClone.map(async (routeEtaToStop: RouteEtaToStop) => await newRouteEtaToStop(routeEtaToStop.stopId)))
      .then(newRouteEtaToStops => setRouteEtaToStops(newRouteEtaToStops))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    if (routeEtaToStops.length === 0) return
    setTimeout(async () => await updateRouteEtaToStops(), 1000 * 30)
  }, [routeEtaToStops])

  useEffect(() => {
    (async () => {
      if (!props.stops) return
      const stopIndex = props.stops.findIndex((stop: Stop) => stop.stop === stopEta.stopId)
      setSelectedIndex(new IndexPath(stopIndex))
      Promise.all(props.stops.map(async (stop: Stop) => (await newRouteEtaToStop(stop.stop))))
        .then(newRouteEtaToStops => setRouteEtaToStops([...routeEtaToStops, ...newRouteEtaToStops]))
        .catch(err => console.error(err))
    })()
  }, [props.stops])

  return (
    <>
      {
        props.stops && selectedIndex
          ? (
            <Menu
              selectedIndex={selectedIndex}
              onSelect={index => { setSelectedIndex(index) }}
              style={{ flex: 1 }}
              initialScrollIndex={selectedIndex.row}
              getItemLayout={(data, index) => ({ length: menuGroupHeight, offset: menuGroupHeight * index, index })}
            >
              {props.stops.map((stop: Stop, stopIndex) => {
                return (
                  <MenuGroup
                    key={stopIndex}
                    title={props.stopName(stop)}
                    accessoryLeft={PinIcon}
                    initiallyExpanded={stopEta.stopId === stop.stop}
                    style={{ height: menuGroupHeight }}
                    onPress={() => setLocation({
                      coords: {
                        latitude: Number(stop.lat),
                        longitude: Number(stop.long),
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001
                      }
                    })}
                  >
                    {
                      stopEta.eta
                        ? routeEtaToStops.length > 0 && routeEtaToStops[stopIndex] && routeEtaToStops[stopIndex].etas.length > 0
                          ? routeEtaToStops[stopIndex].etas.map((eta: number, index) => (<MenuItem key={index} title={`${eta || '--'}分鐘`} />))
                          : blankMenuItem()
                        : blankMenuItem()
                    }
                  </MenuGroup>
                )
              })}
            </Menu>
          )
          : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Spinner size='giant' />
            </View>
          )
      }
    </>
  )
}