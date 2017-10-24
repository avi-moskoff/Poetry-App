import { StackNavigator } from 'react-navigation'

import TitleScreen from './components/titleScreen'
import ImportScreen from './components/importScreen'
import EditScreen from './components/editScreen'

const App = StackNavigator({
	TitleScreen: { screen: TitleScreen },
	ImportScreen: { screen: ImportScreen },
	EditScreen: { screen: EditScreen }
})

export default App
