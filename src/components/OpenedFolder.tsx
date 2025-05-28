import './OpenedFolder.css'
import Draggable from 'react-draggable'
import { useRef, useState } from 'react'
import { useSelect } from '../context/SelectContext'
import { Project } from '../types/Index'

const mockData: Project[] = [
  {
    name: 'Project 1',
    type: 'Type 1',
    description: 'Description 1',
    year: 2021,
    image: 'image1.jpg',
    externalLink: 'https://example.com/project1',
  },
  {
    name: 'Project 2',
    type: 'Type 2',
    description: 'Description 2',
    year: 2022,
    image: 'image2.jpg',
    externalLink: 'https://example.com/project2',
  },
]

const columns = ['Name', 'Type', 'Description', 'Year', 'External Link'];

const OpenedFolder = () => {
  const { doubleClicked, setDoubleClicked } = useSelect()
  const [columnWidths, setColumnWidths] = useState<number[]>([200, 200, 200, 100, 200]);
  const currentColIndex = useRef<number | null>(null);
  const isResizing = useRef(false)
  const [isDragging, setIsDragging] = useState(false);

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
                  className="column-header-cell"
                  data-index={index}
                  style={{ width: columnWidths[index] }}
                  // onClick={() => sortByColumn(index)}
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
              {mockData.map((item) => (
                <div key={item.name} className="opened-folder-content-items">
                  <div className="column-item-cell" style={{ width: columnWidths[0] }}><p>{item.name}</p></div>
                  <div className="column-item-cell" style={{ width: columnWidths[1] }}><p>{item.type}</p></div>
                  <div className="column-item-cell" style={{ width: columnWidths[2] }}><p>{item.description}</p></div>
                  <div className="column-item-cell" style={{ width: columnWidths[3] }}><p>{item.year}</p></div>
                  {/* <div className="column-item-cell" style={{ width: columnWidths[4] }}><p>{item.image}</p></div> */}
                  <div className="column-item-cell" style={{ width: columnWidths[4] }}><p>{item.externalLink}</p></div>
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
