// pages/kids-learning.js
import { useState } from "react";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function randomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

export default function KidsLearningApp() {
  const [mode, setMode] = useState("multiplication");

  const [a, setA] = useState(randomNumber());
  const [b, setB] = useState(randomNumber());
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  const checkMultiplication = () => {
    if (Number(answer) === a * b) {
      setMessage("🎉 Correct!");
      setA(randomNumber());
      setB(randomNumber());
      setAnswer("");
    } else {
      setMessage("Try again 😊");
    }
  };

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Kids Learning App</h1>

      <div style={styles.menu}>
        <button onClick={() => setMode("weekdays")} style={styles.button}>Weekdays</button>
        <button onClick={() => setMode("months")} style={styles.button}>Months</button>
        <button onClick={() => setMode("clock")} style={styles.button}>Clock</button>
        <button onClick={() => setMode("multiplication")} style={styles.button}>Multiplication</button>
      </div>

      <section style={styles.card}>
        {mode === "weekdays" && (
          <>
            <h2>Days of the Week</h2>
            <p>Can you read them in the right order?</p>
            <div style={styles.grid}>
              {weekdays.map((day) => (
                <div key={day} style={styles.tile}>{day}</div>
              ))}
            </div>
          </>
        )}

        {mode === "months" && (
          <>
            <h2>Months of the Year</h2>
            <p>Can you say all 12 months?</p>
            <div style={styles.grid}>
              {months.map((month) => (
                <div key={month} style={styles.tile}>{month}</div>
              ))}
            </div>
          </>
        )}

        {mode === "clock" && (
          <>
            <h2>Analog Clock</h2>
            <p>First version: teacher/parent can ask the child to read this clock.</p>
            <div style={styles.clock}>
              <div style={styles.handHour}></div>
              <div style={styles.handMinute}></div>
              <div style={styles.centerDot}></div>
              <span style={{ ...styles.number, top: 10, left: 92 }}>12</span>
              <span style={{ ...styles.number, top: 92, right: 15 }}>3</span>
              <span style={{ ...styles.number, bottom: 10, left: 98 }}>6</span>
              <span style={{ ...styles.number, top: 92, left: 15 }}>9</span>
            </div>
          </>
        )}

        {mode === "multiplication" && (
          <>
            <h2>Multiplication Practice</h2>
            <p style={styles.question}>{a} × {b} = ?</p>

            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              type="number"
              style={styles.input}
              placeholder="Your answer"
            />

            <br />

            <button onClick={checkMultiplication} style={styles.bigButton}>
              Check
            </button>

            <p style={styles.message}>{message}</p>
          </>
        )}
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "#f7fbff",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "42px",
    color: "#2563eb",
  },
  menu: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "30px",
  },
  button: {
    padding: "14px 20px",
    borderRadius: "14px",
    border: "none",
    background: "#60a5fa",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },
  card: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "white",
    padding: "30px",
    borderRadius: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "14px",
    marginTop: "20px",
  },
  tile: {
    padding: "18px",
    background: "#dbeafe",
    borderRadius: "16px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  question: {
    fontSize: "48px",
    fontWeight: "bold",
  },
  input: {
    fontSize: "24px",
    padding: "12px",
    width: "180px",
    textAlign: "center",
    borderRadius: "12px",
    border: "2px solid #93c5fd",
  },
  bigButton: {
    marginTop: "20px",
    padding: "14px 30px",
    borderRadius: "16px",
    border: "none",
    background: "#22c55e",
    color: "white",
    fontSize: "22px",
    cursor: "pointer",
  },
  message: {
    fontSize: "26px",
    fontWeight: "bold",
  },
  clock: {
    width: "220px",
    height: "220px",
    border: "8px solid #2563eb",
    borderRadius: "50%",
    margin: "30px auto",
    position: "relative",
    background: "#eff6ff",
  },
  handHour: {
    position: "absolute",
    width: "6px",
    height: "55px",
    background: "#111827",
    left: "107px",
    top: "55px",
    transformOrigin: "bottom",
    transform: "rotate(45deg)",
  },
  handMinute: {
    position: "absolute",
    width: "4px",
    height: "80px",
    background: "#ef4444",
    left: "108px",
    top: "30px",
    transformOrigin: "bottom",
    transform: "rotate(180deg)",
  },
  centerDot: {
    position: "absolute",
    width: "16px",
    height: "16px",
    background: "#111827",
    borderRadius: "50%",
    left: "102px",
    top: "102px",
  },
  number: {
    position: "absolute",
    fontSize: "22px",
    fontWeight: "bold",
  },
};
