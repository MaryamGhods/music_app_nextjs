import React from "react";
import Link from "next/link";
import { useSelector } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/api';
import { SongCard, Loader, Error } from "../components";
import Head from "next/head";
import fs from 'fs/promises';
import path from 'path';

const TopSongs = (props) => {
  const {data} = props;
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (!data){
    return <Loader title="آهنگ ها در حال بارگزاری هستند. لطفا کمی صبر کنید!" />
  }
  return (
    <div>
      <Head>
        <title>دنیای موزیک|برترین آهنگ ها</title>
      </Head>
      <div className="w-full flex flex-col">
        <h1 className="text-xl font-bold text-white m-4">آهنگ های برتر</h1>
        <div className="flex flex-wrap md:justify-start justify-center items-center gap-4">
          {data.map( (song, i) => (
            <SongCard 
                key={i}
                i={i}
                song={song}
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
              /> 
            ))}
        </div>
      </div>
    </div>
  )
};

export default TopSongs;

export async function getStaticProps() {

  const filePath = path.join(process.cwd(),'public', 'db' , 'music_db.json')
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return{
    props: {
      data: data.results
    }
  }
}