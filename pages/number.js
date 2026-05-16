import { useState, useRef, useEffect } from "react";
import { getLanguage, translations } from "../translations";

function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function createQuestion() {
  const type = Math.random();

  if (type < 0.4) {
    const a = randomNumber(20);
    const missing = randomNumber(20);
    return {
      text: `${a} + ? = ${a + missing}`,
      answer: missing
    };
  }

  if (type < 0.8) {
    const result = randomNumber(30);
    const missing = randomNumber(result);
    return {
      text: `${result} − ? = ${result - missing}`,
      answer: missing
    };
  }

  const a = randomNumber(10);
  const missing = randomNumber(10);

  return {
    text: `${a} × ? = ${a * missing}`,
    answer: missing
  };
}

export default function NumberPage() {
  const [language, setLanguage] = useState("en");
  const [question, setQuestion] = useState(createQuestion());
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [question]);

  const t = translations[language];

  const nextQuestion = () => {
    setQuestion(createQuestion());
    setAnswer("");
  };

  const checkAnswer = () => {
    if (Number(answer) === question.answer) {
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
      <h1 style={styles.title}>🔢 Missing Number</h1>

      <p style={styles.subtitle}>
  {t.numberSubtitle}
</p>

      <div style={styles.card}>
        <p style={styles.score}>{t.score}: {score}</p>

        <p style={styles.question}>
          {question.text}
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
