import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button, Table, Modal } from "react-bootstrap";
import { PencilSquare, Trash, PlusCircle, Star } from "react-bootstrap-icons";

interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
  price?: number;
}

interface Review {
  id: number;
  username: string;
  rating: number;
  comment: string;
}

const AdminDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<Partial<Book>>({});
  const [editId, setEditId] = useState<number | null>(null);

  // Reviews modal
  const [showReviews, setShowReviews] = useState(false);
  const [selectedReviews, setSelectedReviews] = useState<Review[]>([]);
  const [selectedBookTitle, setSelectedBookTitle] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/admin/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const fetchReviews = async (bookId: number, title: string) => {
    try {
      const res = await axios.get<Review[]>(`http://127.0.0.1:8000/api/reviews/${bookId}`);
      setSelectedReviews(res.data);
      setSelectedBookTitle(title);
      setShowReviews(true);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://127.0.0.1:8000/api/admin/books/${editId}`, form);
      } else {
        await axios.post("http://127.0.0.1:8000/api/admin/books", form);
      }
      setForm({});
      setEditId(null);
      fetchBooks();
    } catch (err) {
      console.error("Error saving book:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <Container className="mt-4">
      {/* Animated Welcome Section */}
      <Card className="glass-card shadow-lg mb-5 p-5 text-center welcome-card">
        <h2 className="welcome-title mb-3">
          📚 Welcome to <span className="gradient-text">BookNest</span> Admin Panel
        </h2>
        <p className="welcome-text">
          Manage your online bookstore with ease! Discover new books, track reviews, and keep your catalog organized.
        </p>
        <p className="welcome-text">
          Enhance the customer experience and maintain a smooth, engaging, and visually appealing bookstore dashboard.
        </p>
        {/* Floating shapes */}
        <div className="floating-shape shape1"></div>
        <div className="floating-shape shape2"></div>
        <div className="floating-shape shape3"></div>
      </Card>

      {/* Book Management */}
      <Card className="glass-card shadow-lg border-0">
        <Card.Header className="bg-gradient-header text-white text-center">
          <h3>📚 Admin Dashboard</h3>
          <p className="mb-0">Manage your books efficiently</p>
        </Card.Header>
        <Card.Body>
          {/* Book Form */}
          <Form onSubmit={handleSubmit} className="mb-4">
            <Row className="g-3">
              <Col md={3}>
                <Form.Control
                  type="text"
                  placeholder="Book Title"
                  value={form.title || ""}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="text"
                  placeholder="Author"
                  value={form.author || ""}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  required
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="number"
                  placeholder="Price"
                  value={form.price || ""}
                  onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  as="textarea"
                  rows={1}
                  placeholder="Description"
                  value={form.description || ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </Col>
            </Row>
            <div className="text-center mt-3">
              <Button type="submit" variant="gradient-btn" className={editId ? "btn-warning" : "btn-success"}>
                {editId ? "Update Book ✏️" : "Add Book"} <PlusCircle className="ms-2" />
              </Button>
            </div>
          </Form>

          {/* Book Table */}
          <Table striped bordered hover responsive className="glass-table shadow-sm">
            <thead className="table-dark text-center">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Description</th>
                <th>Rs. Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.description || "—"}</td>
                  <td>{book.price ? `Rs. ${book.price.toFixed(2)}` : "—"}</td>
                  <td className="text-center">
                    <Button
                      size="sm"
                      variant="info"
                      className="me-2"
                      onClick={() => {
                        setForm(book);
                        setEditId(book.id);
                      }}
                    >
                      <PencilSquare /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="me-2"
                      onClick={() => handleDelete(book.id)}
                    >
                      <Trash /> Delete
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => fetchReviews(book.id, book.title)}
                    >
                      <Star /> Reviews
                    </Button>
                  </td>
                </tr>
              ))}
              {books.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No books available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Reviews Modal */}
      <Modal show={showReviews} onHide={() => setShowReviews(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Reviews for: {selectedBookTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReviews.length > 0 ? (
            <Table striped bordered hover>
              <thead className="table-dark text-center">
                <tr>
                  <th>User</th>
                  <th>Rating</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {selectedReviews.map((r) => (
                  <tr key={r.id}>
                    <td>{r.username}</td>
                    <td>{r.rating} ⭐</td>
                    <td>{r.comment}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center text-muted">No reviews available for this book.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviews(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

          .glass-card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            border-radius: 20px;
          }
          .bg-gradient-header {
            background: linear-gradient(135deg, #fefeffff, #5e5d5fff);
          }
          .btn-gradient {
            background: linear-gradient(90deg, #f7f7f7ff, #3b3b3bff);
            color: #ddddddff;
            font-weight: 600;
            border: none;
            transition: transform 0.3s, opacity 0.3s;
          }
          .btn-gradient:hover {
            transform: translateY(-2px);
            opacity: 0.95;
          }
          .glass-table {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(8px);
            border-radius: 15px;
          }
          .table td, .table th {
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
          }
          .shadow-sm {
            box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
          }

          body, .container {
            font-family: 'Montserrat', sans-serif;
          }

          /* Welcome Section */
          .welcome-card {
            position: relative;
            overflow: hidden;
            font-family: 'Montserrat', sans-serif;
            background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,240,240,0.85));
            border-radius: 25px;
            animation: fadeIn 1s ease-out;
          }
          .gradient-text {
            background: linear-gradient(90deg, #FF6B6B, #FFD93D, #6BCB77);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            font-weight: 700;
            animation: gradientMove 3s infinite linear;
          }
          .welcome-title {
            font-size: 2.5rem;
            animation: slideIn 1s ease-out;
          }
          .welcome-text {
            font-size: 1.1rem;
            color: #333;
            margin: 0.5rem 0;
            animation: fadeIn 2s ease-out;
          }
          .floating-shape {
            position: absolute;
            border-radius: 50%;
            opacity: 0.2;
            animation: floatAnim 6s infinite ease-in-out alternate;
          }
          .shape1 { width: 100px; height: 100px; background: #FF6B6B; top: 10%; left: 5%; }
          .shape2 { width: 150px; height: 150px; background: #6BCB77; bottom: 15%; right: 10%; }
          .shape3 { width: 80px; height: 80px; background: #FFD93D; top: 50%; right: 25%; }

          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes floatAnim {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-20px) rotate(45deg); }
          }
        `}
      </style>
    </Container>
  );
};

export default AdminDashboard;
