import * as React from 'react'
import { Text, Button, TextInput } from 'react-native'

import INavigation from '../interfaces/INavigation'
import IProps from '../interfaces/IProps'
import { IResponse, IList } from '../interfaces/IResponse'

import styles from '../styles'

class EditScreen extends React.Component<IProps> {
	static navigationOptions = {
		title: 'EditScreen'
	}

	componentWillMount(): void {
		const poem: string = this.props.navigation.state.params.poem

		const poemArray: string[] = poem.split(/[ \n\r\t]/g)

		fetch('http://thesaurus.altervista.org/thesaurus/v1?key=bD9XnankasfsfRsNcn2c&word=strategy&language=en_US&output=json').catch((error: any) => {
			console.log(error)
		}).then((response: Response) => {
			return response.json()
		}).then((response: IResponse) => {

			const responseArray: [IList] = response.response

			console.log(response.response[0].list.synonyms)
		})

		console.log(poemArray)
	}

	render(): JSX.Element {
		return (
			<Text>{this.props.navigation.state.params.poem}</Text>
		)
	}
}

export default EditScreen
