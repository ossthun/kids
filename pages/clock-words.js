import { useEffect, useState } from "react";
import { getLanguage, translations } from "../translations";

const numberWords = {
  en: {
    1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six",
    7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven", 12: "twelve",
    5: "five", 15: "quarter", 20: "twenty", 25: "twenty-five"
  },
  de: {
    1: "eins", 2: "zwei", 3: "drei", 4: "vier", 5: "fünf", 6: "sechs",
    7: "sieben", 8: "acht", 9: "neun", 10: "zehn", 11: "elf", 12: "zwölf",
    15: "Viertel", 20: "zwanzig", 25: "fünfundzwanzig"
  },
  fr: {
    1: "une", 2: "deux", 3: "trois", 4: "quatre", 5: "cinq", 6: "six",
    7: "sept", 8: "huit", 9: "neuf", 10: "dix", 11: "onze", 12: "douze",
    15: "quart", 20: "vingt", 25: "vingt-cinq"
  },
  it: {
    1: "l’una", 2: "due", 3: "tre", 4: "quattro", 5: "cinque", 6: "sei",
    7: "sette", 8: "otto", 9: "nove", 10: "dieci", 11: "undici", 12: "dodici",
    15: "un quarto", 20: "venti", 25: "venticinque"
  },
  es: {
    1: "la una", 2: "las dos", 3: "las tres", 4: "las cuatro", 5: "las cinco", 6: "las seis",
    7: "las siete", 8: "las ocho", 9: "las nueve", 10: "las diez", 11: "las once", 12: "las doce",
    15: "cuarto", 20: "veinte", 25: "veinticinco"
  },
  pt: {
    1: "uma", 2: "duas", 3: "três", 4: "quatro", 5: "cinco", 6: "seis",
    7: "sete", 8: "oito", 9: "nove", 10: "dez", 11: "onze", 12: "doze",
    15: "um quarto", 20: "vinte", 25: "vinte e cinco"
  }
};

function randomHour() {
  return Math.floor(Math.random() * 12) + 1;
}

function randomMinute() {
  const options = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  return options[Math.floor(Math.random() * options.length)];
}

function nextHour(hour) {
  return hour === 12 ? 1 : hour + 1;
}

function sayTime(hour, minute, lang) {
  const words = numberWords[lang] || numberWords.en;

  if (lang === "de") {
    if (minute === 0) return `${words[hour]} Uhr`;
    if (minute === 15) return `Viertel nach ${words[hour]}`;
    if (minute === 30) return `halb ${words[nextHour(hour)]}`;
    if (minute === 45) return `Viertel vor ${words[nextHour(hour)]}`;
    if (minute < 30) return `${words[minute]} nach ${words[hour]}`;

    const minutesTo = 60 - minute;
    return `${words[minutesTo]} vor ${words[nextHour(hour)]}`;
  }

  if (lang === "fr") {
    if (minute === 0) return `${words[hour]} heure${hour === 1 ? "" : "s"}`;
    if (minute === 15) return `${words[hour]} heure${hour === 1 ? "" : "s"} et quart`;
    if (minute === 30) return `${words[hour]} heure${hour === 1 ? "" : "s"} et demie`;
    if (minute === 45) return `${words[nextHour(hour)]} heure${nextHour(hour) === 1 ? "" : "s"} moins le quart`;
    if (minute < 30) return `${words[hour]} heure${hour === 1 ? "" : "s"} ${words[minute]}`;

    const minutesTo = 60 - minute;
    return `${words[nextHour(hour)]} heure${nextHour(hour) === 1 ? "" : "s"} moins ${words[minutesTo]}`;
  }

  if (lang === "it") {
    if (minute === 0) return `${words[hour]} in punto`;
    if (minute === 15) return `${words[hour]} e un quarto`;
    if (minute === 30) return `${words[hour]} e mezza`;
    if (minute === 45) return `${words[nextHour(hour)]} meno un quarto`;
    if (minute < 30) return `${words[hour]} e ${words[minute]}`;

    const minutesTo = 60 - minute;
    return `${words[nextHour(hour)]} meno ${words[minutesTo]}`;
  }

  if (lang === "es") {
    if (minute === 0) return `${words[hour]} en punto`;
    if (minute === 15) return `${words[hour]} y cuarto`;
    if (minute === 30) return `${words[hour]} y media`;
    if (minute === 45) return `${words[nextHour(hour)]} menos cuarto`;
    if (minute < 30) return `${words[hour]} y ${words[minute]}`;

    const minutesTo = 60 - minute;
    return `${words[nextHour(hour)]} menos ${words[minutesTo]}`;
  }

  if (lang === "pt") {
    if (minute === 0) return `${words[hour]} em ponto`;
    if (minute === 15) return `${words[hour]} e um quarto`;
    if (minute === 30) return `${words[hour]} e meia`;
    if (minute === 45) return `${words[nextHour(hour)]} menos um quarto`;
    if (minute < 30) return `${words[hour]} e ${words[minute]}`;

    const minutesTo = 60 - minute;
    return `${words[nextHour(hour)]} menos ${words[minutesTo]}`;
  }

  if (minute === 0) return `${words[hour]} o'clock`;
  if (minute === 15) return `quarter past ${words[hour]}`;
  if (minute === 30) return `half past ${words[hour]}`;
  if (minute === 45) return `quarter to ${words[nextHour(hour)]}`;
  if (minute < 30) return `${words[minute]} past ${words[hour]}`;

  const minutesTo = 60 - minute;
  return `${words[minutesTo]} to ${words[nextHour(hour)]}`;
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function ClockWordsPage() {
  const [language, setLanguage] = useState("en");
  const [hour, setHour] = useState(randomHour());
  const [minute, setMinute] = useState(randomMinute());
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  const t = translations[language];

  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const minuteAngle = minute * 6;

  const correctAnswer = sayTime(hour, minute, language);

  useEffect(() => {
    const wrong1 = sayTime(nextHour(hour), minute, language);
    const wrong2 = sayTime(hour, minute === 55 ? 0 : minute + 5, language);
    const wrong3 = sayTime(hour === 1 ? 12 : hour - 1, minute, language);

    setAnswers(shuffle([correctAnswer, wrong1, wrong2, wrong3]));
  }, [hour, minute, language, correctAnswer]);

  const nextQuestion = () => {
    setHour(randomHour());
    setMinute(randomMinute());
    setMessage("");
  };

  const checkAnswer = (answer) => {
    if (answer === correctAnswer) {
      setMessage(t.correct);
      setTimeout(nextQuestion, 700);
    } else {
      setMessage(t.tryAgain);
    }
  };

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>{t.clockWordsTitle}</h1>

      <p style={styles.subtitle}>{t.clockWordsSubtitle}</p>

      <div style={styles.card}>
        <div style={styles.clock}>
          {[...Array(12)].map((_, i) => {
            const number = i === 0 ? 12 : i;
            const angle = i * 30;

            return (
              <span
                key={number}
                style={{
                  ...styles.number,
                  transform: `rotate(${angle}deg) translate(0, -90px) rotate(-${angle}deg)`
                }}
              >
                {number}
              </span>
            );
          })}

          <div
            style={{
              ...styles.hourHand,
              transform: `rotate(${hourAngle}deg)`
            }}
          />

          <div
            style={{
              ...styles.minuteHand,
              transform: `rotate(${minuteAngle}deg)`
            }}
          />

          <div style={styles.centerDot} />
        </div>

        <div style={styles.answers}>
          {answers.map((answer) => (
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
    maxWidth: "560px",
    margin: "30px auto",
    background: "white",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },
  clock: {
    width: "240px",
    height: "240px",
    border: "8px solid #2563eb",
    borderRadius: "50%",
    margin: "20px auto 30px",
    position: "relative",
    background: "#eff6ff"
  },
  number: {
    position: "absolute",
    left: "105px",
    top: "105px",
    fontSize: "20px",
    fontWeight: "bold"
  },
  hourHand: {
    position: "absolute",
    width: "8px",
    height: "60px",
    background: "#111827",
    left: "116px",
    top: "60px",
    transformOrigin: "bottom center",
    borderRadius: "8px"
  },
  minuteHand: {
    position: "absolute",
    width: "5px",
    height: "85px",
    background: "#ef4444",
    left: "117.5px",
    top: "35px",
    transformOrigin: "bottom center",
    borderRadius: "8px"
  },
  centerDot: {
    position: "absolute",
    width: "18px",
    height: "18px",
    background: "#111827",
    borderRadius: "50%",
    left: "111px",
    top: "111px"
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
