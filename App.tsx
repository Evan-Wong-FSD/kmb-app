import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/Index';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { default as customTheme } from './custom-theme.json'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardSample } from './pages/Card'

const Stack = createNativeStackNavigator();

const MainApp = () => (
  <SafeAreaView style={styles.main_container}>
    <StatusBar barStyle='dark-content' />
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='card' component={CardSample} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
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
