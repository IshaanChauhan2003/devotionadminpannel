
import React, { useState } from 'react';
import { FaSearch, FaEllipsisV } from 'react-icons/fa';


const usersData = [
  {
    id: 1,
    username: 'ishaan_doe',
    profilePic: 'https://via.placeholder.com/100',
    followers: 150,
    totalPosts: 25,
    email: 'ishaan@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
    createdAt: '2023-01-15',
    videos: [
      { id: 'v1', title: 'First Video', thumbnail: 'https://via.placeholder.com/150', uploadedAt: '2023-01-16' },
      { id: 'v2', title: 'Second Video', thumbnail: 'https://via.placeholder.com/150', uploadedAt: '2023-01-20' },
    ],
  },
  {
    id: 2,
    username: 'chauhaan_smith',
    profilePic: 'https://via.placeholder.com/100',
    followers: 200,
    totalPosts: 30,
    email: 'chauhaan@example.com',
    phone: '098-765-4321',
    address: '456 Elm St, City, Country',
    createdAt: '2023-02-20',
    videos: [
      { id: 'v3', title: 'Third Video', thumbnail: 'https://via.placeholder.com/150', uploadedAt: '2023-02-21' },
    ],
  },
];

function ViewUser({ onUserSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('username');
  const [menuVisible, setMenuVisible] = useState({}); // Track visibility for each user's menu

  const filteredUsers = usersData.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.id.toString().includes(searchTerm)
  );
  const toggleMenu = (userId) => {
    setMenuVisible((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <div>
       <div className="flex items-center mb-4">
        {/* Dropdown to select search criteria */}
        <select
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
          className="px-3 py-2 border border-gray-400 rounded-md mr-2"
        >
          <option value="id">Search by ID</option>
          <option value="username">Search by Username</option>
        </select>

        {/* Search input with icon */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder={`Search by ${searchCriteria}`}
            className="w-full px-3 py-2 border border-gray-400 rounded-md pl-10" // Add padding for icon
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-300">
            <th className="border border-gray-100 px-4 py-2">Profile Pic</th>
            <th className="border border-gray-100 px-4 py-2">User ID</th>
            <th className="border border-gray-100 px-4 py-2">Username</th>
            <th className="border border-gray-100 px-4 py-2">Followers</th>
            <th className="border border-gray-100 px-4 py-2">Total Posts</th>
            <th className="border border-gray-100 px-4 py-2">Email/Phone No.</th>
            <th className="border border-gray-100 px-4 py-2">Address</th>
            <th className="border border-gray-100 px-4 py-2">Created At</th>
            <th className="border border-gray-100 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onUserSelect(user)}>
              <td className="border border-gray-300 px-4 py-2">
                <img src={user.profilePic} alt="Profile" className="w-10 h-10 rounded-full" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">{user.followers}</td>
              <td className="border border-gray-300 px-4 py-2">{user.totalPosts}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email || user.phone}</td>
              <td className="border border-gray-300 px-4 py-2">{user.address}</td>
              <td className="border border-gray-300 px-4 py-2">{user.createdAt}</td>
              <td className="border border-gray-300 px-4 py-2 relative">
                <FaEllipsisV
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click
                    toggleMenu(user.id);
                  }}
                  className="cursor-pointer"
                />
                
                {menuVisible[user.id] && (
                  <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-300 rounded shadow-lg z-10">
                    <button
                      onClick={() => console.log('Delete user:', user.id)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => console.log('Ban user:', user.id)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    >
                      Ban
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUser;