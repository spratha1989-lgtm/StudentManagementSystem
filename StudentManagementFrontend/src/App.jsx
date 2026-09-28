import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5240/api/Students";

function App() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    age: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ==============================
  // GET ALL STUDENTS
  // ==============================
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to fetch students");
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
      alert("Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  // Load students when page opens
  useEffect(() => {
    fetchStudents();
  }, []);

  // ==============================
  // HANDLE INPUT
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ==============================
  // ADD / UPDATE STUDENT
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.course ||
      !formData.age
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const studentData = {
        name: formData.name,
        email: formData.email,
        course: formData.course,
        age: Number(formData.age),
      };

      // UPDATE
      if (editingId !== null) {
        const response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editingId,
            ...studentData,
          }),
        });

        if (!response.ok) {
          throw new Error("Update failed");
        }

        alert("Student updated successfully!");

        setEditingId(null);
      }

      // ADD
      else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentData),
        });

        if (!response.ok) {
          throw new Error("Add student failed");
        }

        alert("Student added successfully!");
      }

      clearForm();
      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Operation failed. Please check your backend.");
    }
  };

  // ==============================
  // EDIT STUDENT
  // ==============================
  const handleEdit = (student) => {
    setEditingId(student.id);

    setFormData({
      name: student.name,
      email: student.email,
      course: student.course,
      age: student.age,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==============================
  // DELETE STUDENT
  // ==============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      alert("Student deleted successfully!");

      fetchStudents();
    } catch (error) {
      console.error(error);
      alert("Unable to delete student.");
    }
  };

  // ==============================
  // CLEAR FORM
  // ==============================
  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      course: "",
      age: "",
    });

    setEditingId(null);
  };

  return (
    <div className="app">

      {/* ==============================
          HEADER
      ============================== */}
      <header className="header">

        <div className="header-content">

          <div className="logo-box">
            <div className="logo-icon">🎓</div>
          </div>

          <div>
            <h1>Student Management System</h1>
            <p>ASP.NET Core Web API • React • SQL Server</p>
          </div>

        </div>

      </header>


      {/* ==============================
          MAIN CONTENT
      ============================== */}
      <main className="container">

        {/* DASHBOARD CARDS */}
        <section className="stats">

          <div className="stat-card">
            <div className="stat-icon blue">👨‍🎓</div>

            <div>
              <span>Total Students</span>
              <strong>{students.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>

            <div>
              <span>System Status</span>
              <strong className="online">Online</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">⚙</div>

            <div>
              <span>Technology</span>
              <strong>Full Stack</strong>
            </div>
          </div>

        </section>


        {/* ==============================
            ADD / EDIT STUDENT
        ============================== */}
        <section className="card">

          <div className="card-header">

            <div>
              <h2>
                {editingId !== null
                  ? "Edit Student"
                  : "Add New Student"}
              </h2>

              <p>
                {editingId !== null
                  ? "Update the student's information"
                  : "Enter student information below"}
              </p>
            </div>

            {editingId !== null && (
              <button
                className="cancel-button"
                onClick={clearForm}
              >
                Cancel Edit
              </button>
            )}

          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="form-group">
                <label>Student Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                />
              </div>


              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
              </div>


              <div className="form-group">
                <label>Course</label>

                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="Enter course"
                />
              </div>


              <div className="form-group">
                <label>Age</label>

                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  min="1"
                />
              </div>

            </div>


            <div className="form-actions">

              <button
                type="submit"
                className="primary-button"
              >
                {editingId !== null
                  ? "Update Student"
                  : "Add Student"}
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={clearForm}
              >
                Clear
              </button>

            </div>

          </form>

        </section>


        {/* ==============================
            STUDENT TABLE
        ============================== */}
        <section className="card">

          <div className="card-header">

            <div>
              <h2>Student Records</h2>
              <p>Manage all registered students</p>
            </div>

            <button
              className="refresh-button"
              onClick={fetchStudents}
            >
              🔄 Refresh
            </button>

          </div>


          {loading ? (

            <div className="loading">
              Loading students...
            </div>

          ) : students.length === 0 ? (

            <div className="empty-state">
              <div className="empty-icon">📚</div>

              <h3>No Students Found</h3>

              <p>
                Add a student using the form above.
              </p>
            </div>

          ) : (

            <div className="table-container">

              <table>

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Age</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {students.map((student) => (

                    <tr key={student.id}>

                      <td>
                        <span className="id-badge">
                          #{student.id}
                        </span>
                      </td>

                      <td className="student-name">
                        {student.name}
                      </td>

                      <td>
                        {student.email}
                      </td>

                      <td>
                        <span className="course-badge">
                          {student.course}
                        </span>
                      </td>

                      <td>
                        {student.age}
                      </td>

                      <td>

                        <div className="actions">

                          <button
                            className="edit-button"
                            onClick={() => handleEdit(student)}
                          >
                            ✏ Edit
                          </button>

                          <button
                            className="delete-button"
                            onClick={() =>
                              handleDelete(student.id)
                            }
                          >
                            🗑 Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* FOOTER */}
        <footer>
          <p>
            Student Management System © 2026
          </p>

          <p>
            Built with React + ASP.NET Core + SQL Server
          </p>
        </footer>

      </main>

    </div>
  );
}

export default App;