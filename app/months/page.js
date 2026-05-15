"use client";

import { useState } from "react";

const correctOrder = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function MonthsPage() {
  const [months, setMonths] = useState(shuffle(correctOrder));
  const [message, setMessage] = useState("");

  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...months];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setMonths(updated);
  };

  const moveDown = (index) => {
    if (index === months.length - 1) return;
    const updated = [...months];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setMonths(updated);
  };

  const checkAnswer = () => {
    const correct = JSON.stringify(months) === JSON.stringify(correctOrder);
    setMessage(correct ? "🎉 Perfect! Correct order!" : "😊 Try again!");
  };

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>🗓️ Months</h1>
      <p style={styles.subtitle}>Put the months in the correct order!</p>

      <div style={styles.card}>
        {months.map((month, index) => (
          <div key={month} style={styles.row}>
            <span style={styles.month}>{month}</span>
            <div>
              <button onClick={() => moveUp(index)} style={styles.smallButton}>↑</button>
              <button onClick={() => moveDown(index)} style={styles.smallButton}>↓</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={checkAnswer} style={styles.checkButton}>Check</button>
      <p style={styles.message}>{message}</p>

      <a href="/" style={styles.backLink}>← Back home</a>
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
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px",
    marginBottom: "10px",
    background: "#dbeafe",
    borderRadius: "16px"
  },
  month: {
    fontSize: "22px",
    fontWeight: "bold"
  },
  smallButton: {
    margin: "0 4px",
    padding: "9px 13px",
    fontSize: "18px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  },
  checkButton: {
    marginTop: "20px",
    padding: "16px 32px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "16px",
    fontSize: "22px",
    cursor: "pointer"
  },
  message: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "20px"
  },
  backLink: {
    display: "inline-block",
    marginTop: "20px",
    color: "#2563eb",
    fontSize: "18px",
    textDecoration: "none"
  }
};
