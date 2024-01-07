import { Header } from './header/Header'
import { Map } from './map/Map'
import { List } from './list/List'
import { Divider } from '@ui-kitten/components'
import { theme } from '../../theme'
import { StopETA, RouteStop, Stop } from '../../type'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Axios } from '../../store/slice/Axios'
import { useEffect, useState } from 'react'
import i18n from '../../i18n'

const stopName = (stop: Stop) => {
  if (i18n.language === 'en') return stop.name_en
  if (i18n.language === 'zh') return stop.name_tc
  if (i18n.language === 'zh_cn') return stop.name_sc
}

export const Detail = (props): React.ReactElement => {
  const { baseURL } = useSelector(Axios)
  const stopEta: StopETA = props.route.params.stopEta
  const [stops, setStops] = useState<Stop[]>()

  const initStops = () => {
    const { route, dir, service_type } = stopEta
    const getDirection = () => {
      if (dir === 'O') return 'outbound'
      if (dir === 'I') return 'inbound'
    }
    axios.get(`${baseURL}/v1/transport/kmb/route-stop/${route}/${getDirection()}/${service_type}`).then(routeStopsResponse => {
      if (!Array.isArray(routeStopsResponse.data.data)) return
      const routeStops: RouteStop[] = routeStopsResponse.data.data
      Promise.all(routeStops.map(routeStop => axios.get(`${baseURL}/v1/transport/kmb/stop/${routeStop.stop}`))).then(stopResponses => {
        setStops(stopResponses.map(stopResponse => stopResponse.data.data))
      }).catch(err => console.error(err))
    }).catch(err => console.error(err))
  }

  useEffect(() => {
    initStops()
  }, [])

  return (
    <>
      <Header {...props} />
      <Map stops={stops} stopName={stopName} {...props} />
      <Divider style={{ backgroundColor: theme.main, height: 5 }} />
      <List stops={stops} stopName={stopName} {...props} />
    </>
  )
}