import React from "react";
import Link from "next/link";
import { useSelector } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/api';
import { ArtistCard , Loader , Error} from "../components";
import fs from 'fs/promises';
import path from 'path';
import Head from "next/head";

const TopArtists = (props) => {
  const {data} = props;

  // const { data, isFetching, error } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  if (!data){
    return <Loader title="موارد در حال بارگزاری هستند. لطفا کمی صبر کنید!" />
  }

  // if (isFetching){
  //   return <Loader title="موارد در حال بارگزاری هستند. لطفا کمی صبر کنید!" />
  // }
  // if (error){
  //   return <Error />
  // }
  return (
    <div>
      <Head>
        <title>دنیای موزیک|برترین خواننده ها</title>
      </Head>
      <div className="w-full flex flex-col">
        <h1 className="text-lg font-bold text-white m-4">خواننده های برتر</h1>
        <div className="flex flex-wrap md:justify-start justify-center items-center gap-4">
          {data?.map( (song, i) => (
            <ArtistCard 
                key={i}
                i={i}
                song={song}
                data={data}
              /> 
            ))}
        </div>
      </div>
    </div>
  )
};

export default TopArtists;

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