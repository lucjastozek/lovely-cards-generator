import LogoType from "./components/LogoType";

export default function Navbar(): JSX.Element {
  return (
    <nav>
      <div
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
        <div
          style={{
            display: "flex",
            gap: "min(2rem, 2.67vw)",
            alignItems: "center",
          }}
        >
          <a href="https://github.com/lucjastozek" target="_blank">
            <img
              src="/github_logo.svg"
              alt="github"
              style={{
                height: "min(2em, 2.67vw)",
                width: "min(2em, 2.67vw)",
              }}
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
