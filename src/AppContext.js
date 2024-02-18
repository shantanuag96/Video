import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([
    { id: 1, title: 'Video 1', source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
    { id: 2, title: 'Video 2', source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    
  ]);

  const [selectedVideo, setSelectedVideo] = useState(playlist[0]);

  const addVideo = (newVideoLink) => {
    if (newVideoLink.trim() !== '') {
      const newVideo = {
        id: Date.now(),
        title: `Video ${playlist.length + 1}`,
        source: newVideoLink,
      };

      setPlaylist((prevPlaylist) => [...prevPlaylist, newVideo]);
    }
  };

  const removeVideo = (videoId) => {
    setPlaylist((prevPlaylist) => prevPlaylist.filter((video) => video.id !== videoId));
  };

  return (
    <AppContext.Provider value={{ playlist, selectedVideo, addVideo, removeVideo, setSelectedVideo }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
