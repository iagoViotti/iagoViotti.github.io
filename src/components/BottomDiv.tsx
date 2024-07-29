import { useDivMode } from '../context/DivContext';
// import { useState } from 'react';
// import './BottomDiv.css'

const BottomDiv = () => {
  const { divMode, setDivMode } = useDivMode();
  // const [isDisabled, setIsDisabled] = useState(false);

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
      </div>
    </>
  );
}

export default BottomDiv;