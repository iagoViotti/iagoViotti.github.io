import './OpenedFolder.css'
import { useSelect } from '../context/SelectContext'
const OpenedFolderMobile = () => {
  const { doubleClicked, setDoubleClicked, handleDoubleClick } = useSelect()

  if (!doubleClicked.folder) return null;

  return (

    <div id='opened-folder' className='opened-folder'>
      <div className="opened-folder-header">
        <div className="opened-folder-header-title">
          {doubleClicked.folder?.name}
        </div>
        <div className='opened-folder-header-buttons'>
          <button
            onClick={() => { setDoubleClicked({ folder: null, file: null }) }}
            className="opened-folder-header-close"
          >
            X
          </button>
        </div>
      </div>

      <div className='icon-content'>
        {doubleClicked.folder?.Files.map((item, index) => (
          <label key={index} className='icon-item'>
            <h3>{item.name}</h3>
            {/* <img src={item.image} alt={item.name} /> */}
            <p>{item.description}</p>
            <p>{item?.type}</p>
            <p>{item?.year}</p>
            <button style={{ display: 'none' }} onClick={() => handleDoubleClick(item)}>Open</button>
          </label>
        ))}
      </div>
    </div >
  )
}

export default OpenedFolderMobile
