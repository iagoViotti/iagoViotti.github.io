import './OpenedFile.css'
import { useSelect } from '../context/SelectContext'

const OpenedFileMobile = () => {
  const { doubleClicked, setDoubleClicked } = useSelect()

  if (!doubleClicked.file) return null;

  return (
    <div className='opened-file'>
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
  )
}

export default OpenedFileMobile
