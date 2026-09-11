import './OpenedFile.css'
import { Rnd } from 'react-rnd'
import { useState } from 'react'
import { useSelect } from '../context/SelectContext'
import { IOSWindow } from '../types/Index'
import { closeIcon } from '../assets/svg/CloseIcon'

import { BioTemplate, ProjectTemplate } from './templates';

const FileTemplates = {
  project: ProjectTemplate,
  bio: BioTemplate,
}

// 1. Definimos a interface das props
interface OpenedFileProps {
  windowData: IOSWindow;
}

const OpenedFile = ({ windowData }: OpenedFileProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const { closeWindow, focusWindow, handleNextFile, handlePrevFile, getNavigationIndexes } = useSelect()
  const file = windowData.content as any;
  const { prev, next } = getNavigationIndexes(windowData.id);
  const TemplateComponent = FileTemplates[file.type as keyof typeof FileTemplates];
  const [size, _setSize] = useState([1200, 600])

  return (
    <Rnd
      default={{
        x: (window.innerWidth / 10),
        y: window.innerHeight / 20,
        width: size[0],
        height: size[1],
      }}
      minWidth={320}
      minHeight={400}
      bounds="body"
      dragHandleClassName="opened-file-header"
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}
      style={{ zIndex: windowData.zIndex }}
      onMouseDownCapture={() => focusWindow(windowData.id)}
    >
      <div className={`opened-file ${isDragging ? 'dragging' : ''}`} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="opened-file-header">
          <div className="opened-file-header-title">{file.name}</div>
          <div className='opened-file-header-buttons'>
            {windowData.parentFolder && (
              <>
                <button disabled={prev === null} onClick={() => handlePrevFile(windowData.id)}>&lt;</button>
                <button disabled={next === null} onClick={() => handleNextFile(windowData.id)}>&gt;</button>
              </>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(windowData.id);
              }}
              className="opened-file-header-close"
            >
              {closeIcon}
            </button>
          </div>
        </div>

        <div className="opened-file-content" style={{ flexGrow: 1, overflowY: 'auto' }}>
          {TemplateComponent ? (
            <TemplateComponent file={file as any} />
          ) : (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <p>Tipo de arquivo desconhecido ou não suportado.</p>
              <p>selected file: {file ? JSON.stringify(file) : ''}</p>
            </div>
          )}
        </div>
      </div>
    </Rnd>
  )
}

export default OpenedFile