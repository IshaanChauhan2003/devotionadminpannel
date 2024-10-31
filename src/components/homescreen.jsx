// import React, { useState } from 'react';

// const HomeScreen = ({isMonthly , setIsMonthly}) => {


//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <button
//           onClick={()=>{setIsMonthly(!isMonthly)}}
//           className="bg-blue-500 text-white px-4 py-2 rounded shadow"
//         >
//           {isMonthly ? 'Switch to Yearly' : 'Switch to Monthly'}
//         </button>
//       </div>

//       {/* Statistics Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-xl font-semibold">Total Users</h2>
//           <p className="text-3xl font-bold">1,234</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-xl font-semibold">Active Creators</h2>
//           <p className="text-3xl font-bold">456</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-xl font-semibold">New Users {isMonthly ? 'This Month' : 'This Year'}</h2>
//           <p className="text-3xl font-bold">{isMonthly ? '120' : '1,200'}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-xl font-semibold">New Creators {isMonthly ? 'This Month' : 'This Year'}</h2>
//           <p className="text-3xl font-bold">{isMonthly ? '30' : '400'}</p>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">All Posts</h2>
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 bg-gray-200 text-left">Username</th>
//               <th className="py-2 px-4 bg-gray-200 text-left">User ID</th>
//               <th className="py-2 px-4 bg-gray-200 text-left">Post</th>
//               <th className="py-2 px-4 bg-gray-200 text-left">Post ID</th>
//               <th className="py-2 px-4 bg-gray-200 text-left">Tags/Description</th>
//               <th className="py-2 px-4 bg-gray-200 text-left">Upload Time</th>
//               <th className="py-2 px-4 bg-gray-200 text-left">Location</th>
//               <th className="py-2 px-4 bg-gray-200 text-left">Likes</th>
//               <th className="py-2 px-4 bg-gray-200 text-left">Views</th>
//               <th className="py-2 px-4 bg-gray-200 text-left">Comments</th>
//               <th className="py-2 px-4 bg-gray-200 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="py-2 px-4 border-b">john_doe</td>
//               <td className="py-2 px-4 border-b">123</td>
//               <td className="py-2 px-4 border-b">Sample Post</td>
//               <td className="py-2 px-4 border-b">Post_001</td>
//               <td className="py-2 px-4 border-b">#fun #holiday</td>
//               <td className="py-2 px-4 border-b">2024-10-08 12:45 PM</td>
//               <td className="py-2 px-4 border-b">Mumbai</td>
//               <td className="py-2 px-4 border-b">500</td>
//               <td className="py-2 px-4 border-b">1000</td>
//               <td className="py-2 px-4 border-b">150</td>
//               <td className="py-2 px-4 border-b flex gap-2">
//                 <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
//                 <button className="bg-green-500 text-white px-3 py-1 rounded">Add to Explore</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default HomeScreen;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const HomeScreen = ({ isMonthly, setIsMonthly }) => {
  const [uploads, setUploads] = useState([]);
  const [religion, setReligion] = useState('true');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [statnumb,setstatnumb]=useState([])


  const stats=async()=>{
    try {
      const response = await fetch('http://192.168.1.8:8000/api/admin/view/stats',
        {
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
        }
      )
      const data=await response.json();
      console.log("numbers",data)
      setstatnumb(data)
    } catch (error) {
       console.log("error fetching stats ", error)
    }
  }

  const fetchUploads = async (page = 1, religionFilter = 'true') => {
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.1.8:8000/api/admin/view/alluploads?page=${page}&religion=${religionFilter}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setUploads(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching uploads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    stats();
    fetchUploads(page, religion);
  }, [page, religion]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUploads(page, religion);
    }, 30000); // 30 seconds interval

    return () => clearInterval(interval);
  }, [page, religion]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => { setIsMonthly(!isMonthly); }}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          {isMonthly ? 'Switch to Yearly' : 'Switch to Monthly'}
        </button>
      </div>


      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
       <div className="bg-white p-4 rounded shadow">
           <h2 className="text-xl font-semibold">Total Users</h2>
           <p className="text-3xl font-bold">{statnumb.totalCreators}</p>
         </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Active Creators</h2>
           <p className="text-3xl font-bold">{statnumb.creatorsWithPosts}</p>
         </div>
         <div className="bg-white p-4 rounded shadow">
           <h2 className="text-xl font-semibold">New Users {isMonthly ? 'This Month' : 'This Year'}</h2>
          <p className="text-3xl font-bold">{isMonthly ? '120' : '1,200'}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
           <h2 className="text-xl font-semibold">New Creators {isMonthly ? 'This Month' : 'This Year'}</h2>
           <p className="text-3xl font-bold">{isMonthly ? statnumb.creatorsJoinedThisMonth : '400'}</p>
         </div>
       </div>

      <div className="mb-6">
        <select
          value={religion}
          onChange={(e) => setReligion(e.target.value)}
          className="p-2 border rounded bg-white shadow"
        >
          <option value="All">All Religions</option>
          <option value="Hinduism">Hinduism</option>
          <option value="Sikhism">Sikhism</option>
          <option value="Jainism">Jainism</option>
          <option value="Buddhism">Buddhism</option>
          <option value="Islam">Islam</option>
          <option value="Christianity">Christianity</option>
        </select>
      </div>
      {/* Uploads Table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">All Posts</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200 text-left">Username</th>
                <th className="py-2 px-4 bg-gray-200 text-left">User ID</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Post</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Post ID</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Tags/Description</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Upload Time</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Location</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Likes</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Views</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Comments</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((post) => (
                <tr key={post.postId}>
                  <td className="py-2 px-4 border-b">{post.creatorUsername}</td>
                  <td className="py-2 px-4 border-b">{post.creatorId}</td>
                  <td className="py-2 px-4 border-b">
                    {console.log(post)}
                    <Link to={`/video/${encodeURIComponent(post.postUrl)}`}>
                  <img src={post.postUrl} alt="Video Thumbnail" className="cursor-pointer" width="100" />
                     
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b">{post.postId}</td>
                  <td className="py-2 px-4 border-b">{post.tagsOrDescription}</td>
                  <td className="py-2 px-4 border-b">{new Date(post.uploadTime).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">None</td>
                  <td className="py-2 px-4 border-b">{post.likesCount}</td>
                  <td className="py-2 px-4 border-b">{post.viewsCount}</td>
                  <td className="py-2 px-4 border-b">{post.commentsCount}</td>
                  <td className="py-2 px-4 border-b flex gap-2">
                    <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                    <button className="bg-green-500 text-white px-3 py-1 rounded">Add to Explore</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
