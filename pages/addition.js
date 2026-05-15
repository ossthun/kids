import { useState, useRef, useEffect } from "react";
import { getLanguage, translations } from "../translations";

function randomNumber() {
  return Math.floor(Math.random() * 50) + 1;
}

export default function AdditionPage() {
  const [language, setLanguage] = useState("en");
  const [a, setA] = useState(randomNumber());
  const [b, setB] = useState(randomNumber());
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [a, b]);

  const t = translations[language];

  const nextQuestion = () => {
    setA(randomNumber());
    setB(randomNumber());
    setAnswer("");
  };

  const checkAnswer = () => {
    if (Number(answer) === a + b) {
      setMessage(t.correct);
      setScore((prev) => prev + 1);
      nextQuestion();
    } else {
      setMessage(t.tryAgain);
      inputRef.current?.focus();
    }
  };

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>➕ Addition</h1>

      <p style={styles.subtitle}>
        Add the two numbers.
      </p>

      <div style={styles.card}>
        <p style={styles.score}>{t.score}: {score}</p>

        <p style={styles.question}>
          {a} + {b} = ?
        </p>

        <input
          ref={inputRef}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") checkAnswer();
          }}
          type="number"
          placeholder={t.answer}
          style={styles.input}
        />

        <br />

        <button onClick={checkAnswer} style={styles.checkButton}>
          {t.check}
        </button>

        <button onClick={nextQuestion} style={styles.skipButton}>
          {t.skip}
        </button>

        <p style={styles.message}>{message}</p>
      </div>

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
    maxWidth: "520px",
    margin: "30px auto",
    background: "white",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },
  score: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#16a34a"
  },
  question: {
    fontSize: "56px",
    fontWeight: "bold",
    margin: "20px 0"
  },
  input: {
    width: "180px",
    padding: "14px",
    fontSize: "28px",
    textAlign: "center",
    borderRadius: "14px",
    border: "2px solid #93c5fd"
  },
  checkButton: {
    marginTop: "24px",
    marginRight: "10px",
    padding: "16px 30px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "16px",
    fontSize: "22px",
    cursor: "pointer"
  },
  skipButton: {
    marginTop: "24px",
    padding: "16px 30px",
    background: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "16px",
    fontSize: "22px",
    cursor: "pointer"
  },
  message: {
    fontSize: "26px",
    fontWeight: "bold",
    marginTop: "24px"
  },
  backLink: {
    display: "inline-block",
    marginTop: "20px",
    color: "#2563eb",
    fontSize: "18px",
    textDecoration: "none"
  }
};
