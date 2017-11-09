import * as React from 'react'
import { View, Text, Button, TextInput, Picker } from 'react-native'

import INavigation from '../interfaces/INavigation'
import IProps from '../interfaces/IProps'
import { IResponse, IList } from '../interfaces/IResponse'

import styles from '../styles'

interface IState {
	isDone: boolean
	[wordIndex: number]: string
}

class EditScreen extends React.Component<IProps, IState> {
	static navigationOptions = {
		title: 'EditScreen'
	}

	constructor(props: IProps) {
		super(props)
		this.state = {
			isDone: false
		}
	}

	private poemArray: string[]

	private promiseArray: Promise<string[]>[]

	private synonymMap: { [index: string]: string[] } = {}

	componentWillMount(): void {

		this.poemArray = this.props.navigation.state.params.poem.split(/[ \n\r\t]/g)

		this.promiseArray = this.poemArray.reduce((uniqueWords: string[], currentWord: string) => {
			currentWord = currentWord.toLowerCase()
			if (!uniqueWords.includes(currentWord)) {
				uniqueWords.push(currentWord)
			}
			return uniqueWords
		}, []).reduce((promises: Promise<string[]>[], currentWord: string) => {
			const value = promises.push(
				fetch(`http://thesaurus.altervista.org/thesaurus/v1?key=bD9XnankasfsfRsNcn2c&language=en_US&output=json&word=${currentWord}`).catch((error: any) => {
					console.log(error)
				}).then((response: Response | void) => {
					if (!!response && response.ok) {
						return response.json()
					}
					return { response: [] }
				}).then((response: IResponse) => {
					return new Promise<string[]>((resolve => {
						const responseArray: IList[] = response.response

						let synonymArray: string[] = []

						let prunedSynonymArray: string[] = []

						if (responseArray.length > 0) {
							responseArray.forEach((list: IList) => {
								list.list.synonyms.split('|').filter((synonym: string) => !(synonym.includes('(') || synonym.includes(' '))).forEach((synonym: string) => {
									if (!synonymArray.includes(synonym)) {
										synonymArray.splice(Math.floor(Math.random() * synonymArray.length), 0, synonym)
									}
								})
							})
						}

						this.synonymMap[currentWord] = synonymArray.slice(0, 5)

						resolve()
					}))
				}))
			return promises
		}, [])

		Promise.all(this.promiseArray).then(() => {
			this.setState({isDone: true})
		})
	}

	render(): JSX.Element {
		console.log('re-rendering...' + this.state.isDone)
		if(!this.state.isDone) {
			return <Text>Loading</Text>
		} else {
			// console.log(this.synonymMap)
			return <View style={styles.container}>
						{this.poemArray.map((currentWord: string, index: number) => {

							console.log(this.synonymMap[currentWord])

							if(!!this.synonymMap[currentWord] && this.synonymMap[currentWord].length > 0) {
								console.log('Drop down activated')
								return <Picker 
											style={{width: 100}} 								
											key={currentWord + index}
											selectedValue={currentWord}
											onValueChange={() => undefined}
										>
											<Picker.Item label={currentWord} value={currentWord}/>
											<Picker.Item label='wat' value='wat'/>
										</Picker>
							}
							return <Text key={currentWord + index}>{currentWord}</Text>
						})}
					</View>
		}	
	}
}

export default EditScreen
