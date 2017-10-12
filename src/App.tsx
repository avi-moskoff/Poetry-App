import {StackNavigator} from 'react-navigation'

import TitleScreen from './components/titleScreen'
import ImportScreen from './components/importScreen'

const App = StackNavigator({
  TitleScreen: {screen: TitleScreen},
  ImportScreen: {screen: ImportScreen}
})

export default App
