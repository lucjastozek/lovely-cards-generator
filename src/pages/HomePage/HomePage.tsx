import { useState, useEffect } from "react";
import Postcard from "../../common/components/Postcard";
import ColorPicker from "./components/ColorPicker";
import "./HomePage.css";
import {
  PictureFrame,
  User,
  Text,
  Lovely,
  MessageFavorite,
  Brush2,
  ArrowDown2,
  ArrowUp2,
} from "iconsax-reactjs";

export default function HomePage(): JSX.Element {
  const lightPalette: Record<string, `#${string}`> = {
    Cream: "#fffbe6",
    White: "#ffffff",
    Coral: "#EE7563",
    Orange: "#EA8644",
    Yellow: "#EBCD47",
    "Light Green": "#56C876",
    Green: "#4FB561",
    "Sky Blue": "#6DC5E2",
    Teal: "#3AC2DE",
    Lavender: "#A990B6",
    Purple: "#B186D5",
    Rose: "#DE7C8E",
    Pink: "#E47792",
    Peach: "#E97967",
  };

  const darkPalette: Record<string, `#${string}`> = {
    "Dark Gray": "#272727",
    Black: "#050505",
    "Dark Red": "#992F1E",
    Brown: "#913C03",
    Olive: "#6F5006",
    "Forest Green": "#205B33",
    "Dark Green": "#14591D",
    Navy: "#0F5A76",
    "Dark Teal": "#1F4E61",
    Eggplant: "#644E6E",
    "Dark Purple": "#573280",
    Maroon: "#832232",
    Burgundy: "#891F40",
    "Dark Orange": "#893E2F",
  };

  const [backgroundColor, setBackgroundColor] = useState(
    Object.values(darkPalette)[0]
  );
  const [textColor, setTextColor] = useState(Object.values(lightPalette)[0]);
  const [author, setAuthor] = useState("me");
  const [recipient, setRecipient] = useState("you");
  const [message, setMessage] = useState("i like you");
  const [brushColor, setBrushColor] = useState(Object.values(lightPalette)[0]);
  const [flexDirection, setFlexDirection] = useState<"row" | "column">("row");
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(portrait);
      if (!portrait) {
        setIsMoreOptionsOpen(true);
      }
    };

    checkOrientation();

    window.addEventListener("resize", checkOrientation);

    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  return (
    <main className="homepage-container" style={{ flexDirection }}>
      <div className="controls-panel">
        <div className="control-group">
          <h3 data-control="brush">
            <Brush2 color="var(--font)" />
            Brush color
          </h3>
          <ColorPicker
            setColor={setBrushColor}
            selectedColor={brushColor}
            palette={lightPalette}
          />
        </div>
        {isPortrait && (
          <button
            className="more-options-toggle"
            onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
            aria-label={
              isMoreOptionsOpen ? "Hide more options" : "Show more options"
            }
          >
            <span>More Options</span>
            {isMoreOptionsOpen ? (
              <ArrowUp2 size={18} color="var(--font)" />
            ) : (
              <ArrowDown2 size={18} color="var(--font)" />
            )}
          </button>
        )}

        <div
          className={`more-options-content ${isMoreOptionsOpen ? "open" : "closed"}`}
        >
          <div className="color-controls-row">
            <div className="color-control-item">
              <div className="control-group">
                <h3 data-control="background">
                  <PictureFrame color="var(--font)" />
                  Background color
                </h3>
                <ColorPicker
                  setColor={setBackgroundColor}
                  selectedColor={backgroundColor}
                  palette={darkPalette}
                />
              </div>
            </div>
            <div className="color-control-item">
              <div className="control-group">
                <h3 data-control="text">
                  <Text color="var(--font)" />
                  Text color
                </h3>
                <ColorPicker
                  setColor={setTextColor}
                  selectedColor={textColor}
                  palette={lightPalette}
                />
              </div>
            </div>
          </div>

          <div className="control-group">
            <h3 data-control="author">
              <User color="var(--font)" />
              Author
            </h3>
            <input
              id="author"
              className="enhanced-input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              aria-label="Who is sending this postcard?"
              placeholder="Your name..."
            />
          </div>

          <div className="control-group">
            <h3 data-control="recipient">
              <Lovely color="var(--font)" />
              Recipient
            </h3>
            <input
              id="recipient"
              className="enhanced-input"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              aria-label="Who is receiving this postcard?"
              placeholder="Their name..."
            />
          </div>

          <div className="control-group">
            <h3 data-control="message">
              <MessageFavorite color="var(--font)" />
              Message
            </h3>
            <textarea
              id="message"
              className="enhanced-input enhanced-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              aria-label="Your heartfelt message"
              placeholder="Write something sweet..."
            />
          </div>
        </div>
      </div>

      <div className="postcard-section">
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
