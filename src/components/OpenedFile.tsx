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
          <div className="opened-file-header-title">{doubleClicked.file?.name as string}</div>
          <button
            onClick={() => { setDoubleClicked(prev => ({ ...prev, file: null })) }}
            className="opened-folder-header-close"
          >
            X
          </button>
        </div>
        <div className="scrollable-content">
          <p>{doubleClicked.file?.description as string}</p>
          <p>{doubleClicked.file?.type as string}</p>
          <p>{doubleClicked.file?.year as number}</p>
          <p>{doubleClicked.file?.externalLink as string}</p>
          <img src={doubleClicked.file?.image as string} alt={doubleClicked.file?.name as string} />
        </div>
      </div>
    </Draggable>
  )
}

export default OpenedFile
