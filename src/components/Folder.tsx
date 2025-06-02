import Draggable from "react-draggable"
import './Folder.css'
import { useSelect } from "../context/SelectContext"
import { folderIcon } from "../assets/svg/FolderIcon"
import { IFolder } from "../types/Index"

const Folder = (props: IFolder) => {
  const { name } = props
  const { selected, handleClick, handleDoubleClick } = useSelect()

  const isMobile = window.innerWidth < 768

  if (isMobile) {
    return (
      <div
        className={`folder ${selected === name ? "selected" : ""}`}
        onClick={() => handleDoubleClick(props)}
      >
        {folderIcon}
        <p>{name}</p>
      </div>
    )
  }

  return (
    <Draggable bounds={'body'}>
      <div
        className={`folder ${selected === name ? "selected" : ""}`}
        onClick={() => handleClick(props)}
        onDoubleClick={() => handleDoubleClick(props)}
      >
        {folderIcon}
        <p>{name}</p>
      </div>
    </Draggable>
  )
}

export default Folder
