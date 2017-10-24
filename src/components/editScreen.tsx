import * as React from 'react'
import { Text, Button, TextInput } from 'react-native'

import styles from '../styles'

interface INavigation {
    navigate: (screen: string, props?: IProps) => void,
    setParams: (text: any) => void,
    state: {
        key: string,
        params: {
            poem: string
        }
    }
}

interface IProps extends React.Props<void> {
    navigation: INavigation,
    poem: string
}

class EditScreen extends React.Component<IProps> {
	static navigationOptions = {
		title: 'EditScreen'
	}

	render(): JSX.Element {
		console.log(this.props)
		return (
			<Text>{this.props.navigation.state.params.poem}</Text>
		)
	}
}

export default EditScreen
