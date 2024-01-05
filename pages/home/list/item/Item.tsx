import { View, StyleSheet } from "react-native"
import { Divider, Text } from '@ui-kitten/components'
import { Feather } from "@expo/vector-icons";
import { Stop, StopETA } from '../../../../type'
import { useTranslation } from "react-i18next";
import i18n from '../../../../i18n';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const waitingMinutes = (eta, dataTimestamp) => {
  const time = (timestamp) => new Date(timestamp).getTime()
  return new Date(time(eta) - time(dataTimestamp)).getMinutes()
}

export const Item = (props): React.ReactElement => {
  const { t } = useTranslation();
  const stopBFA3460955AC820C: Stop = props.stopBFA3460955AC820C
  const stop5FB1FCAF80F3D97D: Stop = props.stop5FB1FCAF80F3D97D
  const stopEta: StopETA = props.stopEta

  const languageOfDestination = () => {
    if (i18n.language === 'en') return stopEta.dest_en
    if (i18n.language === 'zh') return stopEta.dest_tc
    if (i18n.language === 'zh_cn') return stopEta.dest_sc
  }

  const stop = (stopId) => {
    if (stopId === 'BFA3460955AC820C') return stopBFA3460955AC820C
    if (stopId === '5FB1FCAF80F3D97D') return stop5FB1FCAF80F3D97D
  }

  const languageOfStopName = () => {
    if (i18n.language === 'en') return stop(stopEta.stopId).name_en
    if (i18n.language === 'zh') return stop(stopEta.stopId).name_tc
    if (i18n.language === 'zh_cn') return stop(stopEta.stopId).name_sc
  }

  return (
    <>
      <Divider style={styles.divider} />
      <View style={styles.container}>
        <Text style={styles.route}>{stopEta.route}</Text>

        <View style={styles.destinationContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            <Text>{`${t('home.list.item.to')} `}</Text>
            <Text style={styles.destination}>{languageOfDestination()}</Text>
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.stop}>{languageOfStopName()}</Text>
        </View>

        {
          stopEta.eta
            ? (
              <View style={styles.rightAccessoryContainer}>
                <Text style={styles.minutesNumber}>{waitingMinutes(stopEta.eta, stopEta.data_timestamp)}</Text>
                <Text style={styles.minutesLabel}>{t('home.list.item.minutes')}</Text>
              </View>
            )
            : (
              <View style={styles.rightAccessoryContainer}>
                <Feather name="alert-circle" size={windowWidth * 0.1} color="#0d47a0" />
              </View>
            )
        }
        {/* <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: windowWidth * 0.06, fontWeight: 'bold', color: '#0d47a0' }}>16</Text>
          <Text style={{ color: 'grey' }}>{t('home.list.item.minutes')}</Text>
          <Feather name="alert-circle" size={windowWidth * 0.1} color="#0d47a0" />
        </View> */}
      </View>
      <Divider style={styles.divider} />
    </>
  )
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#e0e0e0'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '3%'
  },
  route: {
    width: '23%',
    fontSize: windowWidth * 0.07,
    fontWeight: 'bold',
    color: '#5a5a5a',
    verticalAlign: 'middle'
  },
  destinationContainer: {
    width: '57%'
  },
  destination: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    color: '#5a5a5a'
  },
  stop: {
    fontSize: windowWidth * 0.05,
    color: '#5a5a5a'
  },
  rightAccessoryContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  minutesNumber: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    color: '#0d47a0'
  },
  minutesLabel: {
    color: 'grey'
  }
})