import { StackNavigator } from 'react-navigation'

import TitleScreen from './components/titleScreen'
import ImportScreen from './components/importScreen'
import EditScreen from './components/editScreen'
import ExportScreen from './components/exportScreen'

const App = StackNavigator({
	TitleScreen: { screen: TitleScreen },
	ImportScreen: { screen: ImportScreen },
	EditScreen: { screen: EditScreen },
	ExportScreen: { screen: ExportScreen }
})

export default App
