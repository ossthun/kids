import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getLanguage, translations } from "../translations";

const monthNames = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  fr: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
  it: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  pt: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
};

function randomDate() {
  return {
    day: Math.floor(Math.random() * 28) + 1,
    month: Math.floor(Math.random() * 12) + 1,
    year: Math.floor(Math.random() * 25) + 2000
  };
}

function writtenDate(date, language) {
  const lang = monthNames[language] ? language : "en";
  const { day, month, year } = date;
  const monthName = monthNames[lang][month - 1];

  if (lang === "de") return `der ${day}. ${monthName} ${year}`;
  if (lang === "fr") return `le ${day} ${monthName} ${year}`;
  if (lang === "it") return `il ${day} ${monthName} ${year}`;
  if (lang === "es") return `el ${day} de ${monthName} de ${year}`;
  if (lang === "pt") return `${day} de ${monthName} de ${year}`;

  return `the ${day}. of ${monthName} ${year}`;
}

function formatDate(date) {
  return `${String(date.day).padStart(2, "0")}.${String(date.month).padStart(2, "0")}.${date.year}`;
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function createQuestion(language) {
  const date = randomDate();
  const correctAnswer = writtenDate(date, language);

  const wrong1 = writtenDate(
    { ...date, day: date.day === 28 ? 27 : date.day + 1 },
    language
  );

  const wrong2 = writtenDate(
    { ...date, month: date.month === 12 ? 1 : date.month + 1 },
    language
  );

  const wrong3 = writtenDate(
    { ...date, year: date.year + 1 },
    language
  );

  return {
    date,
    correctAnswer,
    answers: shuffle([correctAnswer, wrong1, wrong2, wrong3])
  };
}

export default function DatesPage() {
  const router = useRouter();

  const [language, setLanguage] = useState("en");
  const [question, setQuestion] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const detectedLanguage = getLanguage();
    const safeLanguage = translations[detectedLanguage]
      ? detectedLanguage
      : "en";

    setLanguage(safeLanguage);
    setQuestion(createQuestion(safeLanguage));
  }, []);

  if (!question) return null;

  const t = translations[language] || translations.en;

  const nextQuestion = () => {
    setQuestion(createQuestion(language));
    setMessage("");
  };

  const checkAnswer = (answer) => {
    if (answer === question.correctAnswer) {
      setMessage(t.correct);

      setTimeout(() => {
        router.push("/reward");
      }, 700);
    } else {
      setMessage(t.tryAgain);
    }
  };

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>
        {t.datesTitle}
      </h1>

      <p style={styles.subtitle}>
        {t.datesSubtitle}
      </p>

      <div style={styles.card}>
        <p style={styles.dateText}>
          {formatDate(question.date)}
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

        <p style={styles.message}>
          {message}
        </p>

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

  dateText: {
    fontSize: "52px",
    fontWeight: "bold",
    margin: "20px 0 30px"
  },

  answers: {
    display: "grid",
    gap: "14px",
    maxWidth: "520px",
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
