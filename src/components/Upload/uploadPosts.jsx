import React, { useState } from 'react';
import CustomButton from '../customitems/CustomButton';

function UploadPost() {
    const [videouserId, setvideoUserId] = useState('');
    const [videoFile, setvideoFile] = useState([]);
    const [imageuserId, setimageUserId] = useState('');
    const [imageFile, setimageFile] = useState([]);
    const [audiouserId, setaudioUserId] = useState('');
    const [audioFile, setaudioFile] = useState([]);
    const [message, setMessage] = useState('');
    const [videoloading, setvideoLoading] = useState(false);
    const [imageloading, setimageLoading] = useState(false);
    const [audioloading, setaudioLoading] = useState(false);
    const [presignedUrl, setpresignedUrl]=useState('')
    let fileName=""

    const handleVideoChange = (e) => {
        setvideoFile(Array.from(e.target.files));
    };

    const handleImageChange = (e) => {
        setimageFile(Array.from(e.target.files));
    };

    const handleAudioChange = (e) => {
        setaudioFile(Array.from(e.target.files));
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!videouserId || videoFile.length === 0) {
            setMessage('Please enter a user ID and select at least one media file.');
            return;
        }

        setvideoLoading(true);
        setMessage('');

        try {
            // Use Promise.all to wait for all uploads to complete
            const uploadPromises = videoFile.map(async (video, index) => {
                const formData = new FormData();
                formData.append('id', videouserId);
                formData.append('video', video);

                const response = await fetch('http://192.168.1.8:8000/api/creators/upload/video', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(`Media ${index + 1} upload failed: ${data.error}`);
                }

                return `Video ${index + 1} uploaded successfully.`;
            });

            const results = await Promise.all(uploadPromises); // Wait for all uploads
            setMessage(results.join(' ')); // Display all messages
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setvideoLoading(false);
        }
    };


    const handleUploadimage = async (e) => {
        e.preventDefault();
    
        if (!imageuserId || imageFile.length === 0) {
            setMessage('Please enter a user ID and select at least one image file.');
            return;
        }
    
        setimageLoading(true);
        setMessage('');
    
        try {
            // Use Promise.all to wait for all uploads to complete
            const uploadPromises = imageFile.map(async (image, index) => {
                const fileType = image.type; // Get the image file type (e.g., image/jpeg)
                 fileName = `${imageuserId}_${Date.now()}_${image.name}`; 
    
                // Step 1: Request a presigned URL from the backend
                const presignedResponse = await fetch('http://192.168.1.8:8000/api/creators/presigned/url', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fileName: fileName,
                        fileType: fileType,
                        userId: imageuserId,
                    }),
                });
    
                const presignedData = await presignedResponse.json();
                console.log("url",presignedData)
    
                if (!presignedResponse.ok) {
                    throw new Error(`Presigned URL request failed: ${presignedData.message}`);
                }
    
                setpresignedUrl(presignedData.url)
                console.log('url presigned',presignedUrl)
                console.log('image type ---',fileType)
                // Step 2: Upload the image to S3 using the presigned URL
                const s3Response = await fetch(presignedUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': fileType,
                    },
                    body: image, // Send the image file
                });
                if (!s3Response.ok) {
                    throw new Error(`Image ${index + 1} upload failed.`);
                }
                return `Image ${index + 1} uploaded successfully.`;
            });
    
            const results = await Promise.all(uploadPromises); // Wait for all uploads
            setMessage(results.join(' ')); // Display all messages
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setimageLoading(false);
            try {
                const imageresponse=await fetch('http://192.168.1.8:8000/api/creators/upload/photo',
                    {
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            fileName:fileName,
                            url:presignedUrl,
                            caption:'image uploading for testing',
                            userId:imageuserId
                        })
                    }
                ) 
                if(imageresponse.ok){
                    console.log('saved in backend')
                }
                
            } catch (error) {
                console.log('error ',error)
            }
        }

    };
    


    const handleUploadaudio = async (e) => {
        e.preventDefault();

        if (!audiouserId || audioFile.length === 0) {
            setMessage('Please enter a user ID and select at least one media file.');
            return;
        }

        setaudioLoading(true);
        setMessage('');

        try {
            // Use Promise.all to wait for all uploads to complete
            const uploadPromises = audioFile.map(async (audio, index) => {
                const formData = new FormData();
                formData.append('id', audiouserId);
                formData.append('image', audio);

                const response = await fetch('http://192.168.1.8:8000/api/creators/upload/audio', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(`Media ${index + 1} upload failed: ${data.error}`);
                }

                return `Audio ${index + 1} uploaded successfully.`;
            });

            const results = await Promise.all(uploadPromises); // Wait for all uploads
            setMessage(results.join(' ')); // Display all messages
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setaudioLoading(false);
        }
    };

    return (
        <>
            <div className="mb-6*/9 flex gap-x-5">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
                    <form onSubmit={handleUpload} className="space-y-4 ">
                        <input
                            type="text"
                            placeholder="User ID"
                            value={videouserId}
                            onChange={(e) => setvideoUserId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded-md"
                            required
                        />
                        <input
                            type="file"
                            accept="video/*,.mkv" 
                            onChange={handleVideoChange}
                            multiple
                            className="w-full px-3 py-2 border border-gray-400 rounded-md"
                            required
                        />
                        <CustomButton label={videoloading ? 'Uploading...' : 'Upload Media'} type="submitvideo" disabled={videoloading} className="border-2" />
                    </form>

                </div>


                <div>
                    <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
                    <form onSubmit={handleUploadimage} className="space-y-4 ">
                        <input
                            type="text"
                            placeholder="User ID"
                            value={imageuserId}
                            onChange={(e) => setimageUserId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded-md"
                            required
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            multiple
                            className="w-full px-3 py-2 border border-gray-400 rounded-md"
                            required
                        />
                        <CustomButton label={imageloading ? 'Uploading...' : 'Upload Media'} type="submitimage" disabled={imageloading} className="border-2" />
                    </form>

                </div>



                <div>
                    <h2 className="text-xl font-semibold mb-4">Upload Audio</h2>
                    <form onSubmit={handleUploadaudio} className="space-y-4 ">
                        <input
                            type="text"
                            placeholder="User ID"
                            value={audiouserId}
                            onChange={(e) => setaudioUserId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded-md"
                            required
                        />
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleAudioChange}
                            multiple
                            className="w-full px-3 py-2 border border-gray-400 rounded-md"
                            required
                        />
                        <CustomButton label={audioloading ? 'Uploading...' : 'Upload Media'} type="submitaudio" disabled={audioloading} className="border-2" />
                    </form>

                </div>
            </div>
            <div className='mt-10 border-t-2 border-black'>
                <p className='p-5' >Processes Status {message && <p className=" text-red-500">{message}</p>}</p>
            </div>
        </>
    );
}

export default UploadPost;
