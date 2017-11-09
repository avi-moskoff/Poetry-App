import * as React from 'react'
import { KeyboardAvoidingView, Button, TextInput } from 'react-native'

import INavigation from '../interfaces/INavigation'
import IProps from '../interfaces/IProps'

import styles from '../styles'

class ImportScreen extends React.Component<IProps> {

	static navigationOptions = (navigation: { navigation: INavigation }) => ({
		title: 'ImportScreen',
		headerRight: <Button
			title='Next'
			onPress={() => {
				navigation.navigation.navigate('EditScreen', {
					poem: !!navigation.navigation.state.params ? navigation.navigation.state.params.poem : ''
				} )
			}}
		/>
	})

	constructor(props: IProps) {
		super(props)
	}

	render(): JSX.Element {
		return (
			<KeyboardAvoidingView
				behavior='padding'
                style={styles.importScreen}
                keyboardVerticalOffset={0}
			>
				<TextInput
					style={styles.normalText}
					placeholderTextColor='#ecf0f1'
					placeholder='Type your poem here!'
					keyboardAppearance='dark'
					multiline={true}
					autoFocus={true}
					onChangeText={(poem: string) => {
						// this.setState({ poem })
                        this.props.navigation.setParams({poem})
					}}
				/>
			</KeyboardAvoidingView>
		)
	}
}

export default ImportScreen
