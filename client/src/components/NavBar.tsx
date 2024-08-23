import React, { useState } from 'react';

function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can handle the search functionality here
    console.log('Search query:', searchQuery);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">My App</div>
        <form onSubmit={handleSearchSubmit} className="flex flex-1 max-w-lg ml-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-full p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white p-2 rounded-r-lg hover:bg-purple-700 transition-all duration-300"
          >
            Search
          </button>
        </form>
        <div className="text-white">Profile</div>
      </div>
    </nav>
  );
}

export default NavBar;
