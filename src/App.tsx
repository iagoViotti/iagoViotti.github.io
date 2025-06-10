import Folder from "./components/Folder"
import OpenedFile from "./components/OpenedFile"
import OpenedFolder from "./components/OpenedFolder"
import OpenedFolderMobile from "./components/OpenedFolderMobile"
import OpenedFileMobile from "./components/OpenedFileMobile"
import { useSelect } from "./context/SelectContext"
import "./App.css"
import { portfolio } from "./assets/mocks"


const App = () => {
  const { setSelected } = useSelect()
  const handleClick = () => {
    setSelected('none')
  }

  const isMobile = window.innerWidth < 768
  
  return (
    <div>
      <div className="app-background" onClick={() => handleClick()} />
      <div className="App" id="app">
        <div className="grid">
          <Folder {...portfolio} />
        </div>
        {isMobile ? <OpenedFileMobile /> : <OpenedFile />}
        {isMobile ? <OpenedFolderMobile /> : <OpenedFolder />}
      </div>
    </div>
  )
}

export default App
