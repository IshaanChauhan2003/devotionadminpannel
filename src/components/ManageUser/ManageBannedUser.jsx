// src/components/ManageUser/ManageBannedUser.js
import React, { useState } from 'react';
import BanTable from './BanTable'
import { FaSearch } from 'react-icons/fa';

function ManageBannedUser() {
  const [bannedUsers, setBannedUsers] = useState([
    { id: '1', username: 'bannedUser1', followers: 50, totalPosts: 5, email: 'bannedUser1@example.com', createdAt: '2024-01-01', banUntil: '2024-12-31', profilePic: 'https://via.placeholder.com/50' },
    { id: '2', username: 'bannedUser2', followers: 75, totalPosts: 3, email: 'bannedUser2@example.com', createdAt: '2024-02-01', banUntil: '2024-12-31', profilePic: 'https://via.placeholder.com/50' },
    // Add more dummy data as needed
  ]);

  const [searchCriteria, setSearchCriteria] = useState('username');
  const [searchQuery, setSearchQuery] = useState('');

  const handleUnbanUser = (userId) => {
    setBannedUsers(bannedUsers.filter(user => user.id !== userId));
  };

  const handleSetUnbanTime = (userId, time) => {
    setBannedUsers(bannedUsers.map(user => 
      user.id === userId ? { ...user, banUntil: time } : user
    ));
  };

  const filteredBannedUsers = bannedUsers.filter((user) =>
    user[searchCriteria].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Banned Users</h2>

      {/* Search Criteria Selector */}
      <div className="flex items-center space-x-4 mb-4">
        <select
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
          className="px-3 py-2 border border-gray-400 rounded-md"
        >
          <option value="id">Search by ID</option>
          <option value="username">Search by Username</option>
        </select>
        <div className="relative w-[45%]">
          <input
            type="text"
            placeholder={`Search by ${searchCriteria}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-md"
          />
          <button className="absolute right-2 top-2">
            <FaSearch className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* User Table */}
      <BanTable 
        users={filteredBannedUsers} 
        onUnbanUser={handleUnbanUser} 
        onSetUnbanTime={handleSetUnbanTime} 
      />
    </div>
  );
}

export default ManageBannedUser;
