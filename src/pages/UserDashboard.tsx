import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Wide Collection",
      description: "Thousands of books across multiple genres and categories.",
      icon: "📖",
      gradient: "bg-gradient-light-purple",
    },
    {
      title: "Easy Payments",
      description: "Secure and fast payment options for a smooth checkout experience.",
      icon: "💳",
      gradient: "bg-gradient-light-blue",
    },
    {
      title: "Fast Delivery",
      description: "Get your books delivered at your doorstep quickly and safely.",
      icon: "🚚",
      gradient: "bg-gradient-light-green",
    },
    {
      title: "Special Offers",
      description: "Exclusive discounts and deals for our loyal readers.",
      icon: "🎁",
      gradient: "bg-gradient-light-orange",
    },
  ];

  return (
    <div className="container py-5 min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold" style={{ color: "#333" }}>
          Welcome to Your Dashboard 📚
        </h1>
        <p className="lead text-secondary mx-auto" style={{ maxWidth: "700px" }}>
          Discover, browse, and purchase your favorite books online. Enjoy a seamless reading experience with our curated collection.
        </p>
      </div>

      {/* Features Section */}
      <div className="row g-4 justify-content-center">
        {features.map((feature, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div
              className={`card text-white ${feature.gradient} h-100 shadow-lg`}
              style={{ borderRadius: "20px", transition: "transform 0.3s", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div className="card-body text-center d-flex flex-column justify-content-center">
                <div className="display-4 mb-3">{feature.icon}</div>
                <h5 className="card-title fw-bold">{feature.title}</h5>
                <p className="card-text">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-5">
        <p className="fs-5 text-secondary">Ready to explore our book collection?</p>
        <button
          onClick={() => navigate("/books")}
          className="btn btn-gradient-primary btn-lg px-5 shadow-lg"
        >
          🚀 View All Books
        </button>
      </div>

      {/* Extra Rubbish Content Section */}
      <section className="mt-5 text-center">
        <h3 className="fw-bold mb-3">Why BookNest is the Ultimate Online Library</h3>
        <p className="text-secondary mx-auto" style={{ maxWidth: "700px" }}>
          At BookNest, we believe reading is more than a hobby — it's a lifestyle. Browse through millions of books, join book clubs, share reviews, and discover hidden gems that you won’t find anywhere else. Whether you are a casual reader or a professional bookworm, our platform has something for everyone.
        </p>

        <div className="row g-4 mt-4 justify-content-center">
          <div className="col-md-4">
            <div className="card p-3 h-100 shadow-sm">
              <h5 className="fw-bold">Community Reviews</h5>
              <p className="text-secondary">Read what others think about your favorite books or post your own review to help others choose wisely.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 h-100 shadow-sm">
              <h5 className="fw-bold">Personalized Recommendations</h5>
              <p className="text-secondary">Our smart algorithm suggests books based on your reading history and preferences. Never miss a must-read again!</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 h-100 shadow-sm">
              <h5 className="fw-bold">Reading Challenges</h5>
              <p className="text-secondary">Participate in seasonal reading challenges and earn badges for completing your literary goals. Fun, engaging, and rewarding!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Even More Rubbish Info */}
      <section className="mt-5 text-center text-secondary">
        <h4 className="fw-bold mb-3">Fun Facts About BookNest</h4>
        <ul className="list-unstyled">
          <li>📚 Over 1 million registered users worldwide.</li>
          <li>🎯 Our most-read genre this month: Science Fiction & Fantasy.</li>
          <li>💌 Daily newsletter with handpicked book recommendations.</li>
          <li>🏆 Top reviewers get exclusive discounts and recognition badges.</li>
          <li>🌍 Shipping to more than 50 countries.</li>
        </ul>
      </section>

      {/* Custom Gradients & Professional Styles */}
      <style>
        {`
          .bg-gradient-light-purple { background: linear-gradient(135deg, #d4c1ec, #8b6fc0); }
          .bg-gradient-light-blue { background: linear-gradient(135deg, #a0c4ff, #3a86ff); }
          .bg-gradient-light-green { background: linear-gradient(135deg, #b9fbc0, #4ade80); }
          .bg-gradient-light-orange { background: linear-gradient(135deg, #ffd6a5, #ff7b00); }

          .card-title, .card-text {
            text-shadow: 1px 1px 4px rgba(0,0,0,0.2);
            color: #fff;
          }

          .btn-gradient-primary {
            background: linear-gradient(90deg, #4ade80, #22c55e);
            border: none;
            color: #fff;
            font-weight: 600;
            transition: all 0.3s;
          }
          .btn-gradient-primary:hover {
            transform: translateY(-3px);
            opacity: 0.95;
          }

          .shadow-lg { box-shadow: 0 10px 20px rgba(0,0,0,0.12) !important; }
          body, .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        `}
      </style>
    </div>
  );
};

export default UserDashboard;
