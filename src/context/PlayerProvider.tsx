import { PlayerContext } from "./PlayerContext.tsx";
import { type PropsWithChildren, useRef, useState } from "react";

const PlayerProvider = (props: PropsWithChildren) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playPause = (): void => {
    if (!isPlaying) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const contextValue = { audioRef, isPlaying, playPause };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
