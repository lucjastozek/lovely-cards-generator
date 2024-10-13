import { useState } from "react";
import Postcard from "../../common/components/Postcard";
import ColorPicker from "./components/ColorPicker";

export default function HomePage(): JSX.Element {
  const [backgroundColor, setBackgroundColor] = useState("#e87461");
  const [textColor, setTextColor] = useState("#050505");
  const [author, setAuthor] = useState("me");
  const [recipient, setRecipient] = useState("you");
  const [message, setMessage] = useState("i like you");
  const [brushColor, setBrushColor] = useState("#050505");

  return (
    <main
      style={{
        display: "flex",
        width: "80vw",
        height: "100%",
        marginTop: "2rem",
        gap: "4rem",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          width: "100%",
        }}
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
            <p>Background color</p>
            <ColorPicker
              setColor={setBackgroundColor}
              selectedColor={backgroundColor}
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
            <p>Text color</p>
            <ColorPicker setColor={setTextColor} selectedColor={textColor} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          <label htmlFor="recipient">Recipient</label>
          <input
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
          <p>Brush color</p>
          <ColorPicker setColor={setBrushColor} selectedColor={brushColor} />
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
        />
      </div>
    </main>
  );
}
