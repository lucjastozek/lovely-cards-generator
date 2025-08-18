export default function LogoType(): JSX.Element {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <h2
        style={{
          marginBottom: "0.27em",
          marginTop: "0",
          fontFamily: "'Pacifico', cursive",
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
      </h2>
    </div>
  );
}
