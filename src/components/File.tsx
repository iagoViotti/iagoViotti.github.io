import './File.css'
import { useSelect } from "../context/SelectContext"
import { fileIcon } from "../assets/svg/FileIcon"
import { IProject } from "../types/Index"
import Draggable from 'react-draggable'
// import { mapTechIcon } from "../assets/svg/mapTechIcon"

const File = (props: IProject) => {
  const { name, mainStack } = props
  const { selected, handleClick, handleDoubleClick } = useSelect()

  const isMobile = window.innerWidth < 768

  if (!isMobile) {
    return (
      <Draggable bounds={'body'}>
        <div
          className={`file ${selected === name ? "selected" : ""}`}
          onClick={() => handleClick(props)}
          onDoubleClick={() => handleDoubleClick(props)}
        >
          {/* {mapTechIcon[mainStack]} */}
          {fileIcon}
          <p>{name}</p>
        </div>
      </Draggable>
    )
  }

  return (
    <div
      className={`file ${selected === name ? "selected" : ""}`}
        onClick={() => handleDoubleClick(props)}
    >
      {/* {mapTechIcon[mainStack]} */}
      {fileIcon}
      <p>{name}</p>
    </div>
  )
}

export default File
