import { useGetTopChartsQuery } from "../../redux/services/api";
import { SongCard } from "../../components";
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


const Search = () => {
  const router = useRouter();
  const searchTerm = router.query.search_term;

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  const arrayOfSearchTerm = searchTerm?.split(' ');
  const [foundedItems , setFoundedItems] = useState([]);

  useEffect(()=>{
    setFoundedItems([]);
    data?.results?.map((itemData) => {
      arrayOfSearchTerm.map( (word) => {
        if(
          (itemData.artist_info.fullName.search(word) > -1) ||
          (itemData.artist_info.type.search(word) > -1) ||
          (itemData.song_info.name.search(word) > -1) ||
          (itemData.song_info.type.search(word) > -1) )//end of if
          {
            setFoundedItems((prevV) => {
              if(!(itemData in prevV)){
                return [...prevV , itemData];
              }
              return [...prevV]
            })
          }  
      }) 
    })
	}, arrayOfSearchTerm);
  
  
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-lg font-bold text-white mx-4 my-8">نتایج جستجو</h1>
      <div className="flex flex-wrap md:justify-start justify-center items-center gap-4">
        {(foundedItems?.length !== 0) ?
          foundedItems.map( (song, i) => (
            <SongCard 
              key={i}
              i={i}
              song={song}
              data={data}
              isPlaying={isPlaying}
              activeSong={activeSong}
            /> 
          )) 
          : 
          <p className="text-gray-400 my-6">هیچ نتیجه ای یافت نشد! مجددا تلاش کنید.</p>
        }

    </div>
  </div>
  )
};

export default Search;