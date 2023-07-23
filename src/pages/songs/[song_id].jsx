import Link from "next/link";
import { SongCard, Error, Loader } from "../../components";
import Image from "next/image";
import fs from 'fs/promises';
import path from 'path';

const SongDetails = (props) => {

  const {song} = props;

  if (!song){
    return <Loader title="آهنگ ها در حال بارگزاری هستند. لطفا کمی صبر کنید!" />
  }

  return (
    <div>
      <div className="relative mt-5">
        <div className="bg-gradient-to-r from-transparent to-black sm:h-40 h-28" />
        <div className="absolute inset-0 flex items-center">
          <Image src={song.song_info.song_image.cover.url} alt={song.song_info.name} className="sm:w-40 w-28 sm:h-40 h-28 rounded-full object-cover border-2 shadow-xl shadow-black" width={120} height={120} />
            <div className="mr-6">
              <h4 className="text-white text-lg truncate">
                <Link href={`/songs/${song?.song_info.name}`}>
                  {song.song_info.name}
                </Link>
              </h4>
              <p className="text-gray-400 text-base truncate pt-2">
                <Link href={`/artists/${song?.artist_info.fullName}`}>
                  {song.artist_info.fullName}
                </Link>
              </p>
              <p className="text-gray-600 text-sm truncate pt-2">
                تعداد دانلود: 
                {' '}
                {song.song_info.sumSongsDownloadsCount}
              </p>
            </div>
        </div>
      </div>
      <p className='text-white my-8'>متن آهنگ</p>
    </div>

  )
};

export default SongDetails;

async function getData(){

  const filePath = path.join(process.cwd(),'public', 'db' , 'music_db.json')
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context){
  const {params} = context;
  const songName = params.song_id;
    
  const data = await getData();
  const song = data.results.find(item => item.song_info.name === songName);

  return {
    props: {
      song: song
    }
  }
}

export async function getStaticPaths(){

  const data = await getData();
  const ids = data.results.map(item => item.song_info.name );
  const pathsWithParams = ids.map(id => ({params: {song_id : id}}))
  return {
    paths: pathsWithParams,
    fallback: false,
  };
}