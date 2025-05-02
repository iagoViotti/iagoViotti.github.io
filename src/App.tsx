import Draggable from "react-draggable"

const App = () => {
  return (
    <div className="App">
      <h1>Welcome to the App</h1>
      <p>This is a simple React application.</p>
      <Draggable>
        <div className="draggable">
          <h2>Drag me around!</h2>
          <p>You can drag this element anywhere on the screen.</p>
        </div>
      </Draggable>
    </div>
  )
}

export default App
