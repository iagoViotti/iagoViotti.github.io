import './OpenedFolder.css'
import Draggable from 'react-draggable'
import { useSelect } from '../context/SelectContext'

const OpenedFolder = () => {
  const { doubleClicked } = useSelect()
  
  return (
    <Draggable bounds={'body'} handle=".opened-folder-header">
      <div className="opened-folder">
        <div className="opened-folder-header">
          <div className="opened-folder-header-title">{doubleClicked}</div>
          <div className="opened-folder-header-close">X</div>
        </div>
        <div className="opened-folder-content">
          <div className="opened-folder-content-item">Item 1</div>
          <div className="opened-folder-content-item">Item 2</div>
          <div className="opened-folder-content-item">Item 3</div>
        </div>
      </div>
    </Draggable>
  )
}

export default OpenedFolder
