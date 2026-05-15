"use client";

import { useState } from "react";

const correctOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function WeekdaysPage() {
  const [days, setDays] = useState(shuffle(correctOrder));
  const [message, setMessage] = useState("");

  const moveUp = (index) => {
    if (index === 0) return;

    const updated = [...days];
    [updated[index - 1], updated[index]] =
      [updated[index], updated[index - 1]];

    setDays(updated);
  };

  const moveDown = (index) => {
    if (index === days.length - 1) return;

    const updated = [...days];
    [updated[index], updated[index + 1]] =
      [updated[index + 1], updated[index]];

    setDays(updated);
  };

  const checkAnswer = () => {
    const correct =
      JSON.stringify(days) === JSON.stringify(correctOrder);

    setMessage(
      correct
        ? "🎉 Amazing! Correct order!"
        : "😊 Not quite yet, try again!"
    );
  };

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>📅 Weekdays</h1>

      <p style={styles.subtitle}>
        Put the weekdays in the correct order!
      </p>

      <div style={styles.card}>
        {days.map((day, index) => (
          <div key={day} style={styles.dayRow}>
            <span style={styles.day}>{day}</span>

            <div>
              <button
                onClick={() => moveUp(index)}
                style={styles.smallButton}
              >
                ↑
              </button>

              <button
                onClick={() => moveDown(index)}
                style={styles.smallButton}
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={checkAnswer} style={styles.checkButton}>
        Check
      </button>

      <p style={styles.message}>{message}</p>
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
    maxWidth: "500px",
    margin: "30px auto",
    background: "white",
    borderRadius: "24px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  dayRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    marginBottom: "12px",
    background: "#dbeafe",
    borderRadius: "16px",
  },
  day: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  smallButton: {
    margin: "0 4px",
    padding: "10px 14px",
    fontSize: "18px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  checkButton: {
    marginTop: "20px",
    padding: "16px 32px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "16px",
    fontSize: "22px",
    cursor: "pointer",
  },
  message: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "20px",
  },
};
