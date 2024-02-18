import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

function Video(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [url, setUrl] = useState('');
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const handle = useFullScreenHandle();

  useEffect(() => {
    setUrl(props.url);
  }, [props.url]);

  useEffect(() => {
    handlePlayPause();
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleSeek = (e) => {
    setCurrentTime(parseFloat(e.target.value));
    if (e.target.value && url) {
      setUrl((prevUrl) => {
        return prevUrl + (prevUrl.includes('?') ? '&' : '?') + `start=${e.target.value}`;
      });
    }
  };

  const handleSeekBackward = () => {
    setCurrentTime((prevTime) => Math.max(0, prevTime - 10)); // Seek back 10 seconds
  };

  const handleSeekForward = () => {
    setCurrentTime((prevTime) => Math.min(duration, prevTime + 10)); // Seek forward 10 seconds
  };

  const handleProgress = (state) => {
    setCurrentTime(state.playedSeconds);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const formatTime = (tSeconds) => {
    if (isNaN(tSeconds)) {
      return '00:00';
    }

    const minutes = Math.floor(tSeconds / 60);
    const seconds = Math.floor(tSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSpeedChange = (e) => {
    setPlaybackSpeed(parseFloat(e.target.value));
  };

  const handleEnded = () => {
    setPlaylistIndex((prevIndex) => (prevIndex + 1) % props.playlist.length);
    setUrl(props.playlist[playlistIndex].source);
    setIsPlaying(true);
  };

  return (
    <div>
      <FullScreen handle={handle}>
        <div>
          <ReactPlayer
            url={url}
            playing={isPlaying}
            controls={false}
            onPlay={handlePlayPause}
            onPause={handlePlayPause}
            onProgress={handleProgress}
            onDuration={handleDuration}
            playbackRate={playbackSpeed}
            onSeek={handleSeek}
            onEnded={handleEnded}
            autoPlay={true}
            width="100%"
            height="100%"
          />
        </div>
      </FullScreen>
      <button onClick={handle.enter}>Enter Fullscreen</button>
      
      <div>
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={handleSeekBackward}>Seek Backward</button>
        <button onClick={handleSeekForward}>Seek Forward</button>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
        />
        <span>{`${formatTime(currentTime)} / ${formatTime(duration)}`}</span>
        <label>
          Speed:
          <select value={playbackSpeed} onChange={handleSpeedChange}>
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default Video;
