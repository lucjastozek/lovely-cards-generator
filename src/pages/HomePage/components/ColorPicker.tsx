import { useState } from "react";
import "./ColorPicker.css";

interface ColorPickerProps {
  setColor: React.Dispatch<React.SetStateAction<`#${string}`>>;
  selectedColor: string;
  palette: Record<string, `#${string}`>;
}

export default function ColorPicker({
  setColor,
  selectedColor,
  palette,
}: ColorPickerProps): JSX.Element {
  const [customColor, setCustomColor] = useState("#8ace00");

  const colors = Object.values(palette);

  const getColorName = (hexColor: string): string => {
    const entry = Object.entries(palette).find(([, hex]) => hex === hexColor);
    return entry ? entry[0] : hexColor;
  };

  const [chosenIndex, setChosenIndex] = useState(
    colors.findIndex((color) => color === selectedColor)
  );

  const isCustomSelected = chosenIndex === -1;

  return (
    <div className="enhanced-color-picker">
      <div className="color-grid">
        {colors.map((color, index) => (
          <button
            key={color}
            className={`color-button-enhanced ${chosenIndex === index ? "selected" : ""} ${colors[0] === "#fffbe6" ? "light" : "dark"}`}
            style={{ backgroundColor: color }}
            aria-label={`Select ${getColorName(color)} color`}
            title={getColorName(color)}
            onClick={() => {
              setColor(color);
              setChosenIndex(index);
            }}
          />
        ))}

        <input
          type="color"
          className={`custom-color-input ${isCustomSelected ? "selected" : ""}`}
          value={customColor}
          onChange={(e) => {
            const newColor = e.target.value as `#${string}`;
            setCustomColor(newColor);
            setColor(newColor);
            setChosenIndex(-1);
          }}
          aria-label="Choose a custom color"
          title="Custom color picker"
        />
      </div>
    </div>
  );
}
