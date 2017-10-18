import * as React from 'react'
import { View, Button, TextInput } from 'react-native'

import styles from '../styles'

interface IProps extends React.Props<void> {
    navigation: { navigate: (screen: string, props?: React.Props<void>) => void }
}

class ImportScreen extends React.Component<IProps> {
    static navigationOptions = (navigation: { navigate: (screen: string, props?: React.Props<void>) => void }) => ({
        title: 'ImportScreen',
        headerRight: <Button title='wat' onPress={() => {
            navigation.navigate('EditScreen')
        }}/>
    })

    private _poem: string

    constructor(props: IProps) {
        super(props)
        this.state = {
            poem: ''
        }
    }

    render(): JSX.Element {
        console.log(this._poem)
        return (
            <View style={styles.container}>
            
                <Button 
                    title='wat'
                    onPress={() => {
                        this.props.navigation.navigate('EditScreen')
                    }} />

                <TextInput placeholder='Type your poem here!' 
                    onChangeText={(poem: string) => {
                        this.setState({poem})
                        this._poem = poem
                    }}
                    multiline={true}
                    autoFocus={true} />
            </View>
        )
    }
}

export default ImportScreen
