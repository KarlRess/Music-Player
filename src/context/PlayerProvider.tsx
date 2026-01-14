import { PlayerContext, type Time } from "./PlayerContext.tsx";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { type Song, song } from "../data/song.ts";

const PlayerProvider = (props: PropsWithChildren) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [songIndex, setSongIndex] = useState<number>(0);
  const track: Song = song[songIndex];

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);

  const [time, setTime] = useState<Time>({
    currentTime: { sec: 0, min: 0 },
    totalTime: { sec: 0, min: 0 },
  });

  const playPause = (): void => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const shuffleToggle = (): void => {
    if (isLooping) {
      setIsLooping(false);
    }
    setIsShuffled((prev) => !prev);
  };

  const loopToggle = (): void => {
    if (isShuffled) {
      setIsShuffled(false);
    }
    setIsLooping((prev) => !prev);
  };

  const prev = (): void => {
    setSongIndex((prev) => (prev + song.length - 1) % song.length);
    setIsPlaying(true);
  };

  const next = (): void => {
    if (isShuffled) {
      console.log("shuffle");
    } else {
      setSongIndex((prev) => (prev + song.length + 1) % song.length);
      setIsPlaying(true);
    }
  };

  // Update Track Source
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = `/assets/songs/${track.source}.mp3`;
    audio.load();

    if (isPlaying) {
      audio.play();
    }
  }, [track]);

  // Update Play and Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Update Current Time Song And Seek Bar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const current = audio.currentTime;
      const duration = isNaN(audio.duration) ? 0 : audio.duration;

      setTime({
        currentTime: {
          min: Math.floor(current / 60),
          sec: Math.floor(current % 60),
        },
        totalTime: {
          min: Math.floor(duration / 60),
          sec: Math.floor(duration % 60),
        },
      });
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  //Immediately Update Total Duration When Song Loaded
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoaded = () => {
      setTime((prev) => ({
        ...prev,
        totalTime: {
          min: Math.floor(audio.duration / 60),
          sec: Math.floor(audio.duration % 60),
        },
      }));
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
    return () => audio.removeEventListener("loadedmetadata", handleLoaded);
  }, []);

  const contextValue = {
    track,
    audioRef,
    isPlaying,
    isShuffled,
    isLooping,
    time,
    playPause,
    shuffleToggle,
    loopToggle,
    prev,
    next,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
