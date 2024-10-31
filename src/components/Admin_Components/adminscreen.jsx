import React, { useState } from 'react';
 
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import AdminButton from '../customitems/CustomButton';
import CustomAlert from '../customitems/CustomAlert';
import CustomPicker from '../customitems/CustomPicker';

function Adminscreen() {
  const [activeTab, setActiveTab] = useState('add'); 
  const [admins, setAdmins] = useState([]); 
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    retypePassword: '',
    role: '',
    showPassword: false,
    showRetypePassword: false,
    permissions: { HomeScreen: false, eCommerce: false, manageAdmin: false },
  });
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const togglePasswordVisibility = (field) => {
    setFormData((prev) => ({
      ...prev,
      [`show${field}`]: !prev[`show${field}`]
    }));
  };
  const handlePermissionChange = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission],
      },
    }));
  };
  const handleAddAdmin = () => {
    if (formData.password !== formData.retypePassword) {
      alert("Passwords do not match!");
      return;
    }
    setAdmins([...admins, { ...formData, id: Date.now() }]);
    setFormData({
      email: '',
      username: '',
      password: '',
      retypePassword: '',
      role: '',
      permissions: { HomeScreen: false, eCommerce: false, manageAdmin: false },
    });
  };
  const handleRemoveAdmin = (id) => {
    setAdmins(admins.filter(admin => admin.id !== id));
    setShowAlert(false);
    setSelectedAdmin(null);
  };

  const handleEditAdmin = (id) => {
    const adminToEdit = admins.find(admin => admin.id === id);
    setFormData(adminToEdit);
    setActiveTab('edit');
  };

  const confirmRemoveAdmin = (admin) => {
    setSelectedAdmin(admin);
    setShowAlert(true); 
  };

  return (
    <div className="h-screen w-full max-w-full   flex flex-col ">

      <h1 className='text-2xl mb-2 font-bold'>Admin Panel</h1>
      <div className="flex items-start w-full gap-4 mb-6">
        <AdminButton onClick={() => setActiveTab('add')} label="Add Admin" />
        <AdminButton onClick={() => setActiveTab('remove')} label="Remove Admin" />
        <AdminButton onClick={() => setActiveTab('edit')} label="Edit Admin" />
      </div>

      <div className="flex w-full flex-row md:flex-row gap-6">
      <div className="w-full md:w-[60%] flex flex-col p-4 border border-gray-800 rounded-lg bg-white shadow-lg mx-auto">
      {activeTab === 'add' && (
            <>
              <h2 className="text-xl mb-4 font-semibold">Add Admin</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleAddAdmin(); }}>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type={formData.showPassword ? 'text' : 'password'}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <span onClick={() => togglePasswordVisibility('Password')} className="absolute right-3 top-10 cursor-pointer">
                    {formData.showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </div>
                <div className="mb-4 relative">
                  <label className="block text-gray-700">Retype Password</label>
                  <input
                    type={formData.showRetypePassword ? 'text' : 'password'}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md"
                    value={formData.retypePassword}
                    onChange={(e) => setFormData({ ...formData, retypePassword: e.target.value })}
                    required
                  />
                  <span onClick={() => togglePasswordVisibility('RetypePassword')} className="absolute right-3 top-10 cursor-pointer">
                    {formData.showRetypePassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Role</label>
                  <CustomPicker
                    selectedValue={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                    options={['Admin', 'Moderator', 'User']} // Replace with your roles
                  />
                </div>
                {/* Permissions Section */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Permissions</label>
                  <div className="flex flex-col gap-2">
                    {Object.keys(formData.permissions).map((permission) => (
                      <label key={permission} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.permissions[permission]}
                          onChange={() => handlePermissionChange(permission)}
                          className="mr-2"
                        />
                        {permission}
                      </label>
                    ))}
                  </div>
                </div>
                <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700">Add Admin</button>
              </form>
            </>
          )}

          {activeTab === 'remove' && (
            <>
              <h2 className="text-xl mb-4 font-semibold">Remove Admin</h2>
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-300 ">
                    <th className="border border-gray-100 px-4 py-2">Username</th>
                    <th className="border border-gray-100 px-4 py-2">ID</th>
                    <th className="border border-gray-100 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map(admin => (
                    <tr key={admin.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{admin.username}</td>
                      <td className="border border-gray-300 px-4 py-2">{admin.id}</td>
                      <td className="border border-gray-300 px-4 py-2 flex justify-between">
                        <button onClick={() => handleEditAdmin(admin.id)} className="text-blue-600 hover:text-blue-800">Edit</button>
                        <button onClick={() => confirmRemoveAdmin(admin)} className="text-red-600 hover:text-red-800">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

{activeTab === 'edit' && (
  <>
    <h2 className="text-xl mb-4 font-semibold">Edit Admin</h2>
    <form onSubmit={(e) => { e.preventDefault(); handleAddAdmin(); }}>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Permissions</label>
        <div className="flex flex-col gap-2">
          {Object.keys(formData.permissions).map((permission) => (
            <label key={permission} className="flex items-center">
              <span className="mr-2">{permission}</span>
              <input
                type="checkbox"
                checked={formData.permissions[permission]}
                onChange={() => handlePermissionChange(permission)}
                className="ml-auto"
              />
            </label>
          ))}
        </div>
      </div>
      
      <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700">Update Admin</button>
    </form>
  </>
)}

        </div>
        <div className="w-full md:w-[40%] p-4 flex flex-col items-start">
     <h2 className="text-xl mb-4">Statistics</h2>
          <div className="flex flex-col  gap-4 w-full">
            <div className="bg-white p-4 border border-gray-300 rounded shadow-md">
              <h3 className="text-lg font-semibold">Total Admins</h3>
              <p>{admins.length}</p>
            </div>
            <div className="bg-white p-4 border border-gray-300 rounded shadow-md">
              <h3 className="text-lg font-semibold">Total Roles</h3>
              <p>{/* You can calculate and display roles count here */}</p>
            </div>

          </div>
        </div>
      </div>

      {showAlert && (
        <CustomAlert
          title="Confirm Removal"
          message={`Are you sure you want to remove ${selectedAdmin?.username}?`}
          onConfirm={() => handleRemoveAdmin(selectedAdmin.id)}
          onCancel={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

export default Adminscreen;
