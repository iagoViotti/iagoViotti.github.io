import Scene from './components/Scene'
import './App.css'
import { Provider } from './context/Context'

function App() {
  return (
    <Provider>
      <Scene />
    </Provider>
  )
}

export default App
