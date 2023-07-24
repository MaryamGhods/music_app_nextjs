import { Sidebar, TopPlay, MusicPlayer, Searchbar } from '.'
import { useSelector } from 'react-redux';
import React, { PropsWithChildren } from "react";


function Layout({ children }){
  const { activeSong } = useSelector((state) => state.player);

  return(
    <div className="flex relative text-right h-full" style={{direction: 'rtl'}} >
      
    <Sidebar />
    <div className="flex flex-1 flex-col bg-gradient-to-br from-[#540a6d] to-black" >
      <div className="md:pr-6 px-2 h-[calc(100vh)] flex xl:flex-row flex-col-reverse overflow-y-scroll">
        <div className="flex-1 h-fit mb-8">
          <Searchbar />
            <div className='z-0'>
              {children}
            </div>
        </div>
        <div className="xl:sticky relative top-6 sm:top-0 h-fit left-0">
            <TopPlay />
        </div>
      </div>
    </div>

      {activeSong?.song_info?.name && (
        <div className="absolute h-28 sm:bottom-0 bottom-[140px] left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#431b50] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  )
}

export default Layout;