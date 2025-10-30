// src/components/AudioPlayer.jsx
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { togglePlay, playNext, playPrev } from "../redux/playerSlice";

export default function AudioPlayer() {
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };
    const onMeta = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  const handleEnded = () => dispatch(playNext());
  const handleProgressChange = (e) => {
    const value = Number(e.target.value);
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
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
  const handleNext = () => dispatch(playNext());
  const handlePrev = () => dispatch(playPrev());

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 md:ml-64 bg-[#0D0D0D] text-[#EAEAEA] border-t border-[#1a1a1a]/100 px-4 py-3 sm:px-3 sm:py-2 flex flex-row items-center gap-4 sm:gap-2 w-full z-50 text-sm sm:text-xs">
      {/* Left */}
      <div className="flex items-center gap-4 sm:gap-3 w-full sm:w-1/4 min-w-[180px] justify-center sm:justify-start">
        <img
          src={currentSong?.img || "/default.jpg"}
          alt="cover"
          className="w-20 h-20 sm:w-14 sm:h-14 rounded-lg object-cover shadow-md"
        />
        <div className="min-w-0 text-center sm:text-left">
          <h4 className="font-semibold text-base sm:text-sm truncate">
            {currentSong?.title || "No Song Selected"}
          </h4>
          <p className="text-sm sm:text-xs text-gray-400 truncate">
            {currentSong?.artist || "—"}
          </p>
        </div>
      </div>

      {/* Middle */}
      <div className="flex flex-col items-center w-full sm:w-1/3">
        <div className="flex items-center gap-8 sm:gap-5 mb-2 sm:mb-1">
          <button onClick={handlePrev} aria-label="Previous">
            <SkipBack className="w-8 h-8 sm:w-6 sm:h-6 hover:text-[#FF9E2E]" />
          </button>

          <button
            onClick={handleTogglePlay}
            className="p-4 sm:p-3 bg-[#FF9E2E] text-[#0D0D0D] rounded-full hover:scale-110 transition-all"
            aria-label="Play/Pause"
          >
            {isPlaying ? <Pause className="w-6 h-6 sm:w-5 sm:h-5" /> : <Play className="w-6 h-6 sm:w-5 sm:h-5" />}
          </button>

          <button onClick={handleNext} aria-label="Next">
            <SkipForward className="w-8 h-8 sm:w-6 sm:h-6 hover:text-[#FF9E2E]" />
          </button>
        </div>

        <div className="flex items-center gap-3 sm:gap-2 w-full">
          <span className="text-xs sm:text-[10px]">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleProgressChange}
            className="w-full accent-[#FF9E2E]"
          />
          <span className="text-xs sm:text-[10px]">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-2 w-full sm:w-1/5 justify-center sm:justify-end min-w-[180px]">
        <Volume2 className="text-[#FF9E2E] w-7 h-7 sm:w-5 sm:h-5" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-32 sm:w-24 accent-[#FF9E2E]"
        />
      </div>

      <audio ref={audioRef} onEnded={handleEnded} />
    </div>
  );
}
