import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageSwiper } from "../components/Move";
import TrendSlider from "../components/Trend";
import NewSlider from "../components/New";
import LikedSlider from "../components/Likedmove";
import All from "../components/All";
import Playlist from "../components/Plist";
import { playSong } from "../redux/playerSlice";

function Home() {
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);

   const handlePlay = (song, index) => {
    dispatch(playSong({ song, index, playlist: songs }));
  };

  return (
    <div className="flex-1 md:ml-64 min-h-screen bg-[#0D0D0D] text-white relative pb-24">
      <div className="p-6 space-y-12">
        <section>
          <ImageSwiper />
        </section>

        <section>
          <TrendSlider/>
          <NewSlider/>
          <LikedSlider/>
          <Playlist />
          <All
         
          />
        </section>
      </div>
    </div>
  );
}

export default Home;
