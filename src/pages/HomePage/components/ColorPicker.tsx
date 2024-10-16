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
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: color,
              width: "100%",
              height: "100%",
              border: `0.1rem solid  ${color === selectedColor ? "var(--green1)" : "var(--font)"}`,
              color: c,
            }}
            aria-label={color}
            onClick={() => {
              setColor(color);
            }}
          />
        );
      })}
    </div>
  );
}
