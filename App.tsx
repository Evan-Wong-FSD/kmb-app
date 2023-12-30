//#region 
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
//#endregion

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { App } from './src/';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { default as customTheme } from './custom-theme.json'

const MainApp = () => (
  <SafeAreaView style={styles.main_container}>
    <StatusBar barStyle='dark-content' />
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApplicationProvider>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  }
});

export default MainApp;
