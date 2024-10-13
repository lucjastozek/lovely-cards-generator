interface ColorPickerProps {
  setColor: React.Dispatch<React.SetStateAction<string>>;
  selectedColor: string;
}

export default function ColorPicker({
  setColor,
  selectedColor,
}: ColorPickerProps): JSX.Element {
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
    "#050505",
    "#fffbe6",
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "repeat(3, 1fr)",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "1em",
        width: "100%",
      }}
    >
      {colors.map((color, i) => {
        const c = color === "#fffbe6" ? "#050505" : "#fffbe6";
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: color,
              width: "100%",
              height: "2em",
              border: "0.1em solid var(--font)",
              color: c,
            }}
            aria-label={color}
            onClick={() => {
              setColor(color);
            }}
          >
            {color === selectedColor && "X"}
          </div>
        );
      })}
    </div>
  );
}
