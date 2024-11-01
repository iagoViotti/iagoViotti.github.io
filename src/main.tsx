import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from './context/Context'
import Scene from './components/Scene'
import Aside from './components/Aside'
import './App.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <Aside />
    <Scene />
    <App />
  </Provider>
)
