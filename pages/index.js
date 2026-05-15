import { useEffect, useState } from "react";
import { getLanguage, translations } from "../translations";

export default function Home() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    setLanguage(savedLanguage || getLanguage());
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = translations[language];

  return (
    <main style={styles.page}>
      <div style={styles.languageBar}>
        <button onClick={() => changeLanguage("en")} style={styles.langButton}>EN</button>
        <button onClick={() => changeLanguage("de")} style={styles.langButton}>DE</button>
        <button onClick={() => changeLanguage("fr")} style={styles.langButton}>FR</button>
        <button onClick={() => changeLanguage("it")} style={styles.langButton}>IT</button>
        <button onClick={() => changeLanguage("es")} style={styles.langButton}>ES</button>
        <button onClick={() => changeLanguage("pt")} style={styles.langButton}>PT</button>
      </div>

      <h1 style={styles.title}>{t.homeTitle}</h1>

      <p style={styles.subtitle}>{t.homeSubtitle}</p>

      <div style={styles.grid}>
        <a href="/weekdays" style={buttonStyle}>📅 {t.weekdays}</a>
        <a href="/months" style={buttonStyle}>🗓️ {t.months}</a>
        <a href="/clock" style={buttonStyle}>🕒 {t.clock}</a>
        <a href="/multiplication" style={buttonStyle}>✖️ {t.multiplication}</a>
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
    background: "#f0f9ff",
  },
  languageBar: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  langButton: {
    padding: "8px 12px",
    borderRadius: "10px",
    border: "none",
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  title: {
    fontSize: "44px",
    color: "#2563eb",
  },
  subtitle: {
    fontSize: "22px",
  },
  grid: {
    display: "grid",
    gap: "20px",
    maxWidth: "500px",
    margin: "40px auto",
  },
};

const buttonStyle = {
  display: "block",
  padding: "22px",
  background: "#60a5fa",
  color: "white",
  borderRadius: "20px",
  textDecoration: "none",
  fontSize: "24px",
  fontWeight: "bold",
};
