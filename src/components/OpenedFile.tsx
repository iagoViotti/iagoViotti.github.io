import './OpenedFile.css'
import Draggable from 'react-draggable'
import { useState } from 'react'
import { useSelect } from '../context/SelectContext'

// import ProjectTemplate from './templates/ProjectTemplate'
import { BioTemplate, ProjectTemplate } from './templates';

const FileTemplates = {
  project: ProjectTemplate,
  bio: BioTemplate,
}

const OpenedFile = () => {
  const [isDragging, setIsDragging] = useState(false)
  const { doubleClicked, setDoubleClicked, handleNextFile, handlePrevFile, prevFileIndex, nextFileIndex } = useSelect()

  const file = doubleClicked.file;

  if (!file) return null;

  const isFileInFolder = doubleClicked.folder?.Files.some(f => f.name === file.name)
  const TemplateComponent = FileTemplates[file.type as keyof typeof FileTemplates];

  return (
    <Draggable bounds={'body'} handle='.opened-file-header' onStart={() => setIsDragging(true)} onStop={() => setIsDragging(false)}>
      <div className={`opened-file ${isDragging ? 'dragging' : ''}`}>
        <div className="opened-file-header">
          <div className="opened-file-header-title">{file.name}</div>
          <div className='opened-file-header-buttons'>
            {isFileInFolder &&
              <>
                <button disabled={prevFileIndex === null} onClick={() => handlePrevFile()} >&lt;</button>
                <button disabled={nextFileIndex === null} onClick={() => handleNextFile()} >&gt;</button>
              </>
            }
            <button
              onClick={() => { setDoubleClicked(prev => ({ ...prev, file: null })) }}
              className="opened-folder-header-close"
            >
              X
            </button>
          </div>
        </div>

        <div className="opened-file-content">
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
    </Draggable>
  )
}

export default OpenedFile