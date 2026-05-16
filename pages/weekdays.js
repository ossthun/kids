import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getLanguage, translations } from "../translations";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function WeekdaysPage() {
  const router = useRouter();

  const [language, setLanguage] = useState("en");
  const [days, setDays] = useState([]);
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(null);

  const cardRef = useRef(null);

  useEffect(() => {
    const detectedLanguage = getLanguage();
    const safeLanguage = translations[detectedLanguage]
      ? detectedLanguage
      : "en";

    const safeDays =
      translations[safeLanguage].days || translations.en.days;

    setLanguage(safeLanguage);
    setDays(shuffle(safeDays));
  }, []);

  const t = translations[language] || translations.en;

  const startDrag = (event, index) => {
    event.preventDefault();

    const item = event.currentTarget;
    const rect = item.getBoundingClientRect();

    setDragging({
      index,
      day: days[index],
      offsetY: event.clientY - rect.top,
      y: event.clientY,
    });

    item.setPointerCapture?.(event.pointerId);
    setMessage("");
  };

  const moveDrag = (event) => {
    if (!dragging || !cardRef.current) return;

    event.preventDefault();

    const rows = Array.from(
      cardRef.current.querySelectorAll("[data-day-row='true']")
    );

    let newIndex = dragging.index;

    rows.forEach((row, index) => {
      const rect = row.getBoundingClientRect();
      const middle = rect.top + rect.height / 2;

      if (event.clientY > middle) {
        newIndex = index;
      }
    });

    setDragging((current) => ({
      ...current,
      y: event.clientY,
      targetIndex: newIndex,
    }));
  };

  const endDrag = () => {
    if (!dragging) return;

    const fromIndex = dragging.index;
    const toIndex =
      typeof dragging.targetIndex === "number"
        ? dragging.targetIndex
        : dragging.index;

    if (fromIndex !== toIndex) {
      const updated = [...days];
      const [movedDay] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedDay);
      setDays(updated);
    }

    setDragging(null);
  };

  const checkAnswer = () => {
    const correct =
      JSON.stringify(days) === JSON.stringify(t.days);

    if (correct) {
      setMessage(t.correct);

      setTimeout(() => {
        sessionStorage.setItem("lastGame", "/weekdays");
        router.push("/reward");
      }, 700);
    } else {
      setMessage(t.tryAgain);
    }
  };

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>
        {t.weekdaysTitle}
      </h1>

      <p style={styles.subtitle}>
        {t.weekdaysSubtitle}
      </p>

      <div ref={cardRef} style={styles.card}>
        {days.map((day, index) => {
          const isDragging = dragging?.index === index;

          return (
            <div
              key={day}
              data-day-row="true"
              onPointerDown={(event) =>
                startDrag(event, index)
              }
              onPointerMove={moveDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              style={{
                ...styles.dayRow,
                opacity: isDragging ? 0.35 : 1,
              }}
            >
              <span style={styles.dragHandle}>
                ☰
              </span>

              <span style={styles.day}>
                {day}
              </span>
            </div>
          );
        })}

        {dragging && (
          <div
            style={{
              ...styles.dragPreview,
              top: dragging.y - dragging.offsetY,
            }}
          >
            <span style={styles.dragHandle}>
              ☰
            </span>

            <span style={styles.day}>
              {dragging.day}
            </span>
          </div>
        )}
      </div>

      <button
        onClick={checkAnswer}
        style={styles.checkButton}
      >
        {t.check}
      </button>

      <p style={styles.message}>
        {message}
      </p>

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
    position: "relative",
    touchAction: "none",
  },

  dayRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "18px",
    marginBottom: "12px",
    background: "#dbeafe",
    borderRadius: "18px",
    cursor: "grab",
    userSelect: "none",
    touchAction: "none",
    boxShadow:
      "0 4px 10px rgba(37,99,235,0.12)",
  },

  dragPreview: {
    position: "fixed",
    left: "50%",
    transform:
      "translateX(-50%) scale(1.03)",
    zIndex: 9999,
    width:
      "min(460px, calc(100vw - 70px))",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "18px",
    background: "#bfdbfe",
    border: "2px solid #2563eb",
    borderRadius: "18px",
    boxShadow:
      "0 12px 30px rgba(37,99,235,0.25)",
    pointerEvents: "none",
  },

  dragHandle: {
    fontSize: "24px",
    color: "#2563eb",
    fontWeight: "bold",
  },

  day: {
    fontSize: "24px",
    fontWeight: "bold",
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

  backLink: {
    display: "inline-block",
    marginTop: "20px",
    color: "#2563eb",
    fontSize: "18px",
    textDecoration: "none",
  },
};
