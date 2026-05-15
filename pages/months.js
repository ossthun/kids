import { useEffect, useState } from "react";
import { getLanguage, translations } from "../translations";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function MonthsPage() {
  const [language, setLanguage] = useState("en");
  const [months, setMonths] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const lang = getLanguage();
    setLanguage(lang);
    setMonths(shuffle(translations[lang].monthNames));
  }, []);

  const t = translations[language];

  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...months];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setMonths(updated);
  };

  const moveDown = (index) => {
    if (index === months.length - 1) return;
    const updated = [...months];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setMonths(updated);
  };

  const checkAnswer = () => {
    const correct = JSON.stringify(months) === JSON.stringify(t.monthNames);
    setMessage(correct ? t.correct : t.tryAgain);
  };

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>{t.monthsTitle}</h1>
      <p style={styles.subtitle}>{t.monthsSubtitle}</p>

      <div style={styles.card}>
        {months.map((month, index) => (
          <div key={month} style={styles.row}>
            <span style={styles.month}>{month}</span>
            <div>
              <button onClick={() => moveUp(index)} style={styles.smallButton}>↑</button>
              <button onClick={() => moveDown(index)} style={styles.smallButton}>↓</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={checkAnswer} style={styles.checkButton}>{t.check}</button>
      <p style={styles.message}>{message}</p>

      <a href="/" style={styles.backLink}>{t.backHome}</a>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f0f9ff",
    padding: "30px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif"
  },
  title: {
    fontSize: "42px",
    color: "#2563eb"
  },
  subtitle: {
    fontSize: "22px"
  },
  card: {
    maxWidth: "520px",
    margin: "30px auto",
    background: "white",
    borderRadius: "24px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px",
    marginBottom: "10px",
    background: "#dbeafe",
    borderRadius: "16px"
  },
  month: {
    fontSize: "22px",
    fontWeight: "bold"
  },
  smallButton: {
    margin: "0 4px",
    padding: "9px 13px",
    fontSize: "18px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },
  checkButton: {
    marginTop: "20px",
    padding: "16px 32px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "16px",
    fontSize: "22px",
    cursor: "pointer"
  },
  message: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "20px"
  },
  backLink: {
    display: "inline-block",
    marginTop: "20px",
    color: "#2563eb",
    fontSize: "18px",
    textDecoration: "none"
  }
};
