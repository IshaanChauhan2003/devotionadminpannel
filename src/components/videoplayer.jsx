import React from 'react';
import { useParams } from 'react-router-dom';
import ReactHlsPlayer from 'react-hls-player';

const VideoPlayer = () => {
  // Correct use of useParams to get the videoUrl
  const { videoUrl } = useParams();

  // Ensure the videoUrl is decoded properly
  const decodedUrl = decodeURIComponent(videoUrl);

  return (
    <div className='bg-gray-900'>
      <h1 className='font-bold text-white'>Playing Video</h1>
      <div style={{
        height: '100vh',
        width: '30%', display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
      }} >
        <ReactHlsPlayer
          src={decodedUrl}
          autoPlay={false}
          controls={true}
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }} // Ensures the video fills the height while maintaining aspect ratio
        />
      </div>
    </div>
  );
};

export default VideoPlayer;

