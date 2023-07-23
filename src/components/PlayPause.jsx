import { FaPauseCircle, FaPlayCircle} from 'react-icons/fa';
         
const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => (
  (isPlaying && activeSong?.song_info.name === song.song_info.name ? (
    <FaPauseCircle 
      size={35}
      className="text-gray-300"
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle 
      size={35}
      className="text-gray-300"
      onClick={handlePlay}
    />
  ))
);

export default PlayPause;