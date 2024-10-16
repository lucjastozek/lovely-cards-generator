import { BrowserView, MobileView } from "react-device-detect";
import "./App.css";
import Navbar from "./common/Navbar";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <BrowserView>
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
      </BrowserView>
      <MobileView>
        <h1>{"Mobile version not available :("}</h1>
      </MobileView>
    </>
  );
}

export default App;
