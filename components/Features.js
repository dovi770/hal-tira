export default function Features() {
  const items = [
    "עיצוב מודרני",
    "מהירות גבוהה",
    "חוויית משתמש משופרת",
  ];

  return (
    <div className="features">
      <h2>מה חדש באתר?</h2>

      <div className="grid">
        {items.map((item, i) => (
          <div key={i} className="card">
            {item}
          </div>
        ))}
      </div>

      <style jsx>{`
        .features {
          padding: 80px 20px;
          text-align: center;
        }

        .grid {
          margin-top: 40px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 25px;
        }

        .card {
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
