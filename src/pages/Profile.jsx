/* eslint-disable no-unused-vars */
// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getToken } from '../utils/auth';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const isMe = id === 'me';

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${isMe ? 'me' : id}`,
        isMe
          ? { headers: { Authorization: getToken() } }
          : {}
      );
      setProfile(res.data);
    } catch (err) {
      setError('Failed to load profile');
    }
  };

  fetchProfile();
}, [id, isMe]);

  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;
  if (!profile) return <div className="text-center text-gray-500 mt-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f3f2ef]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">
              {profile.user.name?.charAt(0).toUpperCase() || '?'}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-blue-700">{profile.user.name}</h2>
              <p className="text-gray-600">{profile.user.email}</p>
              {profile.user.bio && (
                <p className="mt-2 text-gray-500 italic">"{profile.user.bio}"</p>
              )}
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Posts by {profile.user.name}
          </h3>
          {profile.posts.length === 0 ? (
            <p className="text-gray-500">No posts yet.</p>
          ) : (
            <div className="space-y-4">
              {profile.posts.map(post => (
                <div
                  key={post._id}
                  className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
                >
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">{post.content}</p>
                  <div className="text-sm text-gray-500 mt-2 italic">
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
