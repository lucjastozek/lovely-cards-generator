interface UnderlineProps {
  colors: string[];
}

export default function Underline({ colors }: UnderlineProps): JSX.Element {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      {colors.map((color, i) => {
        const backgroundColor = `var(--${color})`;
        return (
          <div
            style={{ backgroundColor, width: "100%", height: "0.2em" }}
            key={i}
          ></div>
        );
      })}
    </div>
  );
}
