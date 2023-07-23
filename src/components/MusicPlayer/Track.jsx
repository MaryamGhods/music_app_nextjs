import React from 'react';
import Image from 'next/image';
import { RiCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { playPause , setActiveSong } from "../../redux/features/playerSlice";

const Track = ({ isPlaying, isActive, activeSong }) => {
  const dispatch = useDispatch();

  const handleCloseBtn = () => {
    dispatch(playPause(false));
    dispatch(setActiveSong({   
      currentSongs: [],
      currentIndex: 0,
      isActive: false,
      isPlaying: false,
      activeSong: {},
      genreListId: '',  }));
  }

  return(
  <div className="flex-1 flex items-center justify-start">
    <div>
      <RiCloseLine className="w-8 h-8 text-white mr-2 cursor-pointer border-2 rounded-lg hover:bg-white/5" onClick={handleCloseBtn} /> 
    </div>
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mx-8`}>
      <Image src={activeSong?.song_info.song_image.cover.url} alt={activeSong?.song_info.name} className="rounded-full" width={64} hight={64} />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.song_info.name ? activeSong?.song_info.name  : 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {/* {activeSong?.artists ? activeSong?.artists : 'No active Song'} */}
      </p>
    </div>
  </div>
)};

export default Track;
