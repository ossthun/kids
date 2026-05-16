import { useRouter } from "next/router";

export default function RewardPage() {
  const router = useRouter();

  return (
    <main onClick={() => router.push("/")} style={styles.page}>
      <div style={styles.confetti}>
        {Array.from({ length: 60 }).map((_, index) => (
          <span
            key={index}
            style={{
              ...styles.confettiPiece,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              background: colors[index % colors.length],
            }}
          />
        ))}
      </div>

      <div style={styles.content}>
        <div style={styles.smiley}>😊</div>
        <h1 style={styles.title}>Well done!</h1>
        <p style={styles.subtitle}>Tap anywhere to go home</p>
      </div>
    </main>
  );
}

const colors = [
  "#ef4444",
  "#f97316",
  "#facc15",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

const styles = {
  page: {
    minHeight: "100vh",
    overflow: "hidden",
    background: "#f0f9ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    cursor: "pointer",
    position: "relative",
  },
  confetti: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    pointerEvents: "none",
  },
  confettiPiece: {
    position: "absolute",
    top: "-20px",
    width: "12px",
    height: "18px",
    borderRadius: "4px",
    animation: "fall 3s linear infinite",
  },
  content: {
    position: "relative",
    zIndex: 2,
    background: "white",
    padding: "50px",
    borderRadius: "32px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
  },
  smiley: {
    fontSize: "110px",
    animation: "pulse 1s ease-in-out infinite",
  },
  title: {
    fontSize: "54px",
    color: "#2563eb",
    margin: "20px 0 10px",
  },
  subtitle: {
    fontSize: "22px",
    color: "#475569",
  },
};
