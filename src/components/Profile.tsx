import { useState } from 'react';
import './Profile.css'

const Profile = () => {
  const [expand, setExpand] = useState(false);

  return (
    // <label
    //   onClick={() => {
    //     console.log('labeled');
    //   }}
    // >
      <div
        id="profile-div"
        className={expand ? 'div-expanded' : 'collapsed'}
        onMouseOver={() => {
          setExpand(true)
        }}
        onMouseOut={() => {
          setExpand(false)
        }}
      >
        <h1
          className={expand ? 'h1-expanded' : 'collapsed'}
        >Profile</h1>
        {expand ? 'expanded' : 'collapsed'}
      </div>
    // </label>
  );
}

export default Profile;