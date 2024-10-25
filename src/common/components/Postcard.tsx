import Sketch from "react-p5";
import P5 from "p5";
import { useRef, useState } from "react";

interface PostcardProps {
  backgroundColor: string;
  textColor: string;
  brushColor: string;
  author: string;
  recipient: string;
  message: string;
  setFlexDirection: React.Dispatch<React.SetStateAction<"row" | "column">>;
}

interface Point {
  x: number;
  y: number;
}

interface Drawing {
  points: Point[];
  color: string;
}

export default function Postcard({
  backgroundColor,
  textColor,
  brushColor,
  author,
  recipient,
  message,
  setFlexDirection,
}: PostcardProps): JSX.Element {
  let w, h;
  const p5Ref = useRef<P5 | null>(null);

  if (window.innerHeight > window.innerWidth) {
    w = window.innerWidth * 0.8;
    h = (w * 2) / 3 - 20;

    setFlexDirection("column");
  } else {
    h = window.innerHeight * 0.8;
    w = (h * 2) / 3;

    if (w > window.innerWidth * 0.4) {
      w = window.innerWidth * 0.4;
      h = (w * 3) / 2;
    }
  }

  const [drawings, setDrawings] = useState<Drawing[]>([]);

  const setup = (p5: P5, canvasParentRef: Element) => {
    p5.createCanvas(w, h).parent(canvasParentRef);
    p5.frameRate(200);
    p5Ref.current = p5;
  };

  const drawDrawing = (p5: P5, drawing: Drawing) => {
    p5.noFill();
    p5.stroke(drawing.color);
    p5.strokeWeight(p5.width * 0.01);

    p5.beginShape();

    for (const p of drawing.points) {
      p5.vertex(p.x, p.y);
    }

    p5.endShape();
  };

  const draw = (p5: P5) => {
    p5.background(backgroundColor);
    p5.fill(textColor);
    p5.noStroke();

    p5.textWrap(p5.WORD);
    p5.textFont("Comic Neue");

    if (w < h) {
      p5.textSize(p5.width * 0.1);
      p5.text(`${message}`, p5.width * 0.05, p5.height * 0.05, p5.width * 0.9);

      p5.textSize(p5.width * 0.05);
      p5.text(
        `from: ${author}`,
        p5.width * 0.05,
        p5.height * 0.9,
        p5.width * 0.8
      );
      p5.text(
        `to: ${recipient}`,
        p5.width * 0.05,
        p5.height * 0.95,
        p5.width * 0.8
      );
    } else {
      p5.textSize(p5.height * 0.1);
      p5.text(`${message}`, p5.width * 0.02, p5.height * 0.05, p5.width * 0.9);

      p5.textSize(p5.height * 0.05);
      p5.text(
        `from: ${author}`,
        p5.width * 0.02,
        p5.height * 0.87,
        p5.width * 0.8
      );
      p5.text(
        `to: ${recipient}`,
        p5.width * 0.02,
        p5.height * 0.92,
        p5.width * 0.8
      );
    }

    for (const drawing of drawings) {
      drawDrawing(p5, drawing);
    }
  };

  const mousePressed = () => {
    setDrawings((prev) => [
      ...prev,
      {
        points: [],
        color: brushColor,
      },
    ]);
  };

  const mouseDragged = (p5: P5) => {
    setDrawings((prev) => [
      ...prev.slice(0, -1),
      {
        color: prev[prev.length - 1].color,
        points: [
          ...prev[prev.length - 1].points,
          { x: p5.mouseX, y: p5.mouseY },
        ],
      },
    ]);
  };

  const formatDate = () => {
    const now = new Date();
    return now
      .toLocaleString("en-GB")
      .replace(/[:/, ]/g, "-")
      .slice(0, -3);
  };

  const downloadCard = () => {
    const p5 = p5Ref.current;

    if (p5) {
      p5.saveCanvas(`Lovely_card_${formatDate()}`, "jpg");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
      id="postcard-container"
    >
      <Sketch
        setup={setup}
        draw={draw}
        mouseDragged={mouseDragged}
        mousePressed={mousePressed}
        style={{
          border: "0.2rem solid var(--font)",
          height: `${h}px`,
          width: `${w}px`,
          cursor: "crosshair",
        }}
      />
      <button
        style={{ backgroundColor: "var(--blue1)" }}
        onClick={downloadCard}
      >
        Download
      </button>
    </div>
  );
}
