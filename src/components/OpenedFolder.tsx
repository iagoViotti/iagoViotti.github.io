import './OpenedFolder.css'
import Draggable from 'react-draggable'
import { useRef, useState } from 'react'
import { useSelect } from '../context/SelectContext'
import File from './File'
import { IFile, IProject } from '../types/Index' // Mudei para importar IFile
import { gridIcon } from '../assets/svg/GridIcon'
import { listIcon } from '../assets/svg/ListIcon'

type ViewStyle = 'list' | 'icon';

const columns = ['Name', 'Category', 'Description', 'Year', 'External Link'];

const OpenedFolder = () => {
  const { doubleClicked, setDoubleClicked, selected, handleClick, handleDoubleClick } = useSelect()
  const [columnWidths, setColumnWidths] = useState<number[]>([200, 150, 200, 80, 200]);
  const currentColIndex = useRef<number | null>(null);
  const isResizing = useRef(false)
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sortParameter, setSortParameter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [shadowStyle] = useState({ boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.5)' });
  const [viewStyle, setViewStyle] = useState<ViewStyle>('icon');

  const toggleViewStyle = () => {
    setViewStyle(viewStyle === 'icon' ? 'list' : 'icon');
  };

  const handleMouseDown = (index: number) => {
    isResizing.current = true;
    currentColIndex.current = index
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing.current && currentColIndex.current !== null) {
      const newWidths = [...columnWidths];
      const newWidth = Math.max(0, e.clientX - getOffsetLeft(currentColIndex.current));
      newWidths[currentColIndex.current] = newWidth;
      if (newWidths[currentColIndex.current] < 5) {
        newWidths[currentColIndex.current] = 5
      }
      setColumnWidths(newWidths);
    }
  }

  const handleMouseUp = () => {
    isResizing.current = false
    currentColIndex.current = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const getOffsetLeft = (index: number): number => {
    const col = document.querySelector(`.column-header-cell[data-index="${index}"]`);
    return col ? (col as HTMLElement).getBoundingClientRect().left : 0;
  };


  const handleSort = (column: string) => {
    if (sortParameter === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortParameter(column);
      setSortOrder('asc');
    }
  };

  // Nova função auxiliar para pegar valores com segurança baseado no tipo do arquivo
  const getFileProperty = (file: IFile, col: string): string | number => {
    if (col === 'Name') return file.name;

    // Type Guard para propriedades específicas de IProject
    if (file.type === 'project') {
      const project = file as IProject;
      if (col == 'Category') return project.category
      if (col === 'Description') return project.description;
      if (col === 'Year') return project.year;
      if (col === 'External Link') return project.externalLink || 'N/A';
    }

    // Fallback para arquivos que não possuem essas colunas (ex: bio)
    return '-';
  };

  const sortFunction = (a: IFile, b: IFile) => {
    if (!sortParameter) return 0;

    const valA = getFileProperty(a, sortParameter);
    const valB = getFileProperty(b, sortParameter);

    let comparison = 0;
    if (typeof valA === 'string' && typeof valB === 'string') {
      comparison = valA.localeCompare(valB);
    } else if (typeof valA === 'number' && typeof valB === 'number') {
      comparison = valA - valB;
    }

    return sortOrder === 'desc' ? -comparison : comparison;
  };

  if (!doubleClicked.folder) return null;

  return (
    <Draggable bounds={'body'} handle=".opened-folder-header" onStart={() => setIsDragging(true)} onStop={() => setIsDragging(false)}>
      <div id='opened-folder' className={`opened-folder ${isDragging ? 'dragging' : ''}`} style={shadowStyle}>
        <div className="opened-folder-header">
          {/* Header se mantém igual */}
          <div className="opened-folder-header-title">{doubleClicked.folder?.name}</div>
          <div className='opened-folder-header-buttons'>
            <button onClick={() => toggleViewStyle()}>{viewStyle === 'list' ? gridIcon : listIcon}</button>
            <button onClick={() => setDoubleClicked({ folder: null, file: null })}>X</button>
          </div>
        </div>

        {viewStyle === 'list' ? (
          <div className='scrollable-content'>
            <div className='grid-container'>
              <div className="opened-folder-column-header">
                {columns.map((col, index) => (
                  <div
                    key={index}
                    className={`column-header-cell ${sortParameter === col ? 'sorted' : ''}`}
                    data-index={index}
                    style={{ width: columnWidths[index] }}
                  >
                    <p onClick={() => handleSort(col)} >{col}</p>
                    <div
                      className="resizer"
                      onMouseDown={() => handleMouseDown(index)}
                    />
                  </div>
                ))}
              </div>
              <div className="opened-folder-content-items">
                {doubleClicked.folder?.Files
                  .sort((a, b) => sortFunction(a, b))
                  .map((item, index) => (
                    <div key={item.name} className="opened-folder-content-items">
                      {columns.map((col, colIndex) => (
                        <div
                          key={colIndex}
                          className={`column-item-cell ${hoveredIndex === index ? 'hovered' : ''} ${selected === item.name ? 'selected' : ''}`}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          onClick={() => handleClick(item)}
                          onDoubleClick={() => handleDoubleClick(item)}
                          style={{ width: columnWidths[colIndex] }}>
                          <p>{getFileProperty(item, col)}</p>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className='icon-content'>
            {doubleClicked.folder?.Files.map((item, index) => (
              <File {...item} key={index} />
            ))}
          </div>
        )}
      </div>
    </Draggable >
  )
}

export default OpenedFolder