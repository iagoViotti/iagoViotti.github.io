import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext'
import App from './App'
import './index.css'
import './App.css'
import { SelectProvider } from './context/SelectContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <SelectProvider>
      <App />
    </SelectProvider>
  </ThemeProvider>
)
