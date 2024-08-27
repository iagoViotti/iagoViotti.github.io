import { useDivMode } from '../context/DivContext';
import contact from '../assets/svg/contact.svg';
import './SideDiv.css'

const SideDiv = () => {
  const { divMode, setDivMode } = useDivMode();

  if (divMode === 'none') {
    return (
      <>
        {
          <div
            id='side-div'
            className={`side-div-${divMode}`}
            onMouseEnter={() => setDivMode('side-div')}
            onMouseLeave={() => setDivMode('none')}
          >
            <h1
            >Side Div
            </h1>

          </div>
        }
      </>
    );
  }

  if (divMode === 'profile-div') {
    return (
      <>
        <div
          id='side-div'
          className={`side-div-${divMode}`}
          onMouseEnter={() => setDivMode('side-div')}
          onMouseLeave={() => setDivMode('none')}
        >
          <img src={contact} />
        </div>
      </>
    );
  }

  return (
    <>
      {
        <div
          id='side-div'
          className={`side-div-${divMode}`}
          onMouseEnter={() => setDivMode('side-div')}
          onMouseLeave={() => setDivMode('none')}
        >
          <h1
          >Side Div
          </h1>
          <div
            className='side-div-content'
          >
            Side Div Content
          </div>
        </div>
      }
    </>
  );

}

export default SideDiv;