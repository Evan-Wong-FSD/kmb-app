import { VirtualizedList, StyleSheet, View } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { Axios } from '../../../store/slice/Axios'
import { useCallback, useEffect, useState } from "react"
import axios from 'axios'
import { Stop, StopETA, Coordinates } from '../../../type'
import { Item } from './item/Item'
import { Spinner } from "@ui-kitten/components"
import * as Location from 'expo-location'
import { getDistance } from 'geolib'
import { selectStopEtas, setStopEtas } from '../../../store/slice/StopEtas'
import { useFocusEffect } from "@react-navigation/native"

const generateId = () => Math.random().toString(12).substring(0)

export const List = (props): React.ReactElement => {
  const { baseURL } = useSelector(Axios)
  const dispatch = useDispatch(), dispatchSetStopEtas = payload => dispatch(setStopEtas(payload))
  const [stopBFA3460955AC820C, setStopBFA3460955AC820C] = useState<Stop>()
  const [stop5FB1FCAF80F3D97D, setStop5FB1FCAF80F3D97D] = useState<Stop>()
  // const [stopEtas, setStopEtas] = useState<StopETA[]>()
  const itemProps = { stopBFA3460955AC820C, stop5FB1FCAF80F3D97D }
  const [refresh, setRefresh] = useState(false)
  const [userCoordinates, setUserCoordinates] = useState<Coordinates>()
  const stopEtasState: StopETA[] = useSelector(selectStopEtas).stopEtas

  const setStop = (stopId, set) => {
    axios.get(`${baseURL}/v1/transport/kmb/stop/${stopId}`).then(res => {
      if (res.data) set(res.data.data)
    })
  }

  const ascend = values => {
    const stopCoordinates = stopId => {
      if (stopId === 'BFA3460955AC820C') return { latitude: stopBFA3460955AC820C.lat, longitude: stopBFA3460955AC820C.long }
      if (stopId === '5FB1FCAF80F3D97D') return { latitude: stop5FB1FCAF80F3D97D.lat, longitude: stop5FB1FCAF80F3D97D.long }
    }
    return values.sort((x, y) => getDistance(userCoordinates, stopCoordinates(x.stopId)) - getDistance(userCoordinates, stopCoordinates(y.stopId)))
  }

  const resetStopEta = (stopIds, set) => {
    setRefresh(true)
    Promise.all(stopIds.map(stopId => axios.get(`${baseURL}/v1/transport/kmb/stop-eta/${stopId}`))).then(responses => {
      let values = []
      for (let i = 0; i < responses.length; i++) {
        const response = responses[i], stopId = stopIds[i]
        if (response.data) values.push(...response.data.data.map(elem => ({ id: generateId(), stopId, ...elem })))
      }
      if (userCoordinates && stopBFA3460955AC820C && stop5FB1FCAF80F3D97D) values = ascend(values)
      set(values)

      setRefresh(false)
    }).catch(err => console.error(err))
  }

  const getUserCoordinates = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return
    }
    let location = await Location.getCurrentPositionAsync({});
    setUserCoordinates({ latitude: location.coords.latitude, longitude: location.coords.longitude })
  }

  useFocusEffect(
    useCallback(() => {
      setStop('BFA3460955AC820C', setStopBFA3460955AC820C)
      setStop('5FB1FCAF80F3D97D', setStop5FB1FCAF80F3D97D)
      // resetStopEta(['BFA3460955AC820C', '5FB1FCAF80F3D97D'], setStopEtas)
      resetStopEta(['BFA3460955AC820C', '5FB1FCAF80F3D97D'], dispatchSetStopEtas)
      // const scheduleResetStopEta = setInterval(() => resetStopEta(['BFA3460955AC820C', '5FB1FCAF80F3D97D'], setStopEtas), 1000 * 30)
      const scheduleResetStopEta = setInterval(() => resetStopEta(['BFA3460955AC820C', '5FB1FCAF80F3D97D'], dispatchSetStopEtas), 1000 * 30)
      ; (async () => await getUserCoordinates())()
      return () => {
        clearInterval(scheduleResetStopEta)
      }
    }, [])
  )

  // useEffect(() => {
  //   setStop('BFA3460955AC820C', setStopBFA3460955AC820C)
  //   setStop('5FB1FCAF80F3D97D', setStop5FB1FCAF80F3D97D)
  //   // resetStopEta(['BFA3460955AC820C', '5FB1FCAF80F3D97D'], setStopEtas)
  //   resetStopEta(['BFA3460955AC820C', '5FB1FCAF80F3D97D'], dispatchSetStopEtas)
  //   // const scheduleResetStopEta = setInterval(() => resetStopEta(['BFA3460955AC820C', '5FB1FCAF80F3D97D'], setStopEtas), 1000 * 30)
  //   const scheduleResetStopEta = setInterval(() => resetStopEta(['BFA3460955AC820C', '5FB1FCAF80F3D97D'], dispatchSetStopEtas), 1000 * 30)
  //   ;(async () => await getUserCoordinates())()
  //   return () => {
  //     clearInterval(scheduleResetStopEta)
  //   }
  // }, [])

  return (
    <>
      {
        // (stopBFA3460955AC820C && stop5FB1FCAF80F3D97D && stopEtas && stopEtas.length > 0)
        (stopBFA3460955AC820C && stop5FB1FCAF80F3D97D && stopEtasState && stopEtasState.length > 0)
          ? (
            <VirtualizedList
              data={stopEtasState.filter(elem => elem.eta_seq === 1)}
              initialNumToRender={10}
              renderItem={({ item }) => <Item stopEta={item} {...itemProps} {...props} />}
              keyExtractor={(item: StopETA) => item.id}
              getItemCount={data => data.length}
              getItem={(data, index) => data[index]}
              refreshing={refresh}
              // onRefresh={() => { resetStopEta(['BFA3460955AC820C', '5FB1FCAF80F3D97D'], setStopEtas) }}
              onRefresh={() => { resetStopEta(['BFA3460955AC820C', '5FB1FCAF80F3D97D'], dispatchSetStopEtas) }}
            />
          )
          : (
            <View style={styles.spinnerContainer}>
              <Spinner size="giant" />
            </View>
          )
      }
    </>

  )
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%'
  }
})