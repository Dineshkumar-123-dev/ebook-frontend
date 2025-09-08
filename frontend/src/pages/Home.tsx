import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: React.FC = () => {
  return (
    <main
      className="min-vh-100 d-flex flex-column"
      style={{ background: "linear-gradient(135deg, #f5f7fa, #e0f7fa)" }}
    >
      {/* HERO */}
      <section className="container text-center py-5 my-5">
        <motion.h1
          className="display-2 fw-bold mb-3 gradient-text"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          📚 Welcome to BookNest
        </motion.h1>

        <motion.p
          className="lead text-dark mx-auto col-lg-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          Your <span className="fw-semibold text-gradient">cozy online library</span> where every page
          tells a story. Discover bestsellers, timeless classics, and hidden treasures — all in one place.
        </motion.p>
      </section>

      {/* FEATURE CARDS */}
      <section className="container my-5 px-5">
        <div className="row g-4">
          {[
            {
              icon: "📖",
              title: "Vast Collection",
              desc: "Explore novels, self-help, academic books, and exclusive editions curated just for you.",
              btn: "Explore Collection",
            },
            {
              icon: "💳",
              title: "Easy & Secure",
              desc: "Buy books in seconds with secure payment methods. Shop worry-free anytime.",
              btn: "Payment Options",
            },
            {
              icon: "🚚",
              title: "Fast Delivery",
              desc: "Get your books delivered quickly to your doorstep — fresh stories, no waiting.",
              btn: "Delivery Info",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="col-md-4 d-flex"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <div className={`card glass-card h-100 shadow-lg border-0 text-dark flex-fill`}>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h2 className="h1">{card.icon}</h2>
                    <h5 className="card-title fw-bold gradient-text">{card.title}</h5>
                    <p className="card-text">{card.desc}</p>
                  </div>
                  <button className="btn btn-outline-dark mt-3">{card.btn}</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED AUTHORS */}
      <section className="container my-5 px-5">
        <h3 className="mb-4 text-dark fw-bold gradient-text text-center">🌟 Featured Authors</h3>
        <div className="row g-4">
          {["J.K. Rowling", "George R.R. Martin", "Paulo Coelho", "Agatha Christie"].map((author, i) => (
            <motion.div
              key={i}
              className="col-md-3 d-flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
            >
              <div className="card glass-card h-100 shadow-lg text-center border-0 p-3">
                <h4 className="fw-bold">{author}</h4>
                <p className="text-secondary">Bestselling Author</p>
                <button className="btn btn-outline-dark mt-auto">View Books</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="container my-5 px-5">
        <h3 className="mb-4 text-dark fw-bold gradient-text text-center">💬 What Our Readers Say</h3>
        <div className="row g-4">
          {[
            { name: "Anita K.", review: "Amazing collection! Found books I never thought I'd get." },
            { name: "Ravi P.", review: "Fast delivery and easy checkout. Love it!" },
            { name: "Sneha M.", review: "The user experience is fantastic, highly recommended." },
          ].map((r, i) => (
            <motion.div
              key={i}
              className="col-md-4 d-flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
            >
              <div className="card glass-card h-100 shadow-lg border-0 p-4">
                <p className="text-dark opacity-80">"{r.review}"</p>
                <h6 className="text-gradient fw-bold mt-3">- {r.name}</h6>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="container text-center py-5">
        <motion.h3
          className="h4 fw-semibold mb-4 text-dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          Start your next reading adventure today 📖✨
        </motion.h3>

        <motion.button
          className="btn btn-lg btn-gradient-warning fw-bold px-5 py-3 shadow-lg"
          initial={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          Browse Books
        </motion.button>
      </section>

      <style>
        {`
          .glass-card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            border-radius: 15px;
            transition: all 0.3s ease;
          }

          .gradient-text {
            background: linear-gradient(90deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .btn-gradient-warning {
            background: linear-gradient(90deg, #f6d365, #fda085);
            border: none;
            color: #fff;
            transition: all 0.3s ease;
          }
          .btn-gradient-warning:hover {
            opacity: 0.9;
          }

          .text-gradient {
            background: linear-gradient(90deg, #ff7e5f, #feb47b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}
      </style>
    </main>
  );
};

export default Home;
