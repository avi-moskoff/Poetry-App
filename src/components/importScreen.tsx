import * as React from 'react'
import { KeyboardAvoidingView, Button, TextInput } from 'react-native'

import styles from '../styles'

interface INavigation {
    navigate: (screen: string, props?: IOutgoingProps) => void,
    setParams: (text: any) => void,
    state: {
        key: string,
        params: {
            poem: string
        }
    }
}

interface IProps extends React.Props<void> {
	navigation: INavigation
}

interface IOutgoingProps extends React.Props<void> {
    navigation: INavigation,
    poem: string
}

class ImportScreen extends React.Component<IProps> {

	static navigationOptions = (navigation: { navigation: INavigation }) => ({
		title: 'ImportScreen',
		headerRight: <Button
			title='wat'
			onPress={() => {
                console.log(navigation.navigation.state.params.poem)
                
				navigation.navigation.navigate('EditScreen', {navigation: navigation.navigation, poem: navigation.navigation.state.params.poem})
			}}
		/>
	})

	constructor(props: IProps) {
		super(props)
		this.state = {
			poem: ''
		}
	}

	render(): JSX.Element {
		return (
			<KeyboardAvoidingView
				behavior='padding'
                style={styles.importScreen}
                keyboardVerticalOffset={64}
			>
				<TextInput
					style={styles.normalText}
					placeholderTextColor='#ecf0f1'
					placeholder='Type your poem here!'
					keyboardAppearance='dark'
					multiline={true}
					autoFocus={true}
					onChangeText={(poem: string) => {
						this.setState({ poem })
                        this.props.navigation.setParams({poem})
					}}
				/>
			</KeyboardAvoidingView>
		)
	}
}

export default ImportScreen
