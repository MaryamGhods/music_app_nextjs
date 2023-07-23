import React from "react";
import Link from "next/link";
import PlayPause from "./PlayPause";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import Image from "next/image";

const SongCard = ({song, i, isPlaying, activeSong, data}) => {

  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col sm:w-[200px] w-[46%] md:p-4 p-[2%] bg-white/5 bg-opacity-80 backdrop-blur-sm rounded-lg cursor-pointer">
      <div className="relative group">
        <div className={`absolute inset-0 justify-center items-center rounded-2xl bg-black bg-opacity-50 group-hover:flex ${activeSong?.song_info?.name === song?.song_info?.name ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause 
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <div className="sm:w-[168px] w-[100%] sm:h-[168px] h-[150px]">
          <Image src={song.song_info.song_image.cover.url} alt={song.song_info.name} className="bg-black/20 rounded-2xl w-full h-full" width={200} height={200} />
        </div>
      </div>
      <div className="flex flex-col pt-2 pr-2">
          <h4 className="text-white text-base truncate">
            <Link href={`/songs/${song?.song_info.name}`}>
              {song.song_info.name}
            </Link>
          </h4>
          <p className="text-gray-500 text-sm truncate pt-1">
            <Link href={`/artists/${song?.artist_info.fullName}`}>
              {song.artist_info.fullName}
            </Link>
          </p>
      </div>
    </div>
  )
};

export default SongCard;