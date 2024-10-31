// src/components/ManageUser/CreateBot.js
import React, { useState } from 'react';
import CustomButton from '../customitems/CustomButton';
import UserTable from './UserTable'; // Assuming UserTable can be reused
import { FaSearch } from 'react-icons/fa'; // Import search icon

function CreateBot() {
  const [form, setForm] = useState({
    profilePicture: null,
    username: '',
    discription: '',
    email: '',
    phone: '',
    religion:'',
    password: '',
  });

  const [bots, setBots] = useState([
    { id: '1', username: 'bot1', email: 'bot1@example.com', phone: '1234567890', followers: 100, totalPosts: 10, address: 'Address 1', createdAt: '2024-01-01', profilePic: 'https://via.placeholder.com/50' },
    { id: '2', username: 'bot2', email: 'bot2@example.com', phone: '0987654321', followers: 200, totalPosts: 20, address: 'Address 2', createdAt: '2024-01-02', profilePic: 'https://via.placeholder.com/50' },
  ]);

  const [searchCriteria, setSearchCriteria] = useState('username');
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBot = {
      ...form,
      id: String(bots.length + 1),
      followers: 0,
      totalPosts: 0,
      address: 'New Address',
      createdAt: new Date().toISOString().split('T')[0],
      profilePic: 'https://via.placeholder.com/50',
    };
    setBots([...bots, newBot]);
    setForm({ username: '', email: '', phone: '', password: '' });
  };

  const filteredBots = bots.filter((bot) =>
    bot[searchCriteria].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    console.log(`Searching for ${searchQuery} by ${searchCriteria}`);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Create Bot</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-7/12">
        <label className="text-sm text-gray-600">Upload Profile Picture</label>
        <input
          type="file"
          name="profilePicture"
          accept="image/*" 
          onChange={(e) => {
            const file = e.target.files[0]; 
            setForm({ ...form, profilePicture: file });
          }}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          required
        />
        <input
          type="text"
          name="discription"
          placeholder="discription"
          value={form.discription}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          required
        />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-400 rounded-md"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-400 rounded-md"
            required
          />
        <select
          name="religion"
          value={form.religion}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          required
        >
          <option value="" disabled>Select religion</option>
          <option value="Hinduism">Hinduism</option>
          <option value="Sikhism">Sikhism</option>
          <option value="Jainism">Jainism</option>
          <option value="Buddhism">Buddhism</option>
          <option value="Islam">Islam</option>
          <option value="Christianity">Christianity</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          required
        />
        <CustomButton label="Create Bot" type="submit" className='border-2 border-black'/>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">List of Created Bots</h3>

        {/* Search Criteria Selector */}
        <div className="flex items-center space-x-4 mt-4">
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
            <button onClick={handleSearch} className="absolute right-2 top-2">
              <FaSearch className="text-gray-500 absolute right-0 top-1" />
            </button>
          </div>
        </div>

        {/* User Table */}
        <UserTable users={filteredBots} showKyc={false} />
      </div>
    </div>
  );
}

export default CreateBot;
