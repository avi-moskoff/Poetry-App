import { StyleSheet, ViewStyle } from 'react-native'

const style: ViewStyle = {} 

const styles: any = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2c3e50',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	scroll: {
		backgroundColor: '#2c3e50'
	},
	line: {
		flex: 1,
		flexDirection: 'row'
	},
	importScreen: {
		flex: 1,
		borderWidth: 5,
		backgroundColor: '#2c3e50'
	},
	dropdown:{
		width: 125
	},
	titleView: {
		flex: 0.4,
		backgroundColor: '#2c3e50',
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		fontSize: 100,
		color: '#ecf0f1'
	},
	normalText: {
		fontSize: 30,
		color: '#ecf0f1',
		padding: 10
	},
	highlightedText: {
		fontSize: 30,
		color: '#5de',
		padding: 10

	},
	dropdownText: {
		color: '#2c3e50',
		fontSize: 20
	}
})

export default styles
