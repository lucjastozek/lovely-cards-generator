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
          marginTop: "1.5em",
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
          <a href="https://openprocessing.org/user/387695" target="_blank">
            <img
              src="/openprocessing_logo.png"
              alt="open processing"
              style={{
                height: "min(2em, 2.67vw)",
                width: "calc(min(2em, 2.67vw)*1.2)",
              }}
            />
          </a>
          <a href="https://www.linkedin.com/in/lucjastozek/" target="_blank">
            <img
              src="/linkedin_logo.svg"
              alt="linked in"
              style={{ height: "min(2em, 2.67vw)", width: "min(2em, 2.67vw)" }}
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
