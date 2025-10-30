import React, { useState, useEffect } from "react";
import { Play, Pause, Heart } from "lucide-react";

function LikeButton({ song }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Check if song is already liked
    fetch(`https://melodia-data-5.onrender.com/liked?songId=${song.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setLiked(true);
      });
  }, [song.id]);

  const handleLike = async () => {
    if (liked) {
      // Remove from liked
      const res = await fetch(`https://melodia-data-5.onrender.com/liked?songId=${song.id}`);
      const data = await res.json();
      if (data.length > 0) {
        await fetch(`https://melodia-data-5.onrender.com/liked/${data[0].id}`, {
          method: "DELETE",
        });
      }
      setLiked(false);
    } else {
      // Add to liked
      await fetch("https://melodia-data-5.onrender.com/liked", {
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
    setTimeout(() => {
        
        window.location.reload();
    }, 5000);

  };

  return (
    <button onClick={handleLike} style={{ background: "none", border: "none" }}>
      {liked ? <Heart className="h-8 w-8 text-[#000000]" fill='red' /> : <Heart className="h-8 w-8 text-[#FF9E2E]" />}
    </button>
  );
}

export default LikeButton;
