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
        height: "100dvh",
        gap: "1dvh",
      }}
    >
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
