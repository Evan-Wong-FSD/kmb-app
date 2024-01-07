import React, { useEffect, useRef } from 'react'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, Dimensions, View, Image, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { StopETA, Location } from '../../../type'
import { map, changeLocation } from '../../../store/slice/Map'
import { Spinner, Text } from '@ui-kitten/components'
import busStop from '../../../assets/icon/busStop.png'
import selectedLocation from '../../../assets/icon/selectedLocation.png'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export const Map = (props): React.ReactElement => {
  const stopMarkerRef = useRef(null)
  const mapViewRef = useRef(null)
  const location: Location = useSelector(map).location
  const dispatch = useDispatch(), setLocation = (coords: Location) => dispatch(changeLocation(coords))
  const stopEta: StopETA = props.route.params.stopEta

  useEffect(() => {
    if (!props.stops) return
    const { lat, long } = props.stops.find(stop => stop.stop === stopEta.stopId)
    setLocation({
      coords: {
        latitude: Number(lat),
        longitude: Number(long),
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      }
    })
  }, [props.stops])

  useEffect(() => {
    if (stopMarkerRef.current) {
      if (Platform.OS === 'android') stopMarkerRef.current.showCallout()
      if (Platform.OS === 'ios') stopMarkerRef.current.redrawCallout()
    }
  }, [stopMarkerRef.current])

  useEffect(() => {
    if (mapViewRef.current && Platform.OS === 'android') {
      mapViewRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: location.coords.latitudeDelta,
        longitudeDelta: location.coords.longitudeDelta,
      }, 1000)
    }
  }, [location])

  return (
    props.stops ? (
      <MapView
        ref={mapViewRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={Platform.OS === 'ios' ? ({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: location.coords.latitudeDelta,
          longitudeDelta: location.coords.longitudeDelta,
        }) : null}
      >
        {
          props.stops.map((stop, index) => (
            <Marker
              key={index}
              ref={stop.stop === stopEta.stopId ? stopMarkerRef : null}
              coordinate={{
                latitude: Number(stop.lat),
                longitude: Number(stop.long)
              }}
            >
              <Image source={stop.stop === stopEta.stopId ? selectedLocation : busStop} style={styles.markerImage} />
              <Callout style={{ width: windowWidth * 0.5 }}>
                <Text style={{ textAlign: 'center' }}>{props.stopName(stop)}</Text>
              </Callout>
            </Marker>
          ))
        }
      </MapView>
    ) : (
      <View style={[styles.map, { justifyContent: 'center', alignItems: 'center' }]}>
        <Spinner />
      </View>
    )
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: windowHeight * 0.5,
  },
  markerImage: {
    height: windowWidth * 0.1,
    width: windowWidth * 0.1
  }
})