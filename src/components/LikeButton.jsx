import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useSelector } from "react-redux"; // ✅ Import Redux selector

function LikeButton({ song }) {
  const [liked, setLiked] = useState(false);
  const { accentColor } = useSelector((state) => state.theme); // 🎨 Get global color from Redux

  useEffect(() => {
    // ✅ Check if song is already liked
    fetch(`https://melodia-data-5.onrender.com/liked?songId=${song.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setLiked(true);
      });
  }, [song.id]);

  const handleLike = async () => {
    if (liked) {
      // ❌ Remove from liked
      const res = await fetch(`https://melodia-data-5.onrender.com/liked?songId=${song.id}`);
      const data = await res.json();
      if (data.length > 0) {
        await fetch(`https://melodia-data-5.onrender.com/liked/${data[0].id}`, {
          method: "DELETE",
        });
      }
      setLiked(false);
    } else {
      // ❤️ Add to liked
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

    // Optional reload delay
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <button onClick={handleLike} >
      {liked ? (
        <Heart
          className="h-8 w-8"
          fill="red"
          style={{ color: "red" }} // 🔥 Dynamic accent color from Redux
        />
      ) : (
        <Heart
          className="h-8 w-8"
          style={{ color: accentColor }} // 🟡 Matches global yellow color
        />
      )}
    </button>
  );
}

export default LikeButton;
