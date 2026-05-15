import { useEffect, useState } from "react";
import { getLanguage, translations } from "../translations";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function WeekdaysPage() {
  const [language, setLanguage] = useState("en");
  const [days, setDays] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const lang = getLanguage();
    setLanguage(lang);
    setDays(shuffle(translations[lang].days));
  }, []);

  const t = translations[language];

  const moveUp = (index) => {
    if (index === 0) return;

    const updated = [...days];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];

    setDays(updated);
  };

  const moveDown = (index) => {
    if (index === days.length - 1) return;

    const updated = [...days];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];

    setDays(updated);
  };

  const checkAnswer = () => {
    const correct = JSON.stringify(days) === JSON.stringify(t.days);
    setMessage(correct ? t.correct : t.tryAgain);
  };

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>{t.weekdaysTitle}</h1>

      <p style={styles.subtitle}>
        {t.weekdaysSubtitle}
      </p>

      <div style={styles.card}>
        {days.map((day, index) => (
          <div key={day} style={styles.dayRow}>
            <span style={styles.day}>{day}</span>

            <div>
              <button
                onClick={() => moveUp(index)}
                style={styles.smallButton}
              >
                ↑
              </button>

              <button
                onClick={() => moveDown(index)}
                style={styles.smallButton}
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={checkAnswer} style={styles.checkButton}>
        {t.check}
      </button>

      <p style={styles.message}>{message}</p>

      <a href="/" style={styles.backLink}>
        {t.backHome}
      </a>
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
    maxWidth: "500px",
    margin: "30px auto",
    background: "white",
    borderRadius: "24px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },
  dayRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    marginBottom: "12px",
    background: "#dbeafe",
    borderRadius: "16px"
  },
  day: {
    fontSize: "24px",
    fontWeight: "bold"
  },
  smallButton: {
    margin: "0 4px",
    padding: "10px 14px",
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
