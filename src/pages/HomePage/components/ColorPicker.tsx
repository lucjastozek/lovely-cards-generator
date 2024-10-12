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
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "repeat(3, 1fr)",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "1em",
        height: "7.5em",
        width: "100%",
      }}
    >
      {colors.map((color, i) => {
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: color,
              width: "100%",
              height: "100%",
              border: "0.1em solid var(--font)",
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
