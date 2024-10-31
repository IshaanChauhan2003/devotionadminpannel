import React from 'react';
import CustomButton from '../customitems/CustomButton';

const UserTable = ({ users, onUserSelect, onKycClick, showKyc }) => (
  <div>
    <table className="min-w-full border border-gray-300 mt-4">
      <thead>
        <tr className="bg-gray-300">
          <th className="border border-gray-100 px-4 py-2">Profile Pic</th>
          <th className="border border-gray-100 px-4 py-2">User ID</th>
          <th className="border border-gray-100 px-4 py-2">Username</th>
          <th className="border border-gray-100 px-4 py-2">Religion</th>
          <th className="border border-gray-100 px-4 py-2">Followers</th>
          <th className="border border-gray-100 px-4 py-2">Total Posts</th>
          <th className="border border-gray-100 px-4 py-2">Email/Phone No.</th>
          <th className="border border-gray-100 px-4 py-2">Address</th>
          <th className="border border-gray-100 px-4 py-2">Created At</th>
          {showKyc && (
            <>
              <th className="border border-gray-100 px-4 py-2">KYC</th>
              <th className="border border-gray-100 px-4 py-2">KYC Status</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-50 cursor-pointer">
            <td className="border border-gray-300 px-4 py-2">
              <img src={user.profilePic} alt="Profile" className="w-10 h-10 rounded-full" />
            </td>
            <td className="border border-gray-300 px-4 py-2">{user._id}</td>
            <td className="border border-gray-300 px-4 py-2">{user.username}</td>
            <td className="border border-gray-300 px-4 py-2">{user.religion}</td>
            <td className="border border-gray-300 px-4 py-2">{user.followers}</td>
            <td className="border border-gray-300 px-4 py-2">{user.totalPost}</td>
            <td className="border border-gray-300 px-4 py-2">{user.email || user.phone}</td>
            <td className="border border-gray-300 px-4 py-2">{user.address}</td>
            <td className="border border-gray-300 px-4 py-2">{user.createdAt}</td>
            {showKyc && (
              <>
                <td className="border border-gray-300 px-4 py-2">
                  <CustomButton label="KYC" onClick={() => onKycClick(user)} />
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.kycStatus}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTable;
