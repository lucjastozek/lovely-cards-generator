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
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const foregroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [completedDrawings, setCompletedDrawings] = useState<Drawing[]>([]);
  const [currentDrawing, setCurrentDrawing] = useState<Drawing | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      try {
        if ("fonts" in document) {
          await document.fonts.ready;

          const extendedLatinText = "ĄąĆćĘęŁłŃńÓóŚśŹźŻż";
          const basicText = "ABCabc";

          await Promise.all([
            document.fonts.load(`400 16px 'Comic Relief'`, basicText),
            document.fonts.load(`700 16px 'Comic Relief'`, basicText),
            document.fonts.load(`400 16px 'Comic Relief'`, extendedLatinText),
            document.fonts.load(`700 16px 'Comic Relief'`, extendedLatinText),
            document.fonts.load(`400 16px 'Comic Neue'`, basicText),
            document.fonts.load(`700 16px 'Comic Neue'`, basicText),
            document.fonts.load(`400 16px 'Comic Neue'`, extendedLatinText),
            document.fonts.load(`700 16px 'Comic Neue'`, extendedLatinText),
          ]);

          setTimeout(() => setFontLoaded(true), 150);
        } else {
          setTimeout(() => setFontLoaded(true), 2500);
        }
      } catch {
        console.warn("Comic fonts failed to load, using fallback");
        setFontLoaded(true);
      }
    };

    loadFont();
  }, []);

  const drawBackgroundCanvas = useCallback(() => {
    const canvas = backgroundCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = textColor;

    const isPortraitCanvas = w < h;
    const baseFontSize = Math.min(w, h) * 0.08;
    const smallFontSize = baseFontSize * 0.5;
    const padding = Math.min(w, h) * 0.03;

    const fontFamily = fontLoaded
      ? "'Comic Relief', 'Comic Neue', 'Comic Sans MS', sans-serif"
      : "'Comic Neue', 'Comic Sans MS', sans-serif";

    if (isPortraitCanvas) {
      ctx.font = `${baseFontSize}px ${fontFamily}`;
      wrapText(
        ctx,
        message,
        padding,
        baseFontSize + padding,
        w - 2 * padding,
        baseFontSize * 1.2
      );

      ctx.font = `${smallFontSize}px ${fontFamily}`;
      ctx.fillText(`from: ${author}`, padding, h - smallFontSize * 2);
      ctx.fillText(`to: ${recipient}`, padding, h - padding);
    } else {
      ctx.font = `${baseFontSize}px ${fontFamily}`;
      wrapText(
        ctx,
        message,
        padding,
        baseFontSize + padding,
        w - 2 * padding,
        baseFontSize * 1.2
      );

      ctx.font = `${smallFontSize}px ${fontFamily}`;
      ctx.fillText(`from: ${author}`, padding, h - smallFontSize * 2);
      ctx.fillText(`to: ${recipient}`, padding, h - padding);
    }

    for (const drawing of completedDrawings) {
      drawPath(ctx, drawing, w);
    }
  }, [
    backgroundColor,
    textColor,
    author,
    recipient,
    message,
    completedDrawings,
    fontLoaded,
  ]);

  const drawForegroundCanvas = useCallback(() => {
    const canvas = foregroundCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentDrawing) {
      drawPath(ctx, currentDrawing, w);
    }
  }, [currentDrawing]);

  const updateCanvasSize = useCallback(() => {
    const backgroundCanvas = backgroundCanvasRef.current;
    const foregroundCanvas = foregroundCanvasRef.current;
    const container = containerRef.current;
    if (!backgroundCanvas || !foregroundCanvas || !container) return;

    const rect = backgroundCanvas.getBoundingClientRect();
    const devicePixelRatio = window.devicePixelRatio || 1;

    [backgroundCanvas, foregroundCanvas].forEach((canvas) => {
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(devicePixelRatio, devicePixelRatio);
      }
    });

    const isPortrait = window.innerHeight > window.innerWidth;
    setFlexDirection(isPortrait ? "column" : "row");

    drawBackgroundCanvas();
    const foregroundCtx = foregroundCanvas.getContext("2d");
    if (foregroundCtx) {
      foregroundCtx.clearRect(
        0,
        0,
        foregroundCanvas.width,
        foregroundCanvas.height
      );
    }
  }, [setFlexDirection, drawBackgroundCanvas]);

  useEffect(() => {
    updateCanvasSize();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateCanvasSize]);

  useEffect(() => {
    drawBackgroundCanvas();
  }, [drawBackgroundCanvas]);

  useEffect(() => {
    drawForegroundCanvas();
  }, [drawForegroundCanvas]);

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
    const canvas = foregroundCanvasRef.current;
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
    setCurrentDrawing({
      points: [pos],
      color: brushColor,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentDrawing) return;

    const pos = getMousePos(e);
    setCurrentDrawing({
      color: currentDrawing.color,
      points: [...currentDrawing.points, pos],
    });
  };

  const handleMouseUp = () => {
    if (isDrawing && currentDrawing) {
      setCompletedDrawings((prev) => [...prev, currentDrawing]);
      setCurrentDrawing(null);
    }
    setIsDrawing(false);
  };

  const handleMouseLeave = () => {
    if (isDrawing && currentDrawing) {
      setCompletedDrawings((prev) => [...prev, currentDrawing]);
      setCurrentDrawing(null);
    }
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = e.touches[0];
    const canvas = foregroundCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const pos = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };

    setIsDrawing(true);
    setCurrentDrawing({
      points: [pos],
      color: brushColor,
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentDrawing) return;

    const touch = e.touches[0];
    const canvas = foregroundCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const pos = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };

    setCurrentDrawing({
      color: currentDrawing.color,
      points: [...currentDrawing.points, pos],
    });
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (isDrawing && currentDrawing) {
      setCompletedDrawings((prev) => [...prev, currentDrawing]);
      setCurrentDrawing(null);
    }
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
    const canvas = backgroundCanvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `Lovely_card_${formatDate()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const clearDrawing = () => {
    setCompletedDrawings([]);
    setCurrentDrawing(null);
  };

  return (
    <div
      ref={containerRef}
      className="postcard-container"
      id="postcard-container"
    >
      <div className="canvas-wrapper">
        <canvas
          ref={backgroundCanvasRef}
          className="postcard-canvas postcard-canvas--background"
        />
        <canvas
          ref={foregroundCanvasRef}
          className="postcard-canvas postcard-canvas--foreground"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>
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
