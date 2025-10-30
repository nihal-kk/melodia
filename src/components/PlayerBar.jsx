import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

export default function PlayerBar({ songs, currentIndex, setCurrentIndex }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentSong = songs[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const value = e.target.value;
    audio.currentTime = (value / 100) * audio.duration;
    setProgress(value);
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    const value = e.target.value;
    audio.volume = value;
    setVolume(value);
  };

  const playNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(false);
  };

  const playPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(false);
  };

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "0:00";
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) audioRef.current.play();
    }
  }, [currentIndex]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D] text-[#EAEAEA] border-t border-[#FF9E2E]/30 p-4 flex items-center justify-between gap-4 w-full z-50">
      {/* Left: Song Info */}
      <div className="flex items-center gap-3 w-1/4">
        <img
          src={currentSong.cover}
          alt="cover"
          className="w-14 h-14 rounded-lg object-cover shadow-md"
        />
        <div>
          <h4 className="font-semibold text-sm">{currentSong.title}</h4>
          <p className="text-xs text-gray-400">{currentSong.artist}</p>
        </div>
      </div>

      {/* Middle: Controls */}
      <div className="flex flex-col items-center w-1/2">
        <div className="flex items-center gap-5 mb-1">
          <button onClick={playPrev}>
            <SkipBack className="w-6 h-6 hover:text-[#FF9E2E]" />
          </button>
          <button
            onClick={togglePlay}
            className="p-3 bg-[#FF9E2E] text-[#0D0D0D] rounded-full hover:scale-110 transition-all"
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button onClick={playNext}>
            <SkipForward className="w-6 h-6 hover:text-[#FF9E2E]" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-[10px]">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full accent-[#FF9E2E]"
          />
          <span className="text-[10px]">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right: Volume */}
      <div className="flex items-center gap-2 w-1/4 justify-end">
        <Volume2 className="text-[#FF9E2E]" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 accent-[#FF9E2E]"
        />
      </div>

      <audio ref={audioRef} src={currentSong.url} />
    </div>
  );
}
