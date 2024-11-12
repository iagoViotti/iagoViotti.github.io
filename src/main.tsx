import ReactDOM from 'react-dom/client'
import { Provider } from './context/Context'
import Scene from './components/Scene'
import Aside from './components/Aside'
import App from './App'
import './index.css'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <Aside />
    <Scene />
    <App />
  </Provider>
)
