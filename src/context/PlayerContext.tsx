import { createContext, useContext, type RefObject } from "react";
import type { Song } from "../data/song.ts";
import * as React from "react";

export type Time = {
  currentTime: { sec: number; min: number };
  totalTime: { sec: number; min: number };
};

interface PlayerContextType {
  audioRef: RefObject<HTMLAudioElement | null>;
  seekContainerRef: RefObject<HTMLDivElement | null>;
  seekBarRef: RefObject<HTMLDivElement | null>;
  track: Song;
  isPlaying: boolean;
  isShuffled: boolean;
  isLooping: boolean;
  time: Time;
  playPause: () => void;
  shuffleToggle: () => void;
  loopToggle: () => void;
  prev: () => void;
  next: () => void;
  seekSong: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);

  if (!context)
    throw new Error("usePlayerContext must be used within PlayerProvider");

  return context;
};
