import './OpenedFile.css'
import { useSelect } from '../context/SelectContext'
// Importe seus templates
import { BioTemplate } from './templates'

const FileTemplates = {
  // project: ProjectTemplate,
  bio: BioTemplate,
}

const OpenedFileMobile = () => {
  const { doubleClicked, setDoubleClicked, handleNextFile, handlePrevFile } = useSelect()

  const file = doubleClicked.file;

  if (!file) return null;

  const TemplateComponent = FileTemplates[file.type as keyof typeof FileTemplates];

  return (
    <div className='opened-file'>
      <div className="opened-file-header">
        <div className="opened-file-header-title">{file.name}</div>
        <div className='opened-file-header-buttons'>
          <button onClick={() => handlePrevFile()} >&lt;</button>
          <button onClick={() => handleNextFile()} >&gt;</button>
          <button
            onClick={() => { setDoubleClicked(prev => ({ ...prev, file: null })) }}
            className="opened-file-header-close"
          >
            X
          </button>
        </div>
      </div>
      <div className="opened-file-content" style={{ padding: 0 }}>
        {TemplateComponent ? (
          <TemplateComponent file={file as any} />
        ) : (
          <div style={{ padding: '20px' }}>Tipo de arquivo não suportado.</div>
        )}
      </div>
    </div>
  )
}

export default OpenedFileMobile