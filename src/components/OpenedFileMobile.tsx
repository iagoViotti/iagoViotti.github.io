import './OpenedFile.css'
import { useSelect } from '../context/SelectContext'

const OpenedFileMobile = () => {
  const { doubleClicked, setDoubleClicked, handleNextFile, handlePrevFile } = useSelect()

  if (!doubleClicked.file) return null;

  return (
    <div className='opened-file'>
      <div className="opened-file-header">
        <div className="opened-file-header-title">{doubleClicked.file.name}</div>
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
      <div className="opened-file-content">
        <p>{doubleClicked.file.description}</p>
        <p>{doubleClicked.file?.type}</p>
        <p>{doubleClicked.file?.year}</p>
        <p>{doubleClicked.file?.externalLink}</p>
        <img src={doubleClicked.file?.image} alt={doubleClicked.file.name} />
      </div>
    </div>
  )
}

export default OpenedFileMobile
