import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import TopChartCard from "./TopChartCard";
import { useGetTopChartsQuery } from '../redux/services/api';
import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";

const TopPlay = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const topPlays = data?.results.slice(0, 5);

  return(
    <div className="md:w-[280px] w-full md:pt-4 pt-8 px-4 flex flex-col">
      <div className="flex flex-row my-4 justify-between">
        <h2 className="text-white text-lg">آهنگ های برتر</h2>
        <Link href={"/top-songs"}>
          <p className="text-gray-300 text-sm ">موارد بیشتر</p>
        </Link>
      </div>
      {topPlays?.map((song, i) => (
        <TopChartCard 
          key={i}
          i={i}
          song={song}
          data={data}
        />
        )
      )}
      <div className="flex flex-row my-4 justify-between">
        <h2 className="text-white text-lg">خواننده های برتر</h2>
        <Link href={"/top-artists"}>
          <p className="text-gray-300 text-sm ">موارد بیشتر</p>
        </Link>
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className="my-4"
      >
        {topPlays?.map((song, i) => (
          <SwiperSlide
            key={i}
            i={i}
            style={{ width: '25%', height: 'auto'}}
            className="shadow-lg rounded-full animate-slideright"
          >
            <Link href={`/artists/${song?.artist_info.fullName}`}>
              <Image src={song.artist_info.artist_image.cover.url} alt={song.artist_info.fullName} width={80} height={80} className="bg-white/10 rounded-full object-cover w-full h-full text-xs text-center items-center flex" />  
            </Link>
          </SwiperSlide>
        )
        )}
      </Swiper>
    </div>
)};

export default TopPlay;