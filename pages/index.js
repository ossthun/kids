export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      padding: "40px",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      background: "#f0f9ff"
    }}>
      <h1 style={{ fontSize: "44px", color: "#2563eb" }}>
        Learning Website for Kids
      </h1>

      <p style={{ fontSize: "22px" }}>
        Learn weekdays, months, clocks and multiplication.
      </p>

      <div style={{
        display: "grid",
        gap: "20px",
        maxWidth: "500px",
        margin: "40px auto"
      }}>
        <a href="/weekdays" style={buttonStyle}>📅 Weekdays</a>
        <a href="/months" style={buttonStyle}>🗓️ Months</a>
        <a href="/clock" style={buttonStyle}>🕒 Read the Clock</a>
        <a href="/multiplication" style={buttonStyle}>✖️ Multiplication</a>
      </div>
    </main>
  );
}

const buttonStyle = {
  display: "block",
  padding: "22px",
  background: "#60a5fa",
  color: "white",
  borderRadius: "20px",
  textDecoration: "none",
  fontSize: "24px",
  fontWeight: "bold"
};
