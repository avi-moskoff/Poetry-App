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
	static navigationOptions = (navigation: { navigation: INavigation }) => ({
		title: 'EditScreen',
		headerRight: <Button
			title='Export'
			onPress={() => {
				navigation.navigation.navigate('ExportScreen', {
					poem: !!navigation.navigation.state.params.poem? navigation.navigation.state.params.poem : ''
				} )
			}}
		/>
	})

	constructor(props: IProps) {
		super(props)
		this.state = {
			isDone: false
		}
	}

	private poemArray: string[][]

	private promiseArray: Promise<string[]>[]

	private synonymMap: { [index: string]: string[] } = {}

	private poemToExport: string[][]

	private blackList: string[] = ['shit', 'piss', 'fuck', 'cunt', 'cocksucker', 'motherfucker', 'tits', 'Negro', 'eff', 'nigger']

	private makeUnique = (uniqueWords: string[], currentWord: string) => {
		currentWord = currentWord.toLowerCase()

		if(!uniqueWords.includes(currentWord)) {
			uniqueWords.push(currentWord)
		}

		return uniqueWords
	}

	componentWillMount(): void {

		this.poemArray = this.props.navigation.state.params.poem.split(/\n/g).map((line: string) => {
			return line.split(/([ -&(-/:-@[-`{-~\t])/g)
		})

		this.poemToExport = JSON.parse(JSON.stringify(this.poemArray))

		this.props.navigation.setParams({poem: this.poemToExport.reduce((fullPoem: string, currentLine: string[]) => {
			if(typeof currentLine === 'object') {
				return `${fullPoem}\n${currentLine.reduce((fullLine: string, currentWord: string) => {
					return fullLine + currentWord
				}, '')}`
			}

			return fullPoem
		}, '')})

		// console.log(this.poemArray)

		this.promiseArray = this.poemArray.reduce((flattenedArray: string[], currentArray: string[], []) => {
			return flattenedArray.concat(currentArray)
		}).reduce(this.makeUnique, []).reduce((promises: Promise<string[]>[], currentWord: string) => {
			const value = promises.push(
				fetch(`http://thesaurus.altervista.org/thesaurus/v1?key=bD9XnankasfsfRsNcn2c&language=en_US&output=json&word=${currentWord.toLowerCase()}`).catch((error: any) => {
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
							this.synonymMap[currentWord] = responseArray.reduce((synonymList: string[], list: IList) => {
								return synonymList.concat(list.list.synonyms.split('|'))
							}, [])
							.filter((synonym: string) => !(synonym.includes('(') || synonym.includes(' ') || this.blackList.includes(synonym)))
							.reduce(this.makeUnique, [])
						}

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
		if(!this.state.isDone) {
			return <Text>Loading</Text>
		} else {
			return <ScrollView style={styles.scroll}>
				{this.poemArray.map((currentLine: string[], index: number) => {
					return <View key={index} style={styles.line}>
						{currentLine.map((currentWord: string, wordIndex: number) => {

							if(currentWord === ' '){
								return
							}

							const currentWordNormalized: string = currentWord.toLowerCase()

							if(!!this.synonymMap[currentWordNormalized] && this.synonymMap[currentWordNormalized].length > 0) {
								return <ModalDropdown 
									key={index + currentWordNormalized + wordIndex}
									defaultIndex={0}
									defaultValue={currentWordNormalized}
									textStyle={styles.highlightedText}
									dropdownStyle={styles.dropdown}
									dropdownTextStyle={styles.dropdownText}
									options={[currentWordNormalized, ...this.synonymMap[currentWordNormalized]]}
									onSelect={(optionIndex: number, value: string) => {
										this.poemToExport[index][wordIndex] = value

										this.props.navigation.setParams({poem: this.poemToExport.reduce((fullPoem: string, currentLine: string[]) => {
											if(typeof currentLine === 'object') {
												return `${fullPoem}\n${currentLine.reduce((fullLine: string, currentWord: string) => {
													return fullLine + currentWord
												}, '')}`
											}
								
											return fullPoem
										}, '')})

										// console.log(this.poemArray)
									}}
								/>
							}
							return <Text 
								key={index + currentWordNormalized + wordIndex}
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
