import Underline from "./Underline";

export default function LogoType(): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 style={{ marginBottom: "0.27em", marginTop: "0" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          Cringy Cards Generator
        </a>
      </h2>
      <Underline
        colors={[
          "red",
          "orange",
          "yellow",
          "green1",
          "green2",
          "blue1",
          "blue2",
          "purple1",
          "purple2",
          "cherry",
          "barbie",
          "peach",
        ]}
      />
    </div>
  );
}
