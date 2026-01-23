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
  const [volume, setVolume] = useState<number>(0.7);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isMuted, setIsMute] = useState<boolean>(false);
  const [isSeekingVolume, setIsSeekingVolume] = useState<boolean>(false);
  const [isSeekingSong, setIsSeekingSong] = useState<boolean>(false);

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

  const onSeekStartVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSeekingVolume(true);
    seekVolume(e.clientX);
  };

  const onSeekMoveVolume = (e: MouseEvent) => {
    if (!isSeekingVolume) return;
    seekVolume(e.clientX);
  };

  const onSeekEndVolume = () => {
    setIsSeekingVolume(false);
  };

  const seekVolume = (clientX: number): void => {
    const container = volumeContainerRef.current;
    const audio = audioRef.current;
    if (!container || !audio) return;

    const rect = container.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const percent = Math.min(Math.max(clickX / rect.width, 0), 1);

    if (percent === 0) {
      setIsMute(true);
    } else {
      setIsMute(false);
    }

    audio.volume = percent;
    setVolume(percent);
  };

  const calculateSeekPercent = (clientX: number): number => {
    const container = seekContainerRef.current;
    if (!container) return 0;

    const rect = container.getBoundingClientRect();
    const clickX = clientX - rect.left;
    return Math.min(Math.max(clickX / rect.width, 0), 1);
  };

  const updateSeekBar = (percent: number): void => {
    const bar = seekBarRef.current;
    const audio = audioRef.current;
    if (!bar || !audio) return;

    const currentTime = percent * audio.duration;
    const duration = audio.duration;

    bar.style.width = `${(currentTime / duration) * 100}%`;
    setTime({
      currentTime: {
        min: Math.floor(currentTime / 60),
        sec: Math.floor(currentTime % 60),
      },
      totalTime: {
        min: Math.floor(duration / 60),
        sec: Math.floor(duration % 60),
      },
    });
  };

  const onSeekStartSong = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSeekingSong(true);
    const percent = calculateSeekPercent(e.clientX);
    updateSeekBar(percent);
  };

  const onSeekMoveSong = (e: MouseEvent) => {
    if (!isSeekingSong) return;
    const percent = calculateSeekPercent(e.clientX);
    updateSeekBar(percent);
  };

  const onSeekEndSong = (e: MouseEvent) => {
    const audio = audioRef.current;
    if (!audio) return;

    const percent = calculateSeekPercent(e.clientX);
    audio.currentTime = percent * audio.duration;
    setIsSeekingSong(false);
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

  // Drag seek volume
  useEffect(() => {
    if (!isSeekingVolume) return;
    window.addEventListener("mousemove", onSeekMoveVolume);
    window.addEventListener("mouseup", onSeekEndVolume);

    return () => {
      window.removeEventListener("mousemove", onSeekMoveVolume);
      window.removeEventListener("mouseup", onSeekEndVolume);
    };
  }, [isSeekingVolume]);

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

      if (!isSeekingSong) {
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
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isSeekingSong]);

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
    muteVolume,
    onSeekStartVolume,
    onSeekStartSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
