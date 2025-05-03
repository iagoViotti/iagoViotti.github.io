import Draggable from "react-draggable"
import './Folder.css'
import { useSelect } from "../context/SelectContext"
import { folderIcon } from "../assets/svg/FolderIcon"

const Folder = (props: { name: string }) => {
  const { name } = props
  const { selected, handleClick } = useSelect()

  return (
    <Draggable bounds={'body'}>
      <div
        className={`folder ${selected === name ? "selected" : ""}`}
        onClick={() => handleClick(name)}
      >
        {folderIcon}
        <p>{name}</p>
      </div>
    </Draggable>
  )
}

export default Folder
