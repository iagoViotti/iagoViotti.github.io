import Draggable from "react-draggable"
import './Folder.css'
import { useSelect } from "../context/SelectContext"
import { folderIcon } from "../assets/svg/FolderIcon"
import { IFolder } from "../types/Index"

const Folder = (props: IFolder) => {
  const { name } = props
  const { selected, handleClick } = useSelect()

  return (
    <Draggable bounds={'body'}>
      <div
        className={`folder ${selected === name ? "selected" : ""}`}
        onClick={() => handleClick(props)
        }
      >
        {folderIcon}
        <p>{name}</p>
      </div>
    </Draggable>
  )
}

export default Folder
