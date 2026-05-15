"use client";

import { useState } from "react";

function randomHour() {
  return Math.floor(Math.random() * 12) + 1;
}

function randomMinute() {
  const options = [0, 15, 30, 45];
  return options[Math.floor(Math.random() * options.length)];
}

function formatTime(hour, minute) {
  return `${hour}:${minute.toString().padStart(2, "0")}`;
}

export default function ClockPage() {
  const [hour, setHour] = useState(randomHour());
  const [minute, setMinute] = useState(randomMinute());
  const [message, setMessage] = useState("");

  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const minuteAngle = minute * 6;

  const correctAnswer = formatTime(hour, minute);

  const wrongAnswers = [
    formatTime(hour === 12 ? 1 : hour + 1, minute),
    formatTime(hour, minute === 45 ? 0 : minute + 15),
    formatTime(hour === 1 ? 12 : hour - 1, minute),
  ];

  const answers = [correctAnswer, ...wrongAnswers].sort();

  const nextQuestion = () => {
    setHour(randomHour());
    setMinute(randomMinute());
    setMessage("");
  };

  const checkAnswer = (answer) => {
    if (answer === correctAnswer) {
      setMessage("🎉 Correct!");
      setTimeout(nextQuestion, 700);
    } else {
      setMessage("😊 Try again!");
    }
  };

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>🕒 Read the Clock</h1>

      <p style={styles.subtitle}>What time is shown?</p>

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
                  transform: `rotate(${angle}deg) translate(0, -90px) rotate(-${angle}deg)`,
                }}
              >
                {number}
              </span>
            );
          })}

          <div
            style={{
              ...styles.hourHand,
              transform: `rotate(${hourAngle}deg)`,
            }}
          />

          <div
            style={{
              ...styles.minuteHand,
              transform: `rotate(${minuteAngle}deg)`,
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
          Skip
        </button>
      </div>

      <a href="/" style={styles.backLink}>
        ← Back home
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
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "42px",
    color: "#2563eb",
  },
  subtitle: {
    fontSize: "22px",
  },
  card: {
    maxWidth: "560px",
    margin: "30px auto",
    background: "white",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  clock: {
    width: "240px",
    height: "240px",
    border: "8px solid #2563eb",
    borderRadius: "50%",
    margin: "20px auto 30px",
    position: "relative",
    background: "#eff6ff",
  },
  number: {
    position: "absolute",
    left: "105px",
    top: "105px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  hourHand: {
    position: "absolute",
    width: "8px",
    height: "60px",
    background: "#111827",
    left: "116px",
    top: "60px",
    transformOrigin: "bottom center",
    borderRadius: "8px",
  },
  minuteHand: {
    position: "absolute",
    width: "5px",
    height: "85px",
    background: "#ef4444",
    left: "117.5px",
    top: "35px",
    transformOrigin: "bottom center",
    borderRadius: "8px",
  },
  centerDot: {
    position: "absolute",
    width: "18px",
    height: "18px",
    background: "#111827",
    borderRadius: "50%",
    left: "111px",
    top: "111px",
  },
  answers: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "14px",
    maxWidth: "360px",
    margin: "0 auto",
  },
  answerButton: {
    padding: "18px",
    background: "#60a5fa",
    color: "white",
    border: "none",
    borderRadius: "16px",
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  message: {
    fontSize: "26px",
    fontWeight: "bold",
    marginTop: "24px",
  },
  skipButton: {
    marginTop: "10px",
    padding: "14px 28px",
    background: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "16px",
    fontSize: "20px",
    cursor: "pointer",
  },
  backLink: {
    display: "inline-block",
    marginTop: "20px",
    color: "#2563eb",
    fontSize: "18px",
    textDecoration: "none",
  },
};
