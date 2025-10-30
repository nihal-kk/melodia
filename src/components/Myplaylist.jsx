import React, { useState, useEffect } from "react";
import {Plus , Minus} from "lucide-react";

function PlusButton({ song }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Check if song is already liked
    fetch(`https://melodia-data-5.onrender.com/mylist?songId=${song.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setLiked(true);
      });
  }, [song.id]);

  const handleLike = async () => {
    if (liked) {
      // Remove from liked
      const res = await fetch(`https://melodia-data-5.onrender.com/mylist?songId=${song.id}`);
      const data = await res.json();
      if (data.length > 0) {
        await fetch(`https://melodia-data-5.onrender.com/mylist/${data[0].id}`, {
          method: "DELETE",
        });
      }
      setLiked(false);
    } else {
      // Add to liked
      await fetch("https://melodia-data-5.onrender.com/mylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          songId: song.id,
          title: song.title,
          artist: song.artist,
          img: song.img,
          audio: song.audio,
        }),
      });
      setLiked(true);
    }
  
  };

  return (
    <button onClick={handleLike} style={{ background: "none", border: "none" }}>
      {liked ? <Minus className="h-5 w-5 mr-15 text-[#696969]" fill='red' /> : <Plus className="h-5 w-5 mr-15 text-[#ffffff]" />}
    </button>
  );
}

export default PlusButton;
        