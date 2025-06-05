import './File.css'
import { useSelect } from "../context/SelectContext"
import { fileIcon } from "../assets/svg/FileIcon"
import { IProject } from "../types/Index"
// import { mapTechIcon } from "../assets/svg/mapTechIcon"

const File = (props: IProject) => {
  const { name, mainStack } = props
  const { selected, handleClick, handleDoubleClick } = useSelect()

  const isMobile = window.innerWidth < 768

  return (
      <div
        className={`file ${selected === name ? "selected" : ""}`}
        onClick={() => {isMobile ? handleDoubleClick(props) : handleClick(props)}}
        onDoubleClick={() => {!isMobile && handleDoubleClick(props)}}
      >
        {/* {mapTechIcon[mainStack]} */}
        {fileIcon}
        <p>{name}</p>
      </div>
  )
}

export default File
