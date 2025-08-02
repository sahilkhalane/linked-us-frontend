/* eslint-disable no-unused-vars */
// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getToken } from '../utils/auth';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const isLoggedIn = !!getToken();

useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_BASE_URL}/api/posts`)
    .then((res) => setPosts(res.data))
    .catch(() => setError('Failed to fetch posts'));
}, []);

  return (
    <div className="min-h-screen bg-[#f3f2ef]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Intro Section */}
        <Header />

        {/* Error / Empty State */}
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {posts.length === 0 ? (
          <p className="text-gray-600 text-center">No posts found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border border-gray-200 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-2">
                  <Link
                    to={`/profile/${post.author?._id}`}
                    className="text-lg font-semibold text-blue-700 hover:underline"
                  >
                    {post.author?.name || 'Anonymous'}
                  </Link>
                  <span className="text-sm text-gray-400 italic">
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-800 leading-relaxed whitespace-pre-line mb-2">
                  {post.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-16 border-t pt-6">
          &copy; {new Date().getFullYear()} Linked up by Sahil Khalane.
        </div>
      </div>
    </div>
  );
};

export default Home;
