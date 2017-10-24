import { StyleSheet, ViewStyle } from 'react-native'

const style: ViewStyle = {} 

const styles: any = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2c3e50',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	importScreen: {
		flex: 1,
		borderWidth: 5,
		backgroundColor: '#2c3e50'
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
	button: {
		color: '#ecf0f1'
	}
})

export default styles
