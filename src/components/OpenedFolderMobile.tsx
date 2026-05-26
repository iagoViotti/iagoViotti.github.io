import './OpenedFolder.css'
import { useSelect } from '../context/SelectContext'
import { IProject } from '../types/Index';

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
        {doubleClicked.folder?.Files.map((item, index) => {
          // Checagem de tipo para extrair dados específicos se for projeto
          const isProject = item.type === 'project';
          const projectData = isProject ? (item as IProject) : null;

          return (
            <label key={index} className='icon-item'>
              <h3>{item.name}</h3>
              {/* Exibe as infos apenas se for um arquivo de projeto, ou cria um fallback para bio */}
              <p>{isProject ? projectData?.description : 'Arquivo de Sistema'}</p>
              <p>{item.type}</p>
              {isProject && <p>{projectData?.year}</p>}

              <button style={{ display: 'none' }} onClick={() => handleDoubleClick(item)}>Open</button>
            </label>
          )
        })}
      </div>
    </div >
  )
}

export default OpenedFolderMobile