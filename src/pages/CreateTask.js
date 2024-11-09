import React, { useState } from 'react';
import { createTask } from '../firebase/firebaseUtils';  // Import the createTask function
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Call the reusable createTask function
    const result = await createTask(title, description);

    if (result.success) {
      setTitle('');
      setDescription('');
      alert('Task created successfully!');
    } else {
      setError('Failed to create task');
    }

    setLoading(false);
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-6">
        <h1 className="text-center mb-4">Create Task</h1>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Task Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Task Description</label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn custom-btn btn-lg"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
