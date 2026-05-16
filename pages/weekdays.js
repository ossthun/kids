import { useEffect, useState } from "react";
import { getLanguage, translations } from "../translations";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function WeekdaysPage() {
  const [language, setLanguage] = useState("en");
  const [days, setDays] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const detectedLanguage = getLanguage();
    const safeLanguage = translations[detectedLanguage] ? detectedLanguage : "en";
    const safeDays = translations[safeLanguage].days || translations.en.days;

    setLanguage(safeLanguage);
    setDays(shuffle(safeDays));
  }, []);

  const t = translations[language] || translations.en;

  const handleDayClick = (index) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
      setMessage("");
      return;
    }

    if (selectedIndex === index) {
      setSelectedIndex(null);
      return;
    }

    const updated = [...days];
    const selectedDay = updated[selectedIndex];

    updated.splice(selectedIndex, 1);
    updated.splice(index, 0, selectedDay);

    setDays(updated);
    setSelectedIndex(null);
    setMessage("");
  };

  const checkAnswer = () => {
    const correct = JSON.stringify(days) === JSON.stringify(t.days);
    setMessage(correct ? t.correct : t.tryAgain);
  };

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>{t.weekdaysTitle}</h1>

      <p style={styles.subtitle}>{t.weekdaysSubtitle}</p>

      <div style={styles.card}>
        {days.map((day, index) => {
          const isSelected = selectedIndex === index;

          return (
            <button
              key={day}
              onClick={() => handleDayClick(index)}
              style={{
                ...styles.dayRow,
                ...(isSelected ? styles.selectedDayRow : {})
              }}
            >
              <span style={styles.tapIcon}>
                {isSelected ? "👉" : "☰"}
              </span>

              <span style={styles.day}>{day}</span>
            </button>
          );
        })}
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
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "18px",
    marginBottom: "12px",
    background: "#dbeafe",
    border: "2px solid transparent",
    borderRadius: "18px",
    cursor: "pointer",
    userSelect: "none",
    boxShadow: "0 4px 10px rgba(37,99,235,0.12)",
    textAlign: "left"
  },
  selectedDayRow: {
    background: "#bfdbfe",
    border: "2px solid #2563eb",
    transform: "scale(1.02)"
  },
  tapIcon: {
    fontSize: "24px",
    color: "#2563eb",
    fontWeight: "bold",
    width: "32px"
  },
  day: {
    fontSize: "24px",
    fontWeight: "bold"
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
