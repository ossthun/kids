import { useEffect, useState } from "react";
import { getLanguage, translations } from "../translations";

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function CalendarGamePage() {
  const [language, setLanguage] = useState("en");
  const [question, setQuestion] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  const t = translations[language];

  const createQuestion = () => {
    const type = Math.random() < 0.5 ? "day" : "month";

    if (type === "day") {
      const index = randomNumber(7);
      const direction = Math.random() < 0.5 ? "after" : "before";
      const correctIndex =
        direction === "after"
          ? (index + 1) % 7
          : (index + 6) % 7;

      const correctAnswer = t.days[correctIndex];

      return {
        text:
          direction === "after"
            ? `${t.calendarQuestionAfterDay} ${t.days[index]}?`
            : `${t.calendarQuestionBeforeDay} ${t.days[index]}?`,
        correctAnswer,
        answers: shuffle([
          correctAnswer,
          t.days[(correctIndex + 1) % 7],
          t.days[(correctIndex + 2) % 7],
          t.days[(correctIndex + 3) % 7],
        ]),
      };
    }

    const index = randomNumber(12);
    const direction = Math.random() < 0.5 ? "after" : "before";
    const correctIndex =
      direction === "after"
        ? (index + 1) % 12
        : (index + 11) % 12;

    const correctAnswer = t.monthNames[correctIndex];

    return {
      text:
        direction === "after"
          ? `${t.calendarQuestionAfterMonth} ${t.monthNames[index]}?`
          : `${t.calendarQuestionBeforeMonth} ${t.monthNames[index]}?`,
      correctAnswer,
      answers: shuffle([
        correctAnswer,
        t.monthNames[(correctIndex + 1) % 12],
        t.monthNames[(correctIndex + 2) % 12],
        t.monthNames[(correctIndex + 3) % 12],
      ]),
    };
  };

  useEffect(() => {
    setQuestion(createQuestion());
  }, [language]);

  const nextQuestion = () => {
    setQuestion(createQuestion());
    setMessage("");
  };

  const checkAnswer = (answer) => {
    if (answer === question.correctAnswer) {
      setMessage(t.correct);
      setTimeout(nextQuestion, 700);
    } else {
      setMessage(t.tryAgain);
    }
  };

  if (!question) return null;

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>📆 {t.calendarGameTitle}</h1>

      <p style={styles.subtitle}>
        {t.calendarGameSubtitle}
      </p>

      <div style={styles.card}>
        <p style={styles.question}>
          {question.text}
        </p>

        <div style={styles.answers}>
          {question.answers.map((answer) => (
            <button
              key={answer}
              onClick={() => checkAnswer(answer)}
              style={styles.answerButton}
            >
              {answer}
            </button>
          ))}
        </div>

        <p style={styles.message}>{message}</p>

        <button onClick={nextQuestion} style={styles.skipButton}>
          {t.skip}
        </button>
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
  question: {
    fontSize: "32px",
    fontWeight: "bold",
    margin: "20px 0 30px"
  },
  answers: {
    display: "grid",
    gap: "14px",
    maxWidth: "420px",
    margin: "0 auto"
  },
  answerButton: {
    padding: "18px",
    background: "#60a5fa",
    color: "white",
    border: "none",
    borderRadius: "16px",
    fontSize: "22px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  message: {
    fontSize: "26px",
    fontWeight: "bold",
    marginTop: "24px"
  },
  skipButton: {
    marginTop: "10px",
    padding: "14px 28px",
    background: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "16px",
    fontSize: "20px",
    cursor: "pointer"
  },
  backLink: {
    display: "inline-block",
    marginTop: "20px",
    color: "#2563eb",
    fontSize: "18px",
    textDecoration: "none"
  }
};
