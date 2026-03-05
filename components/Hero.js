import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="hero">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>ברוכים הבאים לאתר המשודרג</h1>
        <p>חוויית משתמש מודרנית ומהירה</p>
        <button className="btn">כניסה לאתר</button>
      </motion.div>

      <style jsx>{`
        .hero {
          min-height: 90vh;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
        }

        .btn {
          margin-top: 20px;
          padding: 12px 28px;
          border-radius: 30px;
          border: none;
          font-size: 18px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
