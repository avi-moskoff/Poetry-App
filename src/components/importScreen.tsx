import * as React from 'react'
import { KeyboardAvoidingView, Button, TextInput } from 'react-native'

import styles from '../styles'

interface IProps extends React.Props<void> {
	navigation: { navigate: (screen: string, props?: React.Props<void>) => void }
}

class ImportScreen extends React.Component<IProps> {

	static navigationOptions = (navigation: { navigate: (screen: string, props?: React.Props<void>) => void }) => ({
		title: 'ImportScreen',
		headerRight: <Button
			title='wat'
			onPress={() => {
				navigation.navigate('EditScreen')
			}}
		/>
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
			<KeyboardAvoidingView
				behavior='padding'
				style={styles.importScreen}
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
						this._poem = poem
					}}
				/>
			</KeyboardAvoidingView>
		)
	}
}

export default ImportScreen
