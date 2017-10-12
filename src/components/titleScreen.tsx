import * as React from 'react'
import { Button, Text, View } from 'react-native'
import {NavigationAction} from 'react-navigation'

import styles from '../styles'

interface IProps extends React.Props<void> {
  navigation: NavigationAction
}

class TitleScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: 'TitleScreen',
  }

  

  render(): JSX.Element {
    // const { navigate } = this.props.navigation
    
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Feiran's</Text>
          <Text style={styles.title}>Poetry</Text>
          <Text style={styles.title}>App</Text>
          <Text style={styles.normalText}>By Avi, Emiley, and Joe</Text>
        </View>
        <Button onPress={() => {
          // this.props.navigation()
        }} title='Import Poem'></Button>
      </View>
    )
  }

  private _onPress(): void {
    console.log('WE PRESSED THE BUTTON!')
  }
}

export default TitleScreen 
