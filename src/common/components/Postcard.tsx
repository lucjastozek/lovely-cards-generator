import Sketch from "react-p5";
import P5 from "p5";
import { useState } from "react";

interface PostcardProps {
  backgroundColor: string;
  textColor: string;
  brushColor: string;
  author: string;
  recipient: string;
  message: string;
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
}: PostcardProps): JSX.Element {
  let w, h;
  if (window.innerHeight > window.innerWidth) {
    w = window.innerWidth * 0.8;
    h = (w * 2) / 3;
  } else {
    h = window.innerHeight * 0.8;
    w = (h * 2) / 3;
  }

  const [drawings, setDrawings] = useState<Drawing[]>([]);

  const setup = (p5: P5, canvasParentRef: Element) => {
    p5.createCanvas(w, h).parent(canvasParentRef);
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
    } else {
      p5.textSize(p5.height * 0.1);
    }

    p5.text(`${message}`, p5.width * 0.05, p5.height * 0.05, p5.width * 0.9);

    if (w < h) {
      p5.textSize(p5.width * 0.05);
    } else {
      p5.textSize(p5.height * 0.1);
    }

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

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mouseDragged={mouseDragged}
      mousePressed={mousePressed}
      style={{
        border: "0.2em solid var(--font)",
        height: `${h}px`,
        width: `${w}px`,
        cursor: "crosshair",
      }}
    />
  );
}
