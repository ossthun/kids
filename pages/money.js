import { useState, useEffect } from "react";
import { getLanguage, translations } from "../translations";

const coins = [5, 10, 20, 50, 100, 200, 500];

function randomCoin() {
  return coins[Math.floor(Math.random() * coins.length)];
}

function createQuestion() {
  const coin1 = randomCoin();
  const coin2 = randomCoin();
  const coin3 = randomCoin();

  return {
    coins: [coin1, coin2, coin3],
    answer: coin1 + coin2 + coin3
  };
}

function coinLabel(cents) {
  if (cents < 100) return `${cents} Rp`;
  return `CHF ${cents / 100}`;
}

export default function MoneyPage() {
  const [language, setLanguage] = useState("en");
  const [question, setQuestion] = useState(createQuestion());
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  const t = translations[language];

  const nextQuestion = () => {
    setQuestion(createQuestion());
    setAnswer("");
    setMessage("");
  };

  const checkAnswer = () => {
    const userCents = Math.round(Number(answer) * 100);

    if (userCents === question.answer) {
      setMessage(t.correct);
      setScore((prev) => prev + 1);

      setTimeout(() => {
        nextQuestion();
      }, 700);
    } else {
      setMessage(t.tryAgain);
    }
  };

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>
        💰 {t.moneyTitle}
      </h1>

      <p style={styles.subtitle}>
        {t.moneySubtitle}
      </p>

      <div style={styles.card}>
        <p style={styles.score}>
          {t.score}: {score}
        </p>

        <div style={styles.coins}>
          {question.coins.map((coin, index) => (
            <div key={index} style={styles.coin}>
              {coinLabel(coin)}
            </div>
          ))}
        </div>

        <p style={styles.question}>
          = ?
        </p>

        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") checkAnswer();
          }}
          type="number"
          step="0.05"
          placeholder="CHF"
          style={styles.input}
        />

        <p style={styles.hint}>
          {t.moneyHint}
        </p>

        <div style={styles.buttonRow}>
          <button onClick={checkAnswer} style={styles.checkButton}>
            {t.check}
          </button>

          <button onClick={nextQuestion} style={styles.skipButton}>
            {t.skip}
          </button>
        </div>

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
    maxWidth: "560px",
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

  coins: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap",
    margin: "30px 0"
  },

  coin: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "#fde68a",
    border: "5px solid #f59e0b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: "bold"
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

  hint: {
    fontSize: "16px",
    color: "#64748b",
    marginTop: "12px"
  },

  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "20px"
  },

  checkButton: {
    padding: "16px 30px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "16px",
    fontSize: "22px",
    cursor: "pointer"
  },

  skipButton: {
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
