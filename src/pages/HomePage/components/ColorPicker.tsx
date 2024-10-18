import { useState } from "react";

interface ColorPickerProps {
  setColor: React.Dispatch<React.SetStateAction<string>>;
  selectedColor: string;
  height: string;
}

export default function ColorPicker({
  setColor,
  selectedColor,
  height,
}: ColorPickerProps): JSX.Element {
  const [col, setCol] = useState("#8ace00");

  const colors = [
    "#d64933",
    "#fa8334",
    "#ea9010",
    "#56c876",
    "#4fb561",
    "#6dc5e2",
    "#23b5d3",
    "#a288b1",
    "#8c4dc0",
    "#832232",
    "#da4167",
    "#e87461",
    "#160715",
    "#ffffff",
  ];

  const [chosenCol, setChosenCol] = useState(
    colors.findIndex((i) => i === selectedColor)
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "repeat(3, 1fr)",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "10% 2%",
        width: "calc(100% - 0.2rem)",
        height,
      }}
    >
      {colors.map((color, i) => {
        const c = color === "#ffffff" ? "var(--bg)" : "var(--font)";
        return (
          <button
            key={i}
            style={{
              backgroundColor: color,
              width: "100%",
              height: "100%",
              border: `0.1rem solid  ${chosenCol === i ? "var(--green1)" : "var(--font)"}`,
              color: c,
            }}
            aria-label={color}
            onClick={() => {
              setColor(color);
              setChosenCol(i);
            }}
          />
        );
      })}
      <input
        type="color"
        style={{
          background:
            "linear-gradient(var(--red), var(--yellow), var(--green1), var(--blue1), var(--purple1))",
          width: "100%",
          height: "100%",
          border: `0.1rem solid ${chosenCol === colors.length ? "var(--green1)" : "var(--font)"}`,
        }}
        value={col}
        onChange={(e) => {
          setCol(e.target.value);
          setColor(e.target.value);
          setChosenCol(colors.length);
        }}
      />
    </div>
  );
}
