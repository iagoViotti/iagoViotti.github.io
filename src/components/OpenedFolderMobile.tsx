// import './OpenedFolder.css'
import { useSelect } from '../context/SelectContext'
import { IFolder, IProject, IOSWindow } from '../types/Index';

// O componente agora recebe a prop windowData enviada pelo App.tsx
interface OpenedFolderMobileProps {
  windowData: IOSWindow;
}

const OpenedFolderMobile = ({ windowData }: OpenedFolderMobileProps) => {
  // Puxamos a função de fechar e a de clique duplo do Contexto
  const { handleDoubleClick, closeWindow } = useSelect()

  // Extraímos a pasta diretamente da prop
  const folder = windowData.content as IFolder;

  if (!folder) return null;

  return (
    <div id='opened-folder' className='opened-folder'>
      <div className="opened-folder-header">
        <div className="opened-folder-header-title">
          {folder.name}
        </div>
        <div className='opened-folder-header-buttons'>
          <button
            // Substituímos o setDoubleClicked pela função closeWindow
            onClick={() => closeWindow(windowData.id)}
            className="opened-folder-header-close"
          >
            X
          </button>
        </div>
      </div>

      <div className='icon-content'>
        {folder.Files.map((item, index) => {
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

              {/* O botão hidden repassa a bola para o handleDoubleClick, enviando a pasta atual junto */}
              <button style={{ display: 'none' }} onClick={() => handleDoubleClick(item, folder)}>Open</button>
            </label>
          )
        })}
      </div>
    </div >
  )
}

export default OpenedFolderMobile