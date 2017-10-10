import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  
  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <Text>There are 10 types of people in this world</Text>
        <Text>This is awesome!</Text>
        <Text>Shake your iPad to open the developer menu.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});