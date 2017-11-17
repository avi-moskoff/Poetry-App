import * as React from 'react'
import { ScrollView, View, Text, Button, TextInput, Picker } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'

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

	private poemArray: string[][]

	private promiseArray: Promise<string[]>[]

	private synonymMap: { [index: string]: string[] } = {}

	componentWillMount(): void {

		// this.poemArray = this.props.navigation.state.params.poem.split(/[ \n\r\t]/g)

		this.poemArray = this.props.navigation.state.params.poem.split(/\n/g).map((line: string) => {
			return line.split(/ /g)
		})

		console.log(this.poemArray)

		this.promiseArray = this.poemArray.reduce((flattenedArray: string[], currentArray: string[], []) => {
			return flattenedArray.concat(currentArray)
		}).reduce((uniqueWords: string[], currentWord: string) => {
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
			return <ScrollView style={styles.scroll}>
				{this.poemArray.map((currentLine: string[], index: number) => {
					return <View key={index} style={styles.line}>
						{currentLine.map((currentWord: string, index: number) => {

							const currentWordNormalized: string = currentWord.toLowerCase()

							// console.log(this.synonymMap[currentWordNormalized])

							if(!!this.synonymMap[currentWordNormalized] && this.synonymMap[currentWordNormalized].length > 0) {
								console.log('Drop down activated')
								return <ModalDropdown 
									key={currentWordNormalized + index}
									defaultIndex={0}
										defaultValue={currentWordNormalized}
										textStyle={styles.highlightedText}
										dropdownStyle={styles.dropdown}
										dropdownTextStyle={styles.dropdownText}
										options={[currentWordNormalized, ...this.synonymMap[currentWordNormalized]]}
								/>
							}
							return <Text 
								key={currentWordNormalized + index}
								style={styles.normalText}
							>{currentWord}</Text>
						})}
					</View>
				})}			
			</ScrollView>
		}	
	}
} 

export default EditScreen
