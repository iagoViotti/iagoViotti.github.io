import './OpenedFile.css'
import Draggable from 'react-draggable'
import { useState } from 'react'
import { useSelect } from '../context/SelectContext'

const OpenedFile = () => {
  const [isDragging, setIsDragging] = useState(false)
  const { doubleClicked, setDoubleClicked } = useSelect()

  if (!doubleClicked.file) return null;

  return (
    <Draggable bounds={'body'} handle='.opened-file-header' onStart={() => setIsDragging(true)} onStop={() => setIsDragging(false)}>
      <div className={`opened-file ${isDragging ? 'dragging' : ''}`}>
        <div className="opened-file-header">
          <div className="opened-file-header-title">{doubleClicked.file.name}</div>
          <button
            onClick={() => { setDoubleClicked(prev => ({ ...prev, file: null })) }}
            className="opened-folder-header-close"
          >
            X
          </button>
        </div>
        <div className="opened-file-content">
          <p>{doubleClicked.file.description}</p>
          <p>{doubleClicked.file?.type}</p>
          <p>{doubleClicked.file?.year}</p>
          <p>{doubleClicked.file?.externalLink}</p>
          <img src={doubleClicked.file?.image} alt={doubleClicked.file.name} />
        </div>
      </div>
    </Draggable>
  )
}

export default OpenedFile
