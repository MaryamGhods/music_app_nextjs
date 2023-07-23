import { useGetTopChartsQuery } from "../../redux/services/api";
import Link from "next/link";
import { SongCard, Error, Loader } from "../../components";
import { useSelector } from "react-redux";
import Image from "next/image";
import fs from 'fs/promises';
import path from 'path';

const ArtistDetails = (props) => {
  const {artistSongs} = props;
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (!artistSongs){
    return <Loader title="آهنگ ها در حال بارگزاری هستند. لطفا کمی صبر کنید!" />
  }
  return (
    <div>

      <div className="relative mt-5">
        <div className="bg-gradient-to-r from-transparent to-black sm:h-40 h-28" />
        <div className="absolute inset-0 flex items-center">
          <Image src={artistSongs[0].artist_info.artist_image.cover.url} alt={artistSongs[0].artist_info.fullName} className="sm:w-40 w-28 sm:h-40 h-28 rounded-full object-cover border-2 shadow-xl shadow-black" width={120} height={120} />
            <div className="mr-6">
              <p className="text-gray-400 text-xl truncate pt-2">
                <Link href={`/artists/${artistSongs[0].artist_info.fullName}`}>
                  {artistSongs[0].artist_info.fullName}
                </Link>
              </p>
            </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-center gap-4 mt-4">
          {artistSongs.map( (song, i) => (
            <SongCard 
              key={i}
              i={i}
              song={song}
              data={artistSongs}
              isPlaying={isPlaying}
              activeSong={activeSong}
            /> 
          ))}
      </div>
    </div>

  )
};

export default ArtistDetails;

async function getData(){

  const filePath = path.join(process.cwd(),'public', 'db' , 'music_db.json')
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context){
  const {params} = context;
  const artistName = params.artist_id;
  const data = await getData();

  const songs = data.results.filter( item => item.artist_info.fullName === artistName);
  return {
    props: {
      artistSongs: songs
    }
  }
}

export async function getStaticPaths(){

  const data = await getData();
  const ids = data.results.map(item => item.artist_info.fullName );
  const pathsWithParams = ids.map(id => ({params: {artist_id : id}}))
  return {
    paths: pathsWithParams,
    fallback: false,
  };
}