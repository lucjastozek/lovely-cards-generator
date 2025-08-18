import "./App.css";
import Navbar from "./common/Navbar";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
