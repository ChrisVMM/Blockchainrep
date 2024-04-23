import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, []);


  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-2xl">
            <span className="text-blue-400">Blockchain</span>
            <span className="text-blue-200">Estate</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 text-gray-300 placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-gray-400" />
          </button>
        </form>
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="text-gray-300 hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-300 hover:text-blue-400">
              About
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-gray-300 hover:text-blue-400">
              {currentUser ? (
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                'Sign in'
              )}
            </Link>
          </li>

        </ul>
      </div>
    </header>
  );
}
