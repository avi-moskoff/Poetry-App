import * as React from 'react'
import { Button, Text, View } from 'react-native'

import styles from '../styles'

interface IProps extends React.Props<void> {
  navigation: { navigate: (screen: string, props?: React.Props<void>) => void }
}

class TitleScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: 'TitleScreen'
  }

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Feiran's</Text>
          <Text style={styles.title}>Poetry</Text>
          <Text style={styles.title}>App</Text>
          <Text style={styles.normalText}>By Avi, Emiley, and Joe</Text>
        </View>
        
        <Button color='#5de' onPress={() => {
          this.props.navigation.navigate('ImportScreen')
        }} title='Import Poem'/>
      </View>
    )
  }
}

export default TitleScreen 
