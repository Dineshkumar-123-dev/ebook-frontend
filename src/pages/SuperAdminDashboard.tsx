// src/pages/SuperAdminDashboard.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Modal } from "react-bootstrap";
import { Star } from "react-bootstrap-icons";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface Admin {
  id: number;
  username: string;
  email: string;
  role: string;
}

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

const SuperAdminDashboard: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Partial<Book>>({});
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Reviews modal
  const [showReviews, setShowReviews] = useState(false);
  const [selectedReviews, setSelectedReviews] = useState<Review[]>([]);
  const [selectedBookTitle, setSelectedBookTitle] = useState("");

  useEffect(() => {
    fetchAdmins();
    fetchUsers();
    fetchBooks();
  }, []);

  /** ADMINS CRUD **/
  const fetchAdmins = async () => {
    try {
      const res = await axiosInstance.get<Admin[]>("/auth/admins", {
        params: { email: "ashik@gmail.com", password: "ashik@1234" },
      });
      setAdmins(res.data);
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  const deleteAdmin = async (id: number) => {
    try {
      await axiosInstance.delete(`/auth/admins/${id}`);
      fetchAdmins();
    } catch (err) {
      console.error("Error deleting admin:", err);
    }
  };

  /** USERS CRUD **/
  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get<User[]>("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axiosInstance.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  /** BOOKS CRUD **/
  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get<Book[]>("/admin/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await axiosInstance.put(`/admin/books/${editingBook.id}`, newBook);
      } else {
        await axiosInstance.post("/admin/books", newBook);
      }
      setNewBook({});
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      console.error("Error saving book:", err);
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await axiosInstance.delete(`/admin/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  /** REVIEWS **/
  const fetchReviews = async (bookId: number, title: string) => {
    try {
      const res = await axiosInstance.get<Review[]>(`/reviews/${bookId}`);
      setSelectedReviews(res.data);
      setSelectedBookTitle(title);
      setShowReviews(true);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  return (
    <div className="container my-5">
      {/* Professional Welcome Section */}
      <div className="glass-card shadow-lg p-5 mb-5 text-center position-relative welcome-card">
        <h2 className="welcome-title mb-3 gradient-text">🔑 Welcome SuperAdmin</h2>
        <p className="welcome-text">
          BookNest is a premier online bookstore platform where users can explore, purchase, and review books.
        </p>
        <p className="welcome-text">
          As a SuperAdmin, you have the ultimate control: manage admins, monitor all users, oversee the book catalog, and review feedback to ensure a seamless and engaging experience.
        </p>
        <p className="welcome-text">
          Maintain a high standard, optimize platform performance, and ensure BookNest remains a top destination for book lovers.
        </p>

        {/* Floating Shapes */}
        <div className="floating-shape shape1"></div>
        <div className="floating-shape shape2"></div>
        <div className="floating-shape shape3"></div>
      </div>

      {/* Dashboard Sections */}
      <h2 className="text-center mb-4 gradient-text">SuperAdmin Dashboard</h2>

      {/* Admin Management */}
      <div className="glass-card shadow-lg mb-4">
        <div className="card-header bg-gradient-header text-black">Manage Admins</div>
        <div className="card-body p-3">
          <table className="table table-hover glass-table mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.username}</td>
                  <td>{a.email}</td>
                  <td>
                    <span className="badge bg-primary">{a.role}</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-gradient-danger" onClick={() => deleteAdmin(a.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Management */}
      <div className="glass-card shadow-lg mb-4">
        <div className="card-header bg-gradient-header text-black">Manage Users</div>
        <div className="card-body p-3">
          <table className="table table-hover glass-table mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className="badge bg-secondary">{u.role}</span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-gradient-danger" onClick={() => deleteUser(u.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book Management */}
      <div className="glass-card shadow-lg mb-4">
        <div className="card-header bg-gradient-header text-black">Manage Books</div>
        <div className="card-body p-3">
          {/* Book Form */}
          <form onSubmit={handleBookSubmit} className="mb-4">
            <div className="row g-2">
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="Title"
                  className="form-control"
                  value={newBook.title || ""}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="Author"
                  className="form-control"
                  value={newBook.author || ""}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  placeholder="Price"
                  className="form-control"
                  value={newBook.price || ""}
                  onChange={(e) =>
                    setNewBook({ ...newBook, price: e.target.value ? parseFloat(e.target.value) : undefined })
                  }
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Description"
                  className="form-control"
                  value={newBook.description || ""}
                  onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                />
              </div>
              <div className="col-12 mt-2">
                <button className="btn btn-gradient-success w-100">
                  {editingBook ? "Update Book" : "Add Book"}
                </button>
              </div>
            </div>
          </form>

          {/* Book List */}
          <table className="table table-hover glass-table mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>${b.price?.toFixed(2)}</td>
                  <td>{b.description}</td>
                  <td>
                    <button className="btn btn-sm btn-gradient-info me-2" onClick={() => { setEditingBook(b); setNewBook(b); }}>Edit</button>
                    <button className="btn btn-sm btn-gradient-danger me-2" onClick={() => handleDeleteBook(b.id)}>Delete</button>
                    <button className="btn btn-sm btn-gradient-secondary" onClick={() => fetchReviews(b.id, b.title)}><Star /> Reviews</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reviews Modal */}
      <Modal show={showReviews} onHide={() => setShowReviews(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Reviews for: {selectedBookTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReviews.length > 0 ? (
            <table className="table table-hover">
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
            </table>
          ) : (
            <p className="text-center text-muted">No reviews available for this book.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowReviews(false)}>Close</button>
        </Modal.Footer>
      </Modal>

      {/* Styles */}
      <style>
        {`
          /* Glass Card */
          .glass-card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            border-radius: 20px;
            margin-bottom: 2rem;
          }

          /* Glass Table */
          .glass-table {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(8px);
            border-radius: 12px;
          }

          /* Gradient Buttons */
          .btn-gradient-success { background: linear-gradient(90deg, #4ade80, #22c55e); color: #fff; font-weight: 600; border: none; transition: transform 0.3s; }
          .btn-gradient-success:hover { transform: translateY(-2px); opacity: 0.9; }
          .btn-gradient-danger { background: linear-gradient(90deg, #f87171, #ef4444); color: #fff; font-weight: 600; border: none; transition: transform 0.3s; }
          .btn-gradient-danger:hover { transform: translateY(-2px); opacity: 0.9; }
          .btn-gradient-info { background: linear-gradient(90deg, #60a5fa, #3b82f6); color: #fff; font-weight: 600; border: none; transition: transform 0.3s; }
          .btn-gradient-info:hover { transform: translateY(-2px); opacity: 0.9; }
          .btn-gradient-secondary { background: linear-gradient(90deg, #cbd5e1, #64748b); color: #fff; font-weight: 600; border: none; transition: transform 0.3s; }
          .btn-gradient-secondary:hover { transform: translateY(-2px); opacity: 0.9; }

          .bg-gradient-header { background: linear-gradient(135deg, #e2dfdf, #858585); }

          body, .container { font-family: 'Montserrat', sans-serif; }

          /* Welcome Section */
          .welcome-card { position: relative; overflow: hidden; border-radius: 25px; animation: fadeIn 1s ease-out; }
          .gradient-text { background: linear-gradient(90deg, #FF6B6B, #FFD93D, #6BCB77); background-clip: text; -webkit-background-clip: text; color: transparent; font-weight: 700; animation: gradientMove 3s infinite linear; }
          .welcome-title { font-size: 2.5rem; animation: slideIn 1s ease-out; }
          .welcome-text { font-size: 1.1rem; color: #333; margin: 0.5rem 0; animation: fadeIn 2s ease-out; }
          .floating-shape { position: absolute; border-radius: 50%; opacity: 0.2; animation: floatAnim 6s infinite ease-in-out alternate; }
          .shape1 { width: 100px; height: 100px; background: #FF6B6B; top: 10%; left: 5%; }
          .shape2 { width: 150px; height: 150px; background: #6BCB77; bottom: 15%; right: 10%; }
          .shape3 { width: 80px; height: 80px; background: #FFD93D; top: 50%; right: 25%; }

          @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slideIn { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes floatAnim { 0% { transform: translateY(0px) rotate(0deg); } 100% { transform: translateY(-20px) rotate(45deg); } }
        `}
      </style>
    </div>
  );
};

export default SuperAdminDashboard;
