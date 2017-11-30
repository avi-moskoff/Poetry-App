import * as React from 'react'
import { KeyboardAvoidingView, Button, TextInput } from 'react-native'

import INavigation from '../interfaces/INavigation'
import IProps from '../interfaces/IProps'

import styles from '../styles'

class ExportScreen extends React.Component<IProps> {

	static navigationOptions = {
		title: 'ExportScreen'
    }
    
    private poem: string

	constructor(props: IProps) {
        super(props)
	}

	render(): JSX.Element {
		return (
			<KeyboardAvoidingView
				behavior='padding'
                style={styles.importScreen}
                keyboardVerticalOffset={50}
			>
				<TextInput
					style={styles.normalText}
					keyboardAppearance='dark'
					multiline={true}
                    autoFocus={true}
                    value={this.props.navigation.state.params.poem}
				/>
			</KeyboardAvoidingView>
		)
	}
}

export default ExportScreen
