import { useEffect, useState } from "react";
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
  const [postcard, setPostcard] = useState<HTMLElement | null>(null);
  const [nav, setNav] = useState<HTMLElement | null>(null);
  const [h, setH] = useState(window.innerHeight);

  useEffect(() => {
    setPostcard(document.querySelector("#postcard-container") as HTMLElement);
    setNav(document.querySelector("nav") as HTMLElement);

    const height = postcard?.offsetHeight
      ? nav?.offsetHeight
        ? window.innerHeight - postcard.offsetHeight - nav.offsetHeight
        : window.innerHeight - postcard.offsetHeight
      : window.innerHeight;

    setH(height);

    console.log(h);
  }, [postcard, h, nav]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection,
        width: "80vw",
        marginTop: "1%",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2vh",
          width: "100%",
          height:
            window.innerHeight > window.innerWidth
              ? `calc(${h}px - 3rem - 3dvh)`
              : "100%",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", gap: "2rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              width: "100%",
            }}
          >
            <h3>Background color</h3>
            <ColorPicker
              setColor={setBackgroundColor}
              selectedColor={backgroundColor}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              width: "100%",
            }}
          >
            <h3>Text color</h3>
            <ColorPicker setColor={setTextColor} selectedColor={textColor} />
          </div>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <h3>Author</h3>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <h3>Recipient</h3>
          <input
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
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
            gap: "0.5rem",
            width: "100%",
          }}
        >
          <h3>Brush color</h3>
          <ColorPicker setColor={setBrushColor} selectedColor={brushColor} />
        </div>
      </div>

      <Postcard
        backgroundColor={backgroundColor}
        textColor={textColor}
        brushColor={brushColor}
        author={author}
        recipient={recipient}
        message={message}
        setFlexDirection={setFlexDirection}
      />
    </main>
  );
}
