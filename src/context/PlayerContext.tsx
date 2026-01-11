import { createContext, useContext, type RefObject } from "react";

interface PlayerContextType {
  audioRef: RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  playPause: () => void;
}

export const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);

  if (!context)
    throw new Error("usePlayerContext must be used within PlayerProvider");

  return context;
};
