import LogoType from "./components/LogoType";

export default function Navbar(): JSX.Element {
  return (
    <nav
      style={{
        display: "flex",
        gap: "min(6rem, 16vw)",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "1rem",
      }}
    >
      <LogoType />
    </nav>
  );
}
