import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useCart } from "../context/CartContext";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  rating?: number;
}

interface Review {
  id: number;
  username: string;
  comment: string;
  rating?: number;
}

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { addToCart } = useCart();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBook();
    fetchReviews();
    fetchFavorites();
  }, [id]);

  // Fetch Book
  const fetchBook = async () => {
    try {
      const res = await axiosInstance.get<Book>(`/books/${id}/`);
      setBook(res.data);
    } catch (err: any) {
      console.error("Error fetching book:", err.response || err.message);
    }
  };

  // Fetch Reviews
  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get<Review[]>(`/reviews/${id}/`);
      setReviews(res.data);
    } catch (err: any) {
      console.error("Error fetching reviews:", err.response || err.message);
    }
  };

  // Fetch Favorites
  const fetchFavorites = async () => {
    if (!token) return;
    try {
      const res = await axiosInstance.get(`/favorites/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(res.data.map((f: any) => f.book_id)); // ✅ use book_id
    } catch (err: any) {
      console.error("Error fetching favorites:", err.response || err.message);
    }
  };

  // Add to Favorites
  const handleAddToFavorites = async () => {
    if (!book || !token) {
      alert("Please login to add favorites");
      return;
    }
    try {
      await axiosInstance.post(
        `/favorites/`,
        { book_id: book.id }, // ✅ fixed
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchFavorites();
      alert("Added to favorites!");
    } catch (err: any) {
      console.error("Error adding favorite:", err.response || err.message);
      alert("Failed to add favorite");
    }
  };

  // Add Review
  const handleAddReview = async () => {
    if (!newReview || !token) {
      alert("Please login and write a review");
      return;
    }
    try {
      const res = await axiosInstance.post(
        `/reviews/`,
        { book_id: Number(id), rating: newRating || 0, comment: newReview }, // ✅ fixed
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews([...reviews, res.data]);
      setNewReview("");
      setNewRating(0);
    } catch (err: any) {
      console.error("Error adding review:", err.response || err.message);
      alert("Failed to add review");
    }
  };

  // Add to Cart
  const handleAddToCart = async () => {
    if (!book || !token) {
      alert("Please login to add items to cart");
      return;
    }
    try {
      await axiosInstance.post(
        `/cart/`,
        { book_id: book.id, quantity: 1 }, // ✅ fixed
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addToCart(book.id); // update frontend context
      alert("Added to cart!");
    } catch (err: any) {
      console.error("Error adding to cart:", err.response || err.message);
      alert("Failed to add to cart");
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-info">{book.title}</h2>
        <h5 className="text-secondary">by {book.author}</h5>
        <p className="mt-3">{book.description}</p>
        <h4 className="text-warning">Rs. {book.price}</h4>

        <div className="mb-3">
          <strong>Average Rating: </strong>
          {book.rating ? `${book.rating.toFixed(1)} / 5 ⭐` : "Not rated yet"}
        </div>

        <div className="d-flex gap-3 my-3">
          <button className="btn btn-success" onClick={handleAddToCart}>
            Add to Cart 🛒
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={handleAddToFavorites}
          >
            {favorites.includes(book.id) ? "❤️ Favorited" : "Add to Favorites"}
          </button>
        </div>

        <hr />

        {/* Reviews */}
        <div className="my-3">
          <h4>Reviews</h4>
          <ul className="list-group mb-3">
            {reviews.length > 0 ? (
              reviews.map((r) => (
                <li key={r.id} className="list-group-item">
                  <strong>{r.username}:</strong> {r.comment}{" "}
                  {r.rating &&
                    Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < r.rating ? "⭐" : "☆"}</span>
                    ))}
                </li>
              ))
            ) : (
              <li className="list-group-item">No reviews yet</li>
            )}
          </ul>

          <div className="mb-3">
            <label className="form-label">Your Rating:</label>
            <div className="d-flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  onClick={() => setNewRating(i + 1)}
                  onMouseEnter={() => setHoverRating(i + 1)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{
                    fontSize: "1.8rem",
                    cursor: "pointer",
                    color: i < (hoverRating || newRating) ? "#FFD700" : "#ccc",
                    transition: "color 0.3s",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Write a review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleAddReview}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
