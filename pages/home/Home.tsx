import { View, StyleSheet } from 'react-native'
import { Header } from './header/Header'
import { List } from './list/List'

export const Home = (props): React.ReactElement => {
  return (
    <>
      <Header />

      <View style={{ flex: 1 }}>
        <List {...props} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  
})