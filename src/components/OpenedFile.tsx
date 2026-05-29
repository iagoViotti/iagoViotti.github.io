import './OpenedFile.css'
import { Rnd } from 'react-rnd'
import { useState } from 'react'
import { useSelect } from '../context/SelectContext'

import { BioTemplate, ProjectTemplate } from './templates';

const FileTemplates = {
  project: ProjectTemplate,
  bio: BioTemplate,
}

const OpenedFile = () => {
  const [isDragging, setIsDragging] = useState(false)
  const { doubleClicked, setDoubleClicked, handleNextFile, handlePrevFile, prevFileIndex, nextFileIndex } = useSelect()
  const [size, setSize] = useState([1200, 600])


  const file = doubleClicked.file;

  if (!file) return null;

  const isFileInFolder = doubleClicked.folder?.Files.some(f => f.name === file.name)
  const TemplateComponent = FileTemplates[file.type as keyof typeof FileTemplates];

  return (
    <Rnd
      default={{
        x: (window.innerHeight / 10),
        y: window.innerWidth / 20,
        width: size[0],
        height: size[1],
      }}
      minWidth={320}
      minHeight={400}
      bounds="body"
      dragHandleClassName="opened-file-header" // Nota: a classe vai sem o ponto "." aqui
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}
      style={{ zIndex: 100 }} // Garante que a janela fique por cima
    >
      {/* O container interno precisa ter width e height 100% para acompanhar o wrapper do Rnd */}
      <div className={`opened-file ${isDragging ? 'dragging' : ''}`} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
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