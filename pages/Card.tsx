import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import { useDispatch, useSelector } from "react-redux";
import { selectTodo, addTodo } from '../store/slice/Todo'

const Header = (props: ViewProps): React.ReactElement => (
  <View {...props}>
    <Text category='h6'>
      Maldives
    </Text>
    <Text category='s1'>
      By Wikipedia
    </Text>
  </View>
);

const Footer = (props: ViewProps): React.ReactElement => {
  const dispatch = useDispatch()

  return (
    <View
      {...props}
      // eslint-disable-next-line react/prop-types
      style={[props.style, styles.footerContainer]}
    >
      <Button
        style={styles.footerControl}
        size='small'
        status='basic'
      >
        CANCEL
      </Button>
      <Button
        style={styles.footerControl}
        size='small'
        onPress={() => dispatch(addTodo({ id: 3, name: "a new todo item" }))}
      >
        ACCEPT
      </Button>
    </View>
  )
}

export const CardSample = (): React.ReactElement => {
  const states = useSelector(selectTodo)

  return (
    <>
      <Layout
        style={styles.topContainer}
        level='1'
      >

        <Card
          style={styles.card}
          header={Header}
        >
          <Text>
            With Header
          </Text>
        </Card>

        <Card
          style={styles.card}
          footer={Footer}
        >
          <Text>
            With Footer
          </Text>
        </Card>

      </Layout>

      <Card
        style={styles.card}
        header={Header}
        footer={Footer}
      >
        {/* <Text>
          The Maldives, officially the Republic of Maldives, is a small country in South Asia, located in the Arabian Sea
          of the Indian Ocean. It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the Asian
          continent
        </Text> */}
        {states.todolist.map((elem, index) => <Text key={index}>{elem.name}</Text>)}
      </Card>

    </>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
