import React from "react";
import Link from "next/link";
import PlayPause from "./PlayPause";
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import Image from "next/image";

const TopChartCard = ({i, song, data}) => {
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  return(
    <div className="w-full flex flex-row items-center hover:bg-[#b05bcc7a] py-1 p-2 rounded-lg cursor-pointer mb-1">
      <span className="text-white font-semibold pl-2">{i+1}. </span>
      <Image src={song.song_info.song_image.cover.url} alt={song.song_info.name} width={56} height={56} className="bg-white/10 w-12 h-12 rounded-lg" />  
      <div className="flex-1 flex flex-col justify-center mx-3">
        <h4 className="text-white text-sm truncate">
          <Link href={`/songs/${song?.song_info.name}`}>
            {song.song_info.name}
          </Link>
        </h4>
        <p className="text-gray-400 text-xs truncate pt-1">
            <Link href={`/artists/${song?.artist_info.fullName}`}>
              {song.artist_info.fullName}
            </Link>
          </p>
      </div>
      <PlayPause 
        song={song}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  )
};

export default TopChartCard;