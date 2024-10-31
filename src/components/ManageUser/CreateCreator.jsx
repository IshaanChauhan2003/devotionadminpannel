import React, { useState, useEffect } from 'react';
import CustomButton from '../customitems/CustomButton';
import UserTable from './UserTable';
import { FaSearch } from 'react-icons/fa'; // Import search icon

function CreateCreator() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    religion: '',
  });

  const [creators, setCreators] = useState([]);

  const [searchCriteria, setSearchCriteria] = useState('username');
  const [searchQuery, setSearchQuery] = useState('');
  const [showKycForm, setShowKycForm] = useState(false);
  const [currentKycUser, setCurrentKycUser] = useState(null);

  // State for KYC file uploads
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const handleKycClick = (user) => {
    setCurrentKycUser(user);
    setShowKycForm(true);
  };
  const fetchCreators = async () => {
    try {
      const response = await fetch('http://192.168.1.8:8000/api/admin/view/creators', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setCreators(data);
      console.log('Fetched data:', data);
    } catch (error) {
      console.log('Error fetching creators:', error);
    }
  };

  useEffect(() => {

    fetchCreators();
  }, []);


  const handlecreatecreator = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/create/creator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'username': form.username,
          'contact_number': form.phone,
          'email': form.email,
          'religion': form.religion
        })
      })
      if (response.ok) {
        console.log('creator created')
      } else {
        console.log('error creator not created')
      }

    } catch (error) {
      console.log('error', error)
    } finally {
      fetchCreators();
    }
  }

  const handleKycSubmit = (e) => {
    e.preventDefault();
    if (aadhaarFile && photoFile) {
      setCreators((prevCreators) =>
        prevCreators.map((creator) =>
          creator.id === currentKycUser.id ? { ...creator, kycStatus: 'Done' } : creator
        )
      );
      setShowKycForm(false);
    } else {
      alert('Please upload both Aadhaar and passport-sized photo.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCreator = {
      ...form,
      id: String(creators.length + 1),
      followers: 0,
      totalPosts: 0,
      address: 'New Address',
      createdAt: new Date().toISOString().split('T')[0],
      profilePic: 'https://via.placeholder.com/50',
    };
    setCreators([]);
    setForm({ username: '', email: '', phone: '', password: '' });
  };

  const filteredCreators = creators.filter((creator) =>
    creator[searchCriteria].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    console.log(`Searching for ${searchQuery} by ${searchCriteria}`);
  };

  return (
    <div className="mb-6">
      {/* KYC Form */}
      {showKycForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleKycSubmit} className="bg-white p-6 rounded-lg space-y-4 w-96">
            <h2 className="text-xl font-semibold">KYC Details for {currentKycUser.username}</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAadhaarFile(e.target.files[0])}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded-md"
            />
            <label className="text-sm text-gray-600">Upload Aadhaar Card</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files[0])}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded-md"
            />
            <label className="text-sm text-gray-600">Upload Passport Size Photo</label>
            <div className="flex justify-between">
              <CustomButton label="Submit KYC" type="submit" />
              <button type="button" onClick={() => setShowKycForm(false)} className="text-red-500 hover:underline">
                Close
              </button>
            </div>
          </form>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Create Creator</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-7/12">
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
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
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
          <option value="" disabled>Select Religion</option>
          <option value="Hinduism">Hinduism</option>
          <option value="Sikhism">Sikhism</option>
          <option value="Jainism">Jainism</option>
          <option value="Buddhism">Buddhism</option>
          <option value="Islam">Islam</option>
          <option value="Christianity">Christianity</option>
        </select>

        <CustomButton label="Create Creator" type="submit" className='border-2 border-black'
          onClick={handlecreatecreator} />
      </form>


      <div className="mt-6">
        <h3 className="text-lg font-semibold">List of Created Creators</h3>

        {/* Search Criteria Selector */}
        {!showKycForm && (
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
              <button
                onClick={handleSearch}
                className="absolute right-2 top-2"
              >
                <FaSearch className="text-gray-500 absolute right-0 top-1" />
              </button>
            </div>
          </div>
        )}
        <UserTable users={creators} onKycClick={handleKycClick} showKyc={true} />
      </div>
    </div>
  );
}

export default CreateCreator;
