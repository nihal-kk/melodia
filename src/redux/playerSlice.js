// src/redux/playerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null,
  isPlaying: false,
  playlist: [],
  currentIndex: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // payload: { song, index, playlist }
    playSong: (state, action) => {
      const { song, index = 0, playlist = [] } = action.payload || {};

      // if same song clicked -> toggle
      if (state.currentSong?.id === song?.id) {
        state.isPlaying = !state.isPlaying;
        return;
      }

      if (playlist && playlist.length > 0) state.playlist = playlist;
      state.currentSong = song ?? null;
      state.currentIndex = index ?? 0;
      state.isPlaying = !!song;
    },

    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },

    stopSong: (state) => {
      state.isPlaying = false;
      state.currentSong = null;
    },

    playNext: (state) => {
      if (!state.playlist || state.playlist.length === 0) return;
      const nextIndex = (state.currentIndex + 1) % state.playlist.length;
      state.currentIndex = nextIndex;
      state.currentSong = state.playlist[nextIndex];
      state.isPlaying = true;
    },

    playPrev: (state) => {
      if (!state.playlist || state.playlist.length === 0) return;
      const prevIndex =
        (state.currentIndex - 1 + state.playlist.length) %
        state.playlist.length;
      state.currentIndex = prevIndex;
      state.currentSong = state.playlist[prevIndex];
      state.isPlaying = true;
    },
  },
});

export const { playSong, togglePlay, stopSong, playNext, playPrev } =
  playerSlice.actions;
export default playerSlice.reducer;
