import Folder from "./components/Folder"
import OpenedFolder from "./components/OpenedFolder"
import { useSelect } from "./context/SelectContext"
import "./App.css"


const App = () => {
  const { setSelected } = useSelect()
  const handleClick = () => {
    setSelected('none')
  }
  return (
    <div>
      <div className="App" id="app">
        <div className="app-background" onClick={() => handleClick()} />
        <div className="grid">
          <Folder name='folder_1' />
          <Folder name='porfolio' />
        </div>
        <OpenedFolder />
      </div>
    </div>
  )
}

export default App
