import ReactDOM from 'react-dom/client'
import { Provider } from './context/Context'
import { ThemeProvider } from './context/ThemeContext'
import Scene from './components/Scene'
import Aside from './components/Aside'
import App from './App'
import './index.css'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <Provider>
      <Aside />
      <Scene />
      <App />
    </Provider>
  </ThemeProvider>
)
