import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { togglePlay, playNext, playPrev } from "../redux/playerSlice";

export default function AudioPlayer() {
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const { accentColor } = useSelector((state) => state.theme); // 🎨 get accent color
  const dispatch = useDispatch();

  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Handle song play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentSong?.audio) {
      if (audio.src !== new URL(currentSong.audio, window.location.href).href) {
        audio.src = currentSong.audio;
        audio.load();
      }
      isPlaying ? audio.play().catch(console.warn) : audio.pause();
    } else {
      audio.pause();
      audio.removeAttribute("src");
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
    }
  }, [currentSong, isPlaying]);

  // Track progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };
    const setMeta = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setMeta);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setMeta);
    };
  }, []);

  // Event handlers
  const handleEnded = () => dispatch(playNext());
  const handleProgressChange = (e) => {
    const value = Number(e.target.value);
    const audio = audioRef.current;
    if (!audio?.duration) return;
    audio.currentTime = (value / 100) * audio.duration;
    setProgress(value);
  };
  const handleVolumeChange = (e) => {
    const value = Number(e.target.value);
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value;
    setVolume(value);
  };
  const handleTogglePlay = () => {
    if (!currentSong) return alert("Select a song first 🎵");
    dispatch(togglePlay());
  };

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D] border-t border-[#1a1a1a] text-[#EAEAEA] z-50 px-3 py-3 sm:py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:ml-64">
      {/* Left - Song Info */}
      <div className="flex items-center gap-4 w-full sm:w-1/3 justify-center sm:justify-start">
        <img
          src={currentSong?.img || "/photos/cover.jpg"}
          alt="cover"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover shadow-md"
        />
        <div className="text-center sm:text-left">
          <h4 className="font-semibold text-sm truncate w-[140px] sm:w-[200px]">
            {currentSong?.title || "No Song Selected"}
          </h4>
          <p className="text-xs text-gray-400 truncate w-[140px] sm:w-[200px]">
            {currentSong?.artist || "—"}
          </p>
        </div>
      </div>

      {/* Middle - Controls */}
      <div className="flex flex-col items-center w-full sm:w-1/3">
        <div className="flex items-center gap-6 sm:gap-5 mb-2">
          <button onClick={() => dispatch(playPrev())} aria-label="Previous">
            <SkipBack
              className="w-5 h-5 sm:w-6 sm:h-6 transition"
              style={{ color: accentColor }}
            />
          </button>

          <button
            onClick={handleTogglePlay}
            className="p-3 sm:p-3 rounded-full hover:scale-110 transition-all"
            aria-label="Play/Pause"
            style={{
              backgroundColor: accentColor,
              color: "#0D0D0D",
            }}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          <button onClick={() => dispatch(playNext())} aria-label="Next">
            
            <SkipForward
              className="w-5 h-5 sm:w-6 sm:h-6 transition"
              style={{ color: accentColor }}
            />
          </button>
        </div>

        <div className="flex items-center gap-3 w-full px-2">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleProgressChange}
            className="w-full"
            style={{ accentColor }}
          />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right - Volume */}
      <div className="flex items-center gap-3 w-full sm:w-1/3 justify-center sm:justify-end">
        <Volume2 className="w-6 h-6" style={{ color: accentColor }} />
        <input
          type="range"
          min="0" 
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-28 sm:w-24"
          style={{ accentColor }}
        />
      </div>

      <audio ref={audioRef} onEnded={handleEnded} />
    </div>
  );
}
