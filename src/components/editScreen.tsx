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

	private synonymMap: {
		[index: string] : string[]
	}

	componentWillMount(): void {
		const poem: string = this.props.navigation.state.params.poem

		const poemArray: string[] = poem.split(/[ \n\r\t]/g)

		poemArray.forEach((word) => {
			fetch(`http://thesaurus.altervista.org/thesaurus/v1?key=bD9XnankasfsfRsNcn2c&language=en_US&output=json&word=${word}`).catch((error: any) => {
				console.log(error)
			}).then((response: Response) => {
				if(response.ok) {
					return response.json()
				} else {
					return {
						response: []
					}
				}
			}).then((response: IResponse) => {
	
				const responseArray: [IList] = response.response				
				
				let synonymArray: string[] = []
	
				let prunedSynonymArray: string[] = []
	
				if(responseArray.length > 0) {
					responseArray.forEach((list: IList) => {
						list.list.synonyms.split('|').filter((synonym: string) => !(synonym.includes('(') || synonym.includes(' '))).forEach((synonym: string) => {
							if(!synonymArray.includes(synonym)) {
								synonymArray.splice(Math.floor(Math.random() * synonymArray.length), 0, synonym)
							}
						})
					})
				}
	
				console.log(`${word}: ${synonymArray.slice(0, 5)}`)
			})
		})
	}

	render(): JSX.Element {
		return (
			<Text>{this.props.navigation.state.params.poem}</Text>
		)
	}
}

export default EditScreen
