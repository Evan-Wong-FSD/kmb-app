import React, { useState } from 'react'
import { Icon, IconElement, TopNavigation, TopNavigationAction, Text } from '@ui-kitten/components'
import { StyleSheet, Dimensions } from 'react-native'
import { TouchableWebElement } from '@ui-kitten/components/devsupport'
import { theme } from '../../../theme'
import { LeftDrawer } from './drawer/LeftDrawer'

const windowWidth = Dimensions.get('window').width

const MenuIcon = (props): IconElement => (<Icon {...props} name='menu-2-outline' fill="white" />)

export const Header = (): React.ReactElement => {
  const [openDrawer, setOpenDrawer] = useState(false)

  const renderMenuIcon = (): TouchableWebElement => (
    <TopNavigationAction icon={MenuIcon} onPress={()=>setOpenDrawer(true)} />
  )

  return (
    <>
      <TopNavigation
        title={evaProps => <Text {...evaProps} style={{ color: 'white', fontSize: windowWidth * 0.06, fontWeight: 'bold', paddingLeft: '5%' }}>APP 1933</Text>}
        accessoryLeft={renderMenuIcon}
        style={[styles.container, theme.shadow]}
      />

      <LeftDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.main
  },
})