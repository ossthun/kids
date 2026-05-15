import { useEffect, useState } from "react";
import { getLanguage, translations } from "../translations";

export default function Home() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  const t = translations[language];

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>
        {t.homeTitle}
      </h1>

      <p style={styles.subtitle}>
        {t.homeSubtitle}
      </p>

     <div style={styles.grid}>
  <a href="/weekdays" style={buttonStyle}>
    🏫 {t.weekdays}
  </a>

  <a href="/months" style={buttonStyle}>
    🗓️ {t.months}
  </a>

  <a href="/dates" style={buttonStyle}>
    📆 {t.dates}
  </a>

  <a href="/calendar" style={buttonStyle}>
    📋 {t.calendar}
  </a>

  <a href="/addition" style={buttonStyle}>
    ➕ {t.addition}
  </a>

  <a href="/subtraction" style={buttonStyle}>
    ➖ {t.subtraction}
  </a>

  <a href="/multiplication" style={buttonStyle}>
    ✖️ {t.multiplication}
  </a>

  <a href="/division" style={buttonStyle}>
    ➗ {t.division}
  </a>

  <a href="/sequence" style={buttonStyle}>
    🔢 {t.sequence}
  </a>

  <a href="/number" style={buttonStyle}>
    🧩 {t.number}
  </a>

  <a href="/money" style={buttonStyle}>
    💰 {t.money}
  </a>

  <a href="/clock" style={buttonStyle}>
    🕒 {t.clock}
  </a>

  <a href="/clock-words" style={buttonStyle}>
    🕰️ {t.clockWords}
  </a>

  <a href="/time" style={buttonStyle}>
    ⌛ {t.time}
  </a>
</div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    background: "#f0f9ff"
  },
  title: {
    fontSize: "44px",
    color: "#2563eb"
  },
  subtitle: {
    fontSize: "22px"
  },
  grid: {
    display: "grid",
    gap: "20px",
    maxWidth: "500px",
    margin: "40px auto"
  }
};

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
