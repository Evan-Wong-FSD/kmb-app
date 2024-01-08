import { View, StyleSheet } from 'react-native'
import { Header } from './header/Header'
import { List } from './list/List'

export const Home = (props): React.ReactElement => {
  return (
    <>
      <Header />

      <View style={styles.view}>
        <List {...props} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
})