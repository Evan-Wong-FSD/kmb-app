import { TopNavigation, Text, TopNavigationAction, IconElement, Icon } from "@ui-kitten/components"
import { StyleSheet, Dimensions } from 'react-native'
import { theme } from '../../../theme'
import { TouchableWebElement } from "@ui-kitten/components/devsupport"
import i18n from '../../../i18n'
import { StopETA } from '../../../type'
import { useTranslation } from "react-i18next"

const windowWidth = Dimensions.get('window').width

const GoBackIcon = (props): IconElement => (<Icon {...props} name='arrow-back' fill="white" />)

export const Header = (props): React.ReactElement => {
  const { t } = useTranslation()
  const stopEta: StopETA = props.route.params.stopEta

  const languageOfDestination = () => {
    if (i18n.language === 'en') return stopEta.dest_en
    if (i18n.language === 'zh') return stopEta.dest_tc
    if (i18n.language === 'zh_cn') return stopEta.dest_sc
  }

  const renderGoBackIcon = (): TouchableWebElement => (
    <TopNavigationAction icon={GoBackIcon} onPress={props.navigation.goBack} />
  )

  return (
    <TopNavigation
      title={evaProps => <Text numberOfLines={1} ellipsizeMode="tail" {...evaProps} style={{ color: 'white', fontSize: windowWidth * 0.06, fontWeight: 'bold', paddingLeft: '5%' }}>
        {`${stopEta.route} ${t('detail.header.title.to')} ${languageOfDestination()}`}
      </Text>}
      accessoryLeft={renderGoBackIcon}
      style={[styles.container, theme.shadow]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.main
  },
})