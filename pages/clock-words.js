import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getLanguage, translations } from "../translations";

const words = {
  en: {
    hours: ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"],
    minutes: { 5: "five", 10: "ten", 20: "twenty", 25: "twenty-five" }
  },
  de: {
    hours: ["", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf"],
    minutes: { 5: "fünf", 10: "zehn", 20: "zwanzig", 25: "fünfundzwanzig" }
  },
  fr: {
    hours: ["", "une", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze"],
    minutes: { 5: "cinq", 10: "dix", 20: "vingt", 25: "vingt-cinq" }
  },
  it: {
    hours: ["", "l’una", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove", "dieci", "undici", "dodici"],
    minutes: { 5: "cinque", 10: "dieci", 20: "venti", 25: "venticinque" }
  },
  es: {
    hours: ["", "la una", "las dos", "las tres", "las cuatro", "las cinco", "las seis", "las siete", "las ocho", "las nueve", "las diez", "las once", "las doce"],
    minutes: { 5: "cinco", 10: "diez", 20: "veinte", 25: "veinticinco" }
  },
  pt: {
    hours: ["", "uma", "duas", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze"],
    minutes: { 5: "cinco", 10: "dez", 20: "vinte", 25: "vinte e cinco" }
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

function sayTime(hour, minute, language) {
  const lang = words[language] ? language : "en";
  const w = words[lang];
  const next = nextHour(hour);

  if (lang === "de") {
    if (minute === 0) return `${w.hours[hour]} Uhr`;
    if (minute === 15) return `Viertel nach ${w.hours[hour]}`;
    if (minute === 30) return `halb ${w.hours[next]}`;
    if (minute === 45) return `Viertel vor ${w.hours[next]}`;
    if (minute < 30) return `${w.minutes[minute]} nach ${w.hours[hour]}`;
    return `${w.minutes[60 - minute]} vor ${w.hours[next]}`;
  }

  if (lang === "fr") {
    if (minute === 0) return `${w.hours[hour]} heure${hour === 1 ? "" : "s"}`;
    if (minute === 15) return `${w.hours[hour]} heure${hour === 1 ? "" : "s"} et quart`;
    if (minute === 30) return `${w.hours[hour]} heure${hour === 1 ? "" : "s"} et demie`;
    if (minute === 45) return `${w.hours[next]} heure${next === 1 ? "" : "s"} moins le quart`;
    if (minute < 30) return `${w.hours[hour]} heure${hour === 1 ? "" : "s"} ${w.minutes[minute]}`;
    return `${w.hours[next]} heure${next === 1 ? "" : "s"} moins ${w.minutes[60 - minute]}`;
  }

  if (lang === "it") {
    if (minute === 0) return `${w.hours[hour]} in punto`;
    if (minute === 15) return `${w.hours[hour]} e un quarto`;
    if (minute === 30) return `${w.hours[hour]} e mezza`;
    if (minute === 45) return `${w.hours[next]} meno un quarto`;
    if (minute < 30) return `${w.hours[hour]} e ${w.minutes[minute]}`;
    return `${w.hours[next]} meno ${w.minutes[60 - minute]}`;
  }

  if (lang === "es") {
    if (minute === 0) return `${w.hours[hour]} en punto`;
    if (minute === 15) return `${w.hours[hour]} y cuarto`;
    if (minute === 30) return `${w.hours[hour]} y media`;
    if (minute === 45) return `${w.hours[next]} menos cuarto`;
    if (minute < 30) return `${w.hours[hour]} y ${w.minutes[minute]}`;
    return `${w.hours[next]} menos ${w.minutes[60 - minute]}`;
  }

  if (lang === "pt") {
    if (minute === 0) return `${w.hours[hour]} em ponto`;
    if (minute === 15) return `${w.hours[hour]} e um quarto`;
    if (minute === 30) return `${w.hours[hour]} e meia`;
    if (minute === 45) return `${w.hours[next]} menos um quarto`;
    if (minute < 30) return `${w.hours[hour]} e ${w.minutes[minute]}`;
    return `${w.hours[next]} menos ${w.minutes[60 - minute]}`;
  }

  if (minute === 0) return `${w.hours[hour]} o'clock`;
  if (minute === 15) return `quarter past ${w.hours[hour]}`;
  if (minute === 30) return `half past ${w.hours[hour]}`;
  if (minute === 45) return `quarter to ${w.hours[next]}`;
  if (minute < 30) return `${w.minutes[minute]} past ${w.hours[hour]}`;
  return `${w.minutes[60 - minute]} to ${w.hours[next]}`;
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function createQuestion(language) {
  const hour = randomHour();
  const minute = randomMinute();

  const correctAnswer = sayTime(hour, minute, language);
  const wrong1 = sayTime(nextHour(hour), minute, language);
  const wrong2 = sayTime(hour, minute === 55 ? 0 : minute + 5, language);
  const wrong3 = sayTime(hour === 1 ? 12 : hour - 1, minute, language);

  return {
    hour,
    minute,
    correctAnswer,
    answers: shuffle([correctAnswer, wrong1, wrong2, wrong3])
  };
}

export default function ClockWordsPage() {
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

  const hourAngle =
    ((question.hour % 12) + question.minute / 60) * 30;

  const minuteAngle = question.minute * 6;

  const nextQuestion = () => {
    setQuestion(createQuestion(language));
    setMessage("");
  };

  const checkAnswer = (answer) => {
    if (answer === question.correctAnswer) {
      setMessage(t.correct);

      setTimeout(() => {
        sessionStorage.setItem("lastGame", "/clock-words");
        router.push("/reward");
      }, 700);
    } else {
      setMessage(t.tryAgain);
    }
  };

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>
        {t.clockWordsTitle}
      </h1>

      <p style={styles.subtitle}>
        {t.clockWordsSubtitle}
      </p>

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
