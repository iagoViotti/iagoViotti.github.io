import './OpenedFolder.css'
import Draggable from 'react-draggable'
import { useRef, useState, useEffect } from 'react'
import { useSelect } from '../context/SelectContext'
import File from './File'
import { IProject } from '../types/Index'

type ViewStyle = 'list' | 'icon';

const columns = ['Name', 'Type', 'Description', 'Year', 'External Link'];

const OpenedFolder = () => {
  const { doubleClicked, setDoubleClicked, selected, handleClick, handleDoubleClick, mousePosition, setMousePosition } = useSelect()
  const [columnWidths, setColumnWidths] = useState<number[]>([200, 150, 200, 80, 200]);
  const currentColIndex = useRef<number | null>(null);
  const isResizing = useRef(false)
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sortParameter, setSortParameter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [shadowStyle, setShadowStyle] = useState({ boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.5)' });
  const [viewStyle, setViewStyle] = useState<ViewStyle>('icon');

  // useEffect(() => {
  //   const handleMouseMove = (event: MouseEvent) => {
  //     setMousePosition({ x: event.clientX, y: event.clientY });
  //   };

  //   document.addEventListener('mousemove', handleMouseMove);

  //   return () => {
  //     document.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);

  // useEffect(() => {
  //   const shadowX = mousePosition.x - (window.innerWidth / 2);
  //   const shadowY = mousePosition.y - (window.innerHeight / 2);
  //   setShadowStyle({
  //     boxShadow: `${shadowX}px ${shadowY}px rgb(0, 0, 0)`,
  //   });

  //   const folder = document.getElementById('opened-folder');
  //   const folderTranslateStyleValue = folder ? folder.style.getPropertyValue('transform') : '';
  //   const translateValue = folderTranslateStyleValue.replace('translate(', '').replace(')', '');
  //   const translateX = parseFloat(translateValue.split(',')[0]);
  //   const translateY = parseFloat(translateValue.split(',')[1]);
  //   const folderCenterX = folder ? (folder.offsetLeft + folder.offsetWidth / 2) - translateX : 0;
  //   const folderCenterY = folder ? (folder.offsetTop + folder.offsetHeight / 2) - translateY : 0;

  //   console.log(`Mouse Position: (${mousePosition.x}, ${mousePosition.y})
  //     Folder Center: (${folderCenterX}, ${folderCenterY})
  //     `);

  // }, [mousePosition]);

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

  const sortFunction = (a: IProject, b: IProject) => {
    if (!sortParameter) return 0;
    let comparison = 0;
    if (sortParameter === 'Name') comparison = a.name.localeCompare(b.name);
    else if (sortParameter === 'Type') comparison = a.type.localeCompare(b.type);
    else if (sortParameter === 'Description') comparison = a.description.localeCompare(b.description);
    else if (sortParameter === 'Year') comparison = a.year - b.year;
    else if (sortParameter === 'External Link') comparison = a.externalLink.localeCompare(b.externalLink);
    return sortOrder === 'desc' ? -comparison : comparison;
  };

  if (!doubleClicked.folder) return null;

  return (
    <Draggable bounds={'body'} handle=".opened-folder-header" onStart={() => setIsDragging(true)} onStop={() => setIsDragging(false)}>
      <div id='opened-folder' className={`opened-folder ${isDragging ? 'dragging' : ''}`} style={shadowStyle}>
        <div className="opened-folder-header">
          <div className="opened-folder-header-title">
            {doubleClicked.folder?.name}
          </div>
          <button
            onClick={() => { setDoubleClicked({ folder: null, file: null }) }}
            className="opened-folder-header-close"
          >
            X
          </button>
        </div>
        {viewStyle === 'list'
          ?
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
                      <div
                        className={`column-item-cell ${hoveredIndex === index ? 'hovered' : ''} ${selected === item.name ? 'selected' : ''}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => handleClick(item)}
                        onDoubleClick={() => handleDoubleClick(item)}
                        style={{ width: columnWidths[0] }}>
                        <p>{item.name}</p>
                      </div>
                      <div
                        className={`column-item-cell ${hoveredIndex === index ? 'hovered' : ''} ${selected === item.name ? 'selected' : ''}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => handleClick(item)}
                        onDoubleClick={() => handleDoubleClick(item)}
                        style={{ width: columnWidths[1] }}>
                        <p>{item.type}</p>
                      </div>
                      <div
                        className={`column-item-cell ${hoveredIndex === index ? 'hovered' : ''} ${selected === item.name ? 'selected' : ''}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => handleClick(item)}
                        onDoubleClick={() => handleDoubleClick(item)}
                        style={{ width: columnWidths[2] }}>
                        <p>{item.description}</p>
                      </div>
                      <div
                        className={`column-item-cell ${hoveredIndex === index ? 'hovered' : ''} ${selected === item.name ? 'selected' : ''}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => handleClick(item)}
                        onDoubleClick={() => handleDoubleClick(item)}
                        style={{ width: columnWidths[3] }}>
                        <p>{item.year}</p>
                      </div>
                      <div
                        className={`column-item-cell ${hoveredIndex === index ? 'hovered' : ''} ${selected === item.name ? 'selected' : ''}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{ width: columnWidths[4] }}>
                        <p>{item.externalLink || 'N/A'}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          :
          <div className='icon-content'>
            {doubleClicked.folder?.Files.map((item, index) => (
              <File
                {...item}
                key={index}
              />
            ))}
          </div>
        }
      </div>
    </Draggable>
  )
}

export default OpenedFolder
