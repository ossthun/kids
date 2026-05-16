import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { getLanguage, translations } from "../translations";

const coins = [1, 2, 5, 10, 20, 50];
const notes = [10, 20, 50, 100];
const moneyOptions = [...coins, ...notes];

function randomMoney() {
  return moneyOptions[
    Math.floor(Math.random() * moneyOptions.length)
  ];
}

function createQuestion() {
  const amounts = [];
  const count = Math.floor(Math.random() * 4) + 2;

  for (let i = 0; i < count; i++) {
    amounts.push(randomMoney());
  }

  const total = amounts.reduce(
    (sum, amount) => sum + amount,
    0
  );

  return {
    amounts,
    answer: total
  };
}

export default function MoneyPage() {
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
      <h1 style={styles.title}>
        {t.moneyTitle}
      </h1>

      <p style={styles.subtitle}>
        {t.moneySubtitle}
      </p>

      <div style={styles.card}>
        <p style={styles.score}>
          {t.score}: {score}
        </p>

        <div style={styles.moneyRow}>
          {question.amounts.map((amount, index) => (
            <div
              key={index}
              style={
                amount >= 10
                  ? styles.note
                  : styles.coin
              }
            >
              CHF {amount}
            </div>
          ))}
        </div>

        <input
          ref={inputRef}
          value={answer}
          onChange={(e) =>
            setAnswer(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              checkAnswer();
            }
          }}
          type="number"
          placeholder={t.answer}
          style={styles.input}
        />

        <br />

        <button
          onClick={checkAnswer}
          style={styles.checkButton}
        >
          {t.check}
        </button>

        <button
          onClick={nextQuestion}
          style={styles.skipButton}
        >
          {t.skip}
        </button>

        <p style={styles.message}>
          {message}
        </p>
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
    maxWidth: "680px",
    margin: "30px auto",
    background: "white",
    borderRadius: "24px",
    padding: "30px",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.08)"
  },

  score: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#16a34a"
  },

  moneyRow: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "14px",
    margin: "30px 0"
  },

  coin: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "#facc15",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px",
    color: "#78350f",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.15)"
  },

  note: {
    width: "130px",
    height: "70px",
    borderRadius: "16px",
    background: "#86efac",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "20px",
    color: "#14532d",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.15)"
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
