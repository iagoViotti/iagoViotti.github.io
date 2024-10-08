import { useDivMode } from '../context/DivContext';
// import { useState } from 'react';
import './Profile.css'
import ProfileCarousel from './ProfileCarousel';

const Profile = () => {
  const { divMode, setDivMode } = useDivMode();
  // const [isDisabled, setIsDisabled] = useState(false);

  return (
    <>
      {
        divMode === 'profile-div' ? (
          <div
            id="profile-div"
            className={`profile-div-${divMode}`}
            onMouseEnter={() => setDivMode('profile-div')}
            onMouseLeave={() => setDivMode('none')}
          >
            <div
              className='profile-div-content'
            >
              Profile Div Content
            </div>
          </div>
        ) :
          (
            <div
              id="profile-div"
              className={`profile-div-${divMode}`}
              onMouseEnter={() => setDivMode('profile-div')}
              onMouseLeave={() => setDivMode('none')}
            >
              <ProfileCarousel />
            </div>
          )
      }
    </>
  );
}

export default Profile;