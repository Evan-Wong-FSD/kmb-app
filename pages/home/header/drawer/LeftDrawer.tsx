import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View, Platform } from 'react-native'
import { Divider, Modal, Text } from '@ui-kitten/components'
import { Dimensions } from 'react-native'
import { theme } from '../../../../theme'
import { Feather } from "@expo/vector-icons"
import { useTranslation } from 'react-i18next';
import i18n from '../../../../i18n'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const languagesMenu = (openLanguagesMenu, setOpenLanguagesMenu, setOpenDrawer): React.ReactElement => {
  const { t } = useTranslation();

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode)
    setOpenDrawer(false)
    setOpenLanguagesMenu(false)
  }

  useEffect(() => {
    if (Platform.OS === 'ios') setOpenDrawer(false)
  }, [openLanguagesMenu])

  return (
    <Modal visible={openLanguagesMenu} backdropStyle={styles.backdrop} style={{ zIndex: 2 }}>
      <View style={styles.languagesMenuContainer}>
        <Text style={[styles.menuText, styles.menuTitleColor]}>語言選擇</Text>
        <Text style={styles.menuText} onPress={() => changeLanguage('en')}>English</Text>
        <Divider />
        <Text style={styles.menuText} onPress={() => changeLanguage('zh')}>繁體中文</Text>
        <Divider />
        <Text style={styles.menuText} onPress={() => changeLanguage('zh_cn')}>簡體中文</Text>
        <Divider />
        <Text style={styles.menuText} onPress={() => setOpenLanguagesMenu(false)}>{t('home.header.drawer.language.menu.cancel')}</Text>
      </View>
    </Modal>
  )
}

export const LeftDrawer = (props): React.ReactElement => {
  const { t } = useTranslation();
  const slideAnim = useRef(new Animated.Value(-windowWidth)).current
  const [openLanguagesMenu, setOpenLanguagesMenu] = useState(false)
  const [languageAbbreviation, setLanguageAbbreviation] = useState<string>()

  const appear = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    }).start()
  }

  const disappear = () => {
    Animated.timing(slideAnim, {
      toValue: -windowWidth,
      duration: 250,
      useNativeDriver: true
    }).start(() => props.setOpenDrawer(false))
  }

  useEffect(() => {
    if (i18n.language === 'en') setLanguageAbbreviation('Eng')
    if (i18n.language === 'zh') setLanguageAbbreviation('繁')
    if (i18n.language === 'zh_cn') setLanguageAbbreviation('简')
  }, [i18n.language])

  return (
    <>
      <Modal
        visible={props.openDrawer}
        backdropStyle={styles.backdrop}
        shouldUseContainer={false}
        onBackdropPress={disappear}
        onShow={appear}
      >
        <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
          <Text style={[styles.title, theme.shadow]}>APP 1933</Text>

          <TouchableOpacity style={styles.itemContainer} onPress={() => setOpenLanguagesMenu(true)}>
            <Feather name="globe" size={windowWidth * 0.06} color="#5a5a5a" />
            <Text style={[styles.label, styles.labelPosition]}>{t('home.header.drawer.language.label')}</Text>
            <Text style={styles.rightText}>{languageAbbreviation}</Text>
          </TouchableOpacity>
          <Divider style={styles.divider} />

          <View style={styles.itemContainer}>
            <Feather name="alert-triangle" size={windowWidth * 0.06} color="#5a5a5a" />
            <Text style={[styles.label, styles.labelPosition]}>{t('home.header.drawer.termsOfUse.label')}</Text>
          </View>
          <Divider style={styles.divider} />
        </Animated.View>
        <Text></Text>
      </Modal>

      {languagesMenu(openLanguagesMenu, setOpenLanguagesMenu, props.setOpenDrawer)}
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  container: {
    height: windowHeight,
    backgroundColor: 'white',
    width: '70%'
  },
  title: {
    backgroundColor: theme.main,
    color: 'white',
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    paddingVertical: '5%',
    paddingHorizontal: '8%'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '8%',
    paddingVertical: '5%'
  },
  label: {
    fontSize: windowWidth * 0.05,
    color: '#5a5a5a'
  },
  labelPosition: {
    flexGrow: 1,
    paddingLeft: '10%'
  },
  rightText: {
    fontSize: windowWidth * 0.05,
    color: '#5a5a5a'
  },
  divider: {
    width: '90%',
    alignSelf: 'center'
  },
  languagesMenuContainer: {
    backgroundColor: 'white',
    width: windowWidth * 0.7
  },
  menuTitleColor: {
    backgroundColor: theme.main,
    color: 'white',
    verticalAlign: 'middle'
  },
  menuText: {
    paddingVertical: '5%',
    textAlign: 'center',
    fontSize: windowWidth * 0.06,
    color: 'grey',
    verticalAlign: 'middle'
  }
});