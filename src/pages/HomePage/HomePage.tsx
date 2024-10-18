import { useState } from "react";
import Postcard from "../../common/components/Postcard";
import ColorPicker from "./components/ColorPicker";

export default function HomePage(): JSX.Element {
  const [backgroundColor, setBackgroundColor] = useState("#e87461");
  const [textColor, setTextColor] = useState("#160715");
  const [author, setAuthor] = useState("me");
  const [recipient, setRecipient] = useState("you");
  const [message, setMessage] = useState("i like you");
  const [brushColor, setBrushColor] = useState("#160715");
  const [flexDirection, setFlexDirection] = useState<"row" | "column">("row");

  let w, h;
  if (window.innerHeight > window.innerWidth) {
    w = window.innerWidth * 0.8;
    h = (window.innerHeight - (w * 2) / 3) * 0.8;
  } else {
    h = window.innerHeight * 0.8;
    w = (h * 2) / 3;
  }

  return (
    <main
      style={{
        display: "flex",
        flexDirection,
        width: "80vw",
        marginTop: "1%",
        gap: "10%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2vh",
          width: "100%",
          height: `${h}px`,
          overflowY: "auto",
        }}
        className="scrollable-element"
      >
        <div style={{ display: "flex", gap: "2rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5em",
              width: "100%",
            }}
          >
            <h3>Background color</h3>
            <ColorPicker
              setColor={setBackgroundColor}
              selectedColor={backgroundColor}
              height="8rem"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5em",
              width: "100%",
            }}
          >
            <h3>Text color</h3>
            <ColorPicker
              setColor={setTextColor}
              selectedColor={textColor}
              height="8rem"
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          <h3>Author</h3>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          <h3>Recipient</h3>
          <input
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          <h3>Message</h3>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5em",
            width: "100%",
          }}
        >
          <h3>Brush color</h3>
          <ColorPicker
            setColor={setBrushColor}
            selectedColor={brushColor}
            height="8rem"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          width: "100%",
        }}
      >
        <Postcard
          backgroundColor={backgroundColor}
          textColor={textColor}
          brushColor={brushColor}
          author={author}
          recipient={recipient}
          message={message}
          setFlexDirection={setFlexDirection}
        />
      </div>
    </main>
  );
}
