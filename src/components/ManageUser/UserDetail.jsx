// UserDetail.js
import React, { useState } from 'react';

function UserDetail({ user }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOption, setFilterOption] = useState('latest');

    // Dummy data for videos uploaded by the user
    const videos = [
        {
            id: 1,
            title: 'Video 1',
            type: 'image', // 'video' or 'live'
            likes: 100,
            date: '2024-10-01',
        },
        {
            id: 2,
            title: 'Video 2',
            type: 'video',
            likes: 200,
            date: '2024-10-05',
        },
        // Add more dummy videos as needed
    ];

    // Filter videos based on search term
    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{user.username}'s Videos</h2>
            <img src={user.profilePic} alt="Profile" className="w-20 h-20 rounded-full mb-4" />

            <input
                type="text"
                placeholder="Search Videos"
                className="w-full px-3 py-2 border border-gray-400 rounded-md mb-4"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />

            <select
                className="mb-4 border border-gray-400 rounded-md"
                value={filterOption}
                onChange={e => setFilterOption(e.target.value)}
            >
                <option value="latest">Latest</option>
                <option value="likes">Most Likes</option>
                {/* Add more filter options if needed */}
            </select>

            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-300">
                        <th className="border border-gray-100 px-4 py-2">Title</th>
                        <th className="border border-gray-100 px-4 py-2">Type</th>
                        <th className="border border-gray-100 px-4 py-2">Likes</th>
                        <th className="border border-gray-100 px-4 py-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVideos.map(video => (
                        <tr key={video.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{video.title}</td>
                            <td className="border border-gray-300 px-4 py-2">{video.type}</td>
                            <td className="border border-gray-300 px-4 py-2">{video.likes}</td>
                            <td className="border border-gray-300 px-4 py-2">{video.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserDetail;
