import { useScroll } from '@react-three/drei';

import './Home.css';

const Home = () => {
  const data = useScroll();
  // useFrame(() => {
  // });

  return (
    <div className="home-container">
      <header
        id="header"
      >
        <h1>Home</h1>
      </header>
      <p>This is the home page</p>
    </div>
  )
}

export default Home;
