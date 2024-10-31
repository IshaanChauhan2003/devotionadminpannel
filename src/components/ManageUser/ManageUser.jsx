import React, { useState } from 'react';
import ViewUser from './ViewUser';
import CreateCreator from './CreateCreator';
import CreateBot from './CreateBot';
import ManageBannedUser from './ManageBannedUser';
import CustomButton from '../customitems/CustomButton';

function ManageUser() {
  const [activeTab, setActiveTab] = useState('viewUser');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setActiveTab('viewUser'); // Change active tab to 'viewUser'
  };

  const handleBackToUserList = () => {
    setSelectedUser(null);
    setActiveTab('viewUser'); // Reset back to 'viewUser' tab
  };

  const handleRemoveVideo = (videoId) => {
    setSelectedUser((prev) => (prev ? {
      ...prev,
      videos: prev.videos.filter((video) => video.id !== videoId),
    } : null));
  };

  return (
    <div className="max-h-screen w-full max-w-full p-6 bg-white flex flex-col">
      <h1 className='text-2xl p-2 mb-2 font-semibold'>Manage Users</h1>
      <div className="flex items-start w-full gap-4 mb-6">
        <CustomButton 
          onClick={() => {
            setActiveTab('viewUser');
            setSelectedUser(null); // Reset selected user when clicking "View User"
          }} 
          label="View User" 
          className={activeTab === 'viewUser' ? 'bg-blue-500 text-white' : 'bg-gray-200'} // Set background based on active tab
        />
        <CustomButton 
          onClick={() => setActiveTab('createCreator')} 
          label="Create Creator" 
          className={activeTab === 'createCreator' ? 'bg-blue-500 text-white' : 'bg-gray-200'} // Set background based on active tab
        />
        <CustomButton 
          onClick={() => setActiveTab('createBot')} 
          label="Create Bot" 
          className={activeTab === 'createBot' ? 'bg-blue-500 text-white' : 'bg-gray-200'} // Set background based on active tab
        />
        <CustomButton 
          onClick={() => setActiveTab('manageBannedUser')} 
          label="Manage Banned User" 
          className={activeTab === 'manageBannedUser' ? 'bg-blue-500 text-white' : 'bg-gray-200'} // Set background based on active tab
        />
      </div>

      {activeTab === 'viewUser' && !selectedUser && (
        <ViewUser onUserSelect={handleUserSelect} />
      )}

      {activeTab === 'createCreator' && <CreateCreator />}
      {activeTab === 'createBot' && <CreateBot />}
      {activeTab === 'manageBannedUser' && <ManageBannedUser />}

      {/* Render user details and video table only in the ViewUser component */}
      {activeTab === 'viewUser' && selectedUser && (
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-4">User Details</h2>
          <div className="flex items-center mb-4">
            <img src={selectedUser.profilePic} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h3 className="text-lg">{selectedUser.username}</h3>
              <p>User ID: {selectedUser.id}</p>
              <p>Followers: {selectedUser.followers}</p>
              <p>Total Posts: {selectedUser.totalPosts}</p>
              <p>Email: {selectedUser.email}</p>
              <p>Phone: {selectedUser.phone}</p>
              <p>Address: {selectedUser.address}</p>
              <p>Created At: {selectedUser.createdAt}</p>
              <CustomButton onClick={handleBackToUserList} label="Back to User List" />
            </div>
          </div>

          {/* Videos Table */}
          <h2 className="text-lg font-semibold mb-4">Videos</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 border-b">
                <th className="py-2 px-4 border border-gray-300 text-left">Thumbnail</th>
                <th className="py-2 px-4 border border-gray-300 text-left">Video ID</th>
                <th className="py-2 px-4 border border-gray-300 text-left">Title</th>
                <th className="py-2 px-4 border border-gray-300 text-left">Uploaded At</th>
                <th className="py-2 px-4 border border-gray-300 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedUser.videos.map(video => (
                <tr key={video.id} className="border-b">
                  <td className="py-2 px-4 border border-gray-300">
                    <img src={video.thumbnail} alt="Thumbnail" className="w-20 h-20" />
                  </td>
                  <td className="py-2 px-4 border border-gray-300">{video.id}</td>
                  <td className="py-2 px-4 border border-gray-300">{video.title}</td>
                  <td className="py-2 px-4 border border-gray-300">{video.uploadedAt}</td>
                  <td className="py-2 px-4 border border-gray-300">
                    <CustomButton onClick={() => handleRemoveVideo(video.id)} label="Remove" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManageUser;
