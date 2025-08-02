// src/pages/PostCreate.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const PostCreate = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/posts`,
      { content },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    navigate('/');
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to post');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f2ef] px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Create a Post</h2>
        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What do you want to share?"
            rows="6"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCreate;