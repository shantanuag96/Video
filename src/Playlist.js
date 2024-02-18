import React, { useContext, useState } from 'react';
import { AppContext } from './AppContext';
import Video from './Video';

const Playlist = () => {
  const { playlist, addVideo, removeVideo, setSelectedVideo, selectedVideo } = useContext(AppContext);
  const [newVideoLink, setNewVideoLink] = useState('');

  const handleAddVideo = () => {
    addVideo(newVideoLink);
    setNewVideoLink('');
  };

  const handleRemoveVideo = (videoId) => {
    removeVideo(videoId);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleInputChange = (e) => {
    setNewVideoLink(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter video link"
        value={newVideoLink}
        onChange={handleInputChange}
      />
      <button onClick={handleAddVideo}>Add Video</button>

      <div>
        {Array.isArray(playlist) ? (
          playlist.map((video) => (
            <div key={video.id} onClick={() => handleVideoClick(video)}>
              <p>{video.title}</p>
              <p>{video.source}</p>
              <button onClick={() => handleRemoveVideo(video.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>Playlist is not an array.</p>
        )}
      </div>

      {selectedVideo && <Video url={selectedVideo.source} />}
    </div>
  );
};

export default Playlist;
