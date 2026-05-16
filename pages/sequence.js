import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { getLanguage, translations } from "../translations";

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createQuestion() {
  const start = randomNumber(1, 20);
  const step = randomNumber(2, 10);

  const sequence = [
    start,
    start + step,
    start + step * 2,
    start + step * 3
  ];

  return {
    text: `${sequence.join(", ")}, ?`,
    answer: start + step * 4
  };
}

export default function SequencePage() {
  const router = useRouter();

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

  const t = translations[language] || translations.en;

  const nextQuestion = () => {
    setQuestion(createQuestion());
    setAnswer("");
    setMessage("");
  };

  const checkAnswer = () => {
    if (Number(answer) === question.answer) {
      setMessage(t.correct);
      setScore((prev) => prev + 1);

      setTimeout(() => {
        router.push("/reward");
      }, 700);
    } else {
      setMessage(t.tryAgain);
      inputRef.current?.focus();
    }
  };

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>{t.sequenceTitle}</h1>

      <p style={styles.subtitle}>{t.sequenceSubtitle}</p>

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
    maxWidth: "640px",
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
    fontSize: "48px",
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
