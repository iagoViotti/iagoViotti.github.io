import { useDivMode } from '../context/DivContext';
// import { useState } from 'react';
import './BottomDiv.css'

const BottomDiv = () => {
  const { divMode, setDivMode } = useDivMode();
  // const [popUpDiv, setPopUpDiv] = useState(false);
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  if (divMode === 'none')
    return (
      <>
        <div
          id="bottom-div"
          className={`bottom-div-${divMode}`}
          onMouseEnter={() => setDivMode('bottom-div')}
          onMouseLeave={() => setDivMode('none')}
          // onClick={(e) => {
          //   setMousePosition({ x: e.clientX, y: e.clientY });
          //   setPopUpDiv(true);
          // }}
        >
          <h1
          >Bottom Div
          </h1>
          {/* {popUpDiv && (
          <div
            id="pop-up-div"
            className={`pop-up-div-${divMode}`}
            style={{
              position: 'fixed',
              top: mousePosition.y,
              left: mousePosition.x,
              backgroundColor: 'var(--color-red)',
              height: '100px',
              width: '100px',
            }}
          >
          </div>
        )} */}
        </div>
      </>
    );

  if (divMode === 'profile-div')
    return (
      <>
        <div
          id="bottom-div"
          className={`bottom-div-${divMode}`}
          onMouseEnter={() => setDivMode('bottom-div')}
          onMouseLeave={() => setDivMode('none')}
        >
          <p>
            {divMode}
          </p>
        </div >
      </>
    );

  return (
    <>
      <div
        id="bottom-div"
        className={`bottom-div-${divMode}`}
        onMouseEnter={() => setDivMode('bottom-div')}
        onMouseLeave={() => setDivMode('none')}
      >
        <h1
        >Bottom Div
        </h1>
        <div
          className='bottom-div-content'
        >
          Bottom Div Content
        </div>
      </div>
    </>
  );

}

export default BottomDiv;