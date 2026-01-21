import { PlayerContext, type Time } from "./PlayerContext.tsx";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { type Song, song } from "../data/song.ts";
import * as React from "react";

const PlayerProvider = (props: PropsWithChildren) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const seekContainerRef = useRef<HTMLDivElement | null>(null);
  const seekBarRef = useRef<HTMLDivElement | null>(null);
  const volumeContainerRef = useRef<HTMLDivElement | null>(null);
  const volumeBarRef = useRef<HTMLDivElement | null>(null);

  const [songIndex, setSongIndex] = useState<number>(5);
  const track: Song = song[songIndex];
  const [volume, setVolume] = useState<number>(0.45);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isMuted, setIsMute] = useState<boolean>(false);
  const [isSeekingSong, setIsSeekingSong] = useState(false);

  const [time, setTime] = useState<Time>({
    currentTime: { sec: 0, min: 0 },
    totalTime: { sec: 0, min: 0 },
  });

  const selectSong = (index: number): void => {
    setSongIndex(index);
    setIsPlaying(true);
  };

  const playPause = (): void => setIsPlaying((prev) => !prev);

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

  const muteVolume = (): void => setIsMute((prev) => !prev);

  const seekVolume = (e: React.MouseEvent<HTMLDivElement>): void => {
    const container = volumeContainerRef.current;
    const audio = audioRef.current;
    if (!container || !audio) return;

    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.min(Math.max(clickX / rect.width, 0), 1);

    audio.volume = percent;
    setVolume(percent);
    setIsMute(false);
  };

  const onSeekStartSong = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSeekingSong(true);
    seekSong(e.clientX);
  };

  const onSeekMoveSong = (e: MouseEvent) => {
    if (!isSeekingSong) return;
    seekSong(e.clientX);
  };

  const onSeekEndSong = () => {
    setIsSeekingSong(false);
  };

  const seekSong = (clientX: number): void => {
    const container = seekContainerRef.current;
    const audio = audioRef.current;
    if (!audio || !container) return;

    const rect = container.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const percent = Math.min(Math.max(clickX / rect.width, 0), 1);

    audio.currentTime = percent * audio.duration;
  };

  // Update Track Source
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = `/assets/songs/${track.source}.mp3`;
    audio.load();

    audio.play();
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

  // Update Mute Volume and Volume progress bar
  useEffect(() => {
    const audio = audioRef.current;
    const bar = volumeBarRef.current;
    if (!audio || !bar) return;

    if (isMuted) {
      audio.volume = 0;
      bar.style.width = 0 + "%";
    } else {
      audio.volume = Math.max(volume, 0.05);
      bar.style.width = Math.max(volume * 100, 5) + "%";
    }
  }, [isMuted, volume]);

  // Drag seek song
  useEffect(() => {
    if (!isSeekingSong) return;
    window.addEventListener("mousemove", onSeekMoveSong);
    window.addEventListener("mouseup", onSeekEndSong);

    return () => {
      window.removeEventListener("mousemove", onSeekMoveSong);
      window.removeEventListener("mouseup", onSeekEndSong);
    };
  }, [isSeekingSong]);

  // Update Current Time Song And Seek Bar
  useEffect(() => {
    const audio = audioRef.current;
    const seekBar = seekBarRef.current;
    if (!audio || !seekBar) return;

    const handleTimeUpdate = () => {
      const current = audio.currentTime;
      const duration = isNaN(audio.duration) ? 0 : audio.duration;

      seekBar.style.width = `${(current / duration) * 100}%`;

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
    seekContainerRef,
    volumeContainerRef,
    volumeBarRef,
    seekBarRef,
    isPlaying,
    isShuffled,
    isLooping,
    isMuted,
    volume,
    time,
    selectSong,
    playPause,
    shuffleToggle,
    loopToggle,
    prev,
    next,
    seekVolume,
    muteVolume,
    onSeekStartSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
