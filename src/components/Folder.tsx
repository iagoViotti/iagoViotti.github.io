import Draggable from "react-draggable"
import './Folder.css'
import { useSelect } from "../context/SelectContext"
import { folderIcon } from "../assets/svg/folder"

const Folder = (props: { name: string }) => {
  const { name } = props
  const { selected, setSelected, lastTimeClicked, setLastTimeClicked } = useSelect()

  const handleClick = () => {
    setSelected(name)
    setLastTimeClicked(Date.now())
    if (Date.now() - lastTimeClicked < 200) {
      console.log("Double click detected on", name)
    }
    setLastTimeClicked(Date.now())
  }

  return (
    <Draggable bounds={'body'}>
      <div
        className={`folder ${selected === name ? "selected" : ""}`}
        onClick={() => handleClick()}
      >
        {folderIcon}
        <p>{name}</p>
      </div>
    </Draggable>
  )
}

export default Folder
