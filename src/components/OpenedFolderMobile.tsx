import './OpenedFolder.css'
import { useRef, useState } from 'react'
import { useSelect } from '../context/SelectContext'
import File from './File'
import { IProject } from '../types/Index'
import { gridIcon } from '../assets/svg/GridIcon'
import { listIcon } from '../assets/svg/ListIcon'

type ViewStyle = 'list' | 'icon';

const columns = ['Name', 'Type', 'Description', 'Year', 'External Link'];

const OpenedFolderMobile = () => {
  const { doubleClicked, setDoubleClicked } = useSelect()
  const isMobile = window.innerWidth <= 768;

  if (!doubleClicked.folder) return null;

  return (

    <div id='opened-folder' className='opened-folder'>
      <div className="opened-folder-header">
        <div className="opened-folder-header-title">
          {doubleClicked.folder?.name}
        </div>
        <div className='opened-folder-header-buttons'>
          <button
            onClick={() => { setDoubleClicked({ folder: null, file: null }) }}
            className="opened-folder-header-close"
          >
            X
          </button>
        </div>
      </div>

      <div className='icon-content'>
        {doubleClicked.folder?.Files.map((item, index) => (
          <File
            {...item}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default OpenedFolderMobile
