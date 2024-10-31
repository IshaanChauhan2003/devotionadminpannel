// src/components/ManageUser/BanTable.js
import React from 'react';
import CustomButton from '../customitems/CustomButton';

const BanTable = ({ users, onUnbanUser, onSetUnbanTime }) => (
  <table className="min-w-full border border-gray-300 mt-4">
    <thead>
      <tr className="bg-gray-300">
        <th className="border border-gray-100 px-4 py-2">Profile Pic</th>
        <th className="border border-gray-100 px-4 py-2">User ID</th>
        <th className="border border-gray-100 px-4 py-2">Username</th>
        <th className="border border-gray-100 px-4 py-2">Followers</th>
        <th className="border border-gray-100 px-4 py-2">Total Posts</th>
        <th className="border border-gray-100 px-4 py-2">Email</th>
        <th className="border border-gray-100 px-4 py-2">Created At</th>
        <th className="border border-gray-100 px-4 py-2">Unban Until</th>
        <th className="border border-gray-100 px-4 py-2">Action</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id} className="hover:bg-gray-50 cursor-pointer">
          <td className="border border-gray-300 px-4 py-2">
            <img src={user.profilePic} alt="Profile" className="w-10 h-10 rounded-full" />
          </td>
          <td className="border border-gray-300 px-4 py-2">{user.id}</td>
          <td className="border border-gray-300 px-4 py-2">{user.username}</td>
          <td className="border border-gray-300 px-4 py-2">{user.followers}</td>
          <td className="border border-gray-300 px-4 py-2">{user.totalPosts}</td>
          <td className="border border-gray-300 px-4 py-2">{user.email}</td>
          <td className="border border-gray-300 px-4 py-2">{user.createdAt}</td>
          <td className="border border-gray-300 px-4 py-2">
            <input
              type="date"
              className="border border-gray-400 rounded-md px-2"
              onChange={(e) => onSetUnbanTime(user.id, e.target.value)}
            />
          </td>
          <td className="border border-gray-300 px-4 py-2">
            <CustomButton label="Unban" onClick={() => onUnbanUser(user.id)} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default BanTable;
