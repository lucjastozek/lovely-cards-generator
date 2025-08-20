export default function LogoType(): JSX.Element {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <h1
        style={{
          marginBottom: "0.27em",
          marginTop: "0",
          fontFamily: "'Pacifico', cursive",
          fontSize: "1.5rem",
        }}
      >
        <a
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          Lovely Cards{" "}
          <img src="/lovelyCardsIcon.svg" alt="Lovely Cards logo" />
        </a>
      </h1>
    </div>
  );
}
