import LogoType from "./components/LogoType";

export default function Navbar(): JSX.Element {
  return (
    <nav
      style={{
        display: "flex",
        gap: "min(6rem, 16vw)",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80vw",
        marginTop: "1rem",
      }}
    >
      <LogoType />
      <a href="https://github.com/lucjastozek" target="_blank">
        <img src="/github_logo.svg" alt="github" className="github" />
      </a>
    </nav>
  );
}
