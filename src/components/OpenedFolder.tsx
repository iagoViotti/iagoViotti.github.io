import './OpenedFolder.css'
import Draggable from 'react-draggable'
import { useRef, useState } from 'react'
import { useSelect } from '../context/SelectContext'
import { mockProjects } from '../assets/mocks'


const columns = ['Name', 'Type', 'Description', 'Year', 'External Link'];

const OpenedFolder = () => {
  const { doubleClicked, setDoubleClicked } = useSelect()
  const [columnWidths, setColumnWidths] = useState<number[]>([200, 200, 200, 80, 200]);
  const currentColIndex = useRef<number | null>(null);
  const isResizing = useRef(false)
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sortParameter, setSortParameter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

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

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleSort = (column: string) => {
    if (sortParameter === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortParameter(column);
      setSortOrder('asc');
    }
  };

  const sortFunction = (a: any, b: any) => {
    if (!sortParameter) return 0;
    let comparison = 0;
    if (sortParameter === 'Name') comparison = a.name.localeCompare(b.name);
    else if (sortParameter === 'Type') comparison = a.type.localeCompare(b.type);
    else if (sortParameter === 'Description') comparison = a.description.localeCompare(b.description);
    else if (sortParameter === 'Year') comparison = a.year - b.year;
    else if (sortParameter === 'External Link') comparison = a.externalLink.localeCompare(b.externalLink);
    return sortOrder === 'desc' ? -comparison : comparison;
  };

  if (!doubleClicked) return null;

  return (
    <Draggable bounds={'body'} handle=".opened-folder-header" onStart={() => setIsDragging(true)} onStop={() => setIsDragging(false)}>
      <div className={`opened-folder ${isDragging ? 'dragging' : ''}`}>
        <div className="opened-folder-header">
          <div className="opened-folder-header-title">{doubleClicked}</div>
          <button
            onClick={() => { setDoubleClicked(null) }}
            className="opened-folder-header-close"
          >
            X
          </button>
        </div>
        <div className='scrollable-content'>
          <div className='grid-container'>
            <div className="opened-folder-column-header">
              {columns.map((col, index) => (
                <div
                  key={index}
                  className={`column-header-cell ${sortParameter === col ? 'sorted' : ''}`}
                  data-index={index}
                  style={{ width: columnWidths[index] }}
                  onClick={() => handleSort(col)}
                >
                  <p>{col}</p>
                  <div
                    className="resizer"
                    onMouseDown={() => handleMouseDown(index)}
                  />
                </div>
              ))}
            </div>
            <div className="opened-folder-content-items">
              {mockProjects
                .sort((a, b) => sortFunction(a, b))
                .map((item, index) => (
                  <div key={item.name} className="opened-folder-content-items">
                    <div className={`column-item-cell ${hoveredIndex === index ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave()} style={{ width: columnWidths[0] }}><p>{item.name}</p></div>
                    <div className={`column-item-cell ${hoveredIndex === index ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave()} style={{ width: columnWidths[1] }}><p>{item.type}</p></div>
                    <div className={`column-item-cell ${hoveredIndex === index ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave()} style={{ width: columnWidths[2] }}><p>{item.description}</p></div>
                    <div className={`column-item-cell ${hoveredIndex === index ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave()} style={{ width: columnWidths[3] }}><p>{item.year}</p></div>
                    <div className={`column-item-cell ${hoveredIndex === index ? 'hovered' : ''}`} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave()} style={{ width: columnWidths[4] }}><p>{item.externalLink || 'N/A'}</p></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default OpenedFolder
