import { useRef, useState, useEffect, useCallback } from "react";
import "./Postcard.css";
import { DocumentDownload, Eraser } from "iconsax-reactjs";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = textColor;

    const isPortraitCanvas = w < h;
    const baseFontSize = Math.min(w, h) * 0.08;
    const smallFontSize = baseFontSize * 0.5;
    const padding = Math.min(w, h) * 0.03;

    if (isPortraitCanvas) {
      ctx.font = `${baseFontSize}px Comic Neue, cursive`;
      wrapText(
        ctx,
        message,
        padding,
        baseFontSize + padding,
        w - 2 * padding,
        baseFontSize * 1.2
      );

      ctx.font = `${smallFontSize}px Comic Neue, cursive`;
      ctx.fillText(`from: ${author}`, padding, h - smallFontSize * 2);
      ctx.fillText(`to: ${recipient}`, padding, h - padding);
    } else {
      ctx.font = `${baseFontSize}px Comic Neue, cursive`;
      wrapText(
        ctx,
        message,
        padding,
        baseFontSize + padding,
        w - 2 * padding,
        baseFontSize * 1.2
      );

      ctx.font = `${smallFontSize}px Comic Neue, cursive`;
      ctx.fillText(`from: ${author}`, padding, h - smallFontSize * 2);
      ctx.fillText(`to: ${recipient}`, padding, h - padding);
    }

    for (const drawing of drawings) {
      drawPath(ctx, drawing, w);
    }
  }, [backgroundColor, textColor, author, recipient, message, drawings]);

  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = canvas.getBoundingClientRect();
    const devicePixelRatio = window.devicePixelRatio || 1;

    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    const isPortrait = window.innerHeight > window.innerWidth;
    setFlexDirection(isPortrait ? "column" : "row");

    drawCanvas();
  }, [setFlexDirection, drawCanvas]);

  useEffect(() => {
    updateCanvasSize();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateCanvasSize]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) => {
    const words = text.split(" ");
    let line = "";
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  };

  const drawPath = (
    ctx: CanvasRenderingContext2D,
    drawing: Drawing,
    canvasWidth: number
  ) => {
    if (drawing.points.length < 2) return;

    ctx.strokeStyle = drawing.color;
    ctx.lineWidth = canvasWidth * 0.01;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(drawing.points[0].x, drawing.points[0].y);

    for (let i = 1; i < drawing.points.length; i++) {
      ctx.lineTo(drawing.points[i].x, drawing.points[i].y);
    }

    ctx.stroke();
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const pos = getMousePos(e);
    setDrawings((prev) => [
      ...prev,
      {
        points: [pos],
        color: brushColor,
      },
    ]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const pos = getMousePos(e);
    setDrawings((prev) => [
      ...prev.slice(0, -1),
      {
        color: prev[prev.length - 1].color,
        points: [...prev[prev.length - 1].points, pos],
      },
    ]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseLeave = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const pos = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };

    setIsDrawing(true);
    setDrawings((prev) => [
      ...prev,
      {
        points: [pos],
        color: brushColor,
      },
    ]);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const pos = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };

    setDrawings((prev) => [
      ...prev.slice(0, -1),
      {
        color: prev[prev.length - 1].color,
        points: [...prev[prev.length - 1].points, pos],
      },
    ]);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  const formatDate = () => {
    const now = new Date();
    return now
      .toLocaleString("en-GB")
      .replace(/[:/, ]/g, "-")
      .slice(0, -3);
  };

  const downloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `Lovely_card_${formatDate()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const clearDrawing = () => {
    setDrawings([]);
  };

  return (
    <div
      ref={containerRef}
      className="postcard-container"
      id="postcard-container"
    >
      <canvas
        ref={canvasRef}
        className="postcard-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <div className="postcard-controls">
        <button
          className="postcard-button postcard-button--download"
          onClick={downloadCard}
        >
          Download
          <DocumentDownload color="var(--font)" />
        </button>
        <button
          className="postcard-button postcard-button--clear"
          onClick={clearDrawing}
        >
          Clear
          <Eraser color="var(--font)" />
        </button>
      </div>
    </div>
  );
}
