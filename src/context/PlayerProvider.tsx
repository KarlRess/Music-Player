import { PlayerContext, type Time } from "./PlayerContext.tsx";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { type Song, song } from "../data/song.ts";
import * as React from "react";

const PlayerProvider = (props: PropsWithChildren) => {
  // ==================== REFS ====================
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const seekContainerRef = useRef<HTMLDivElement | null>(null);
  const seekBarRef = useRef<HTMLDivElement | null>(null);
  const volumeContainerRef = useRef<HTMLDivElement | null>(null);
  const volumeBarRef = useRef<HTMLDivElement | null>(null);

  // ==================== STATE ====================
  const [songIndex, setSongIndex] = useState<number>(5);
  const [prevSongs, setPrevSongs] = useState<number[]>([]);
  const [nextSongs, setNextSongs] = useState<number[]>([]);
  const track: Song = song[songIndex];
  const [volume, setVolume] = useState<number>(0.7);

  // Player states
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isMuted, setIsMute] = useState<boolean>(false);

  // Seeking states
  const [isSeekingVolume, setIsSeekingVolume] = useState<boolean>(false);
  const [isSeekingSong, setIsSeekingSong] = useState<boolean>(false);

  // Time tracking
  const [time, setTime] = useState<Time>({
    currentTime: { sec: 0, min: 0 },
    totalTime: { sec: 0, min: 0 },
  });

  // ==================== PLAYBACK FUNCTIONS ====================
  const selectSong = (index: number): void => {
    setPrevSongs([]);
    setNextSongs([]);
    setSongIndex(index);
    setIsPlaying(true);
  };

  const playPause = (): void => setIsPlaying((prev) => !prev);

  const prev = (): void => {
    const audio = audioRef.current;
    if (!audio) return;

    // If current time <= 5 seconds, go to previous track
    if (audio.currentTime <= 5) {
      setNextSongs((prev) => [...prev, songIndex]);

      if (isShuffled && prevSongs.length > 0) {
        setPrevSongs((prev) => {
          const lastIndex = prev.at(-1)!;
          setSongIndex(lastIndex);

          return prev.slice(0, -1);
        });
      } else if (isShuffled) {
        audio.currentTime = 0;
      } else {
        setSongIndex((prev) => (prev + song.length - 1) % song.length);
      }
      setIsPlaying(true);
    } else {
      // If current time > 5 seconds, reset song duration to 0
      audio.currentTime = 0;
    }
  };

  const next = (): void => {
    setPrevSongs((prev) => [...prev, songIndex]);

    if (isShuffled && nextSongs.length > 0) {
      setNextSongs((prev) => {
        const lastIndex = prev.at(-1)!;
        setSongIndex(lastIndex);

        return prev.slice(0, -1);
      });
    } else if (isShuffled) {
      const randomNext = Math.min(Math.floor(Math.random() * 10), 5);
      setSongIndex((prev) => (prev + song.length + randomNext) % song.length);
    } else {
      setSongIndex((prev) => (prev + song.length + 1) % song.length);
    }
    setIsPlaying(true);
  };

  // ==================== SHUFFLE & LOOP FUNCTIONS ====================
  const shuffleToggle = (): void => {
    if (isLooping) {
      setIsLooping(false);
    }
    setIsShuffled((prev) => !prev);
    setPrevSongs([]);
    setNextSongs([]);
  };

  const loopToggle = (): void => {
    if (isShuffled) {
      setIsShuffled(false);
    }
    setIsLooping((prev) => !prev);
  };

  // ==================== VOLUME FUNCTIONS ====================
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

    // Auto-mute when volume is 0
    setIsMute(percent === 0);
    audio.volume = percent;
    setVolume(percent);
  };

  // ==================== SONG SEEKING FUNCTIONS ====================
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

  // ==================== EFFECTS ====================

  // Load and play selected track
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = `/assets/songs/${track.source}.mp3`;
    audio.load();
    audio.play();
  }, [track]);

  // Sync play/pause state with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Handle volume seeking (drag volume bar)
  useEffect(() => {
    if (!isSeekingVolume) return;

    window.addEventListener("mousemove", onSeekMoveVolume);
    window.addEventListener("mouseup", onSeekEndVolume);

    return () => {
      window.removeEventListener("mousemove", onSeekMoveVolume);
      window.removeEventListener("mouseup", onSeekEndVolume);
    };
  }, [isSeekingVolume]);

  // Update audio volume and volume bar
  useEffect(() => {
    const audio = audioRef.current;
    const bar = volumeBarRef.current;
    if (!audio || !bar) return;

    if (isMuted) {
      audio.volume = 0;
      bar.style.width = "0%";
    } else {
      audio.volume = Math.max(volume, 0.05);
      bar.style.width = `${Math.max(volume * 100, 5)}%`;
    }
  }, [isMuted, volume]);

  // Handle song seeking (drag progress bar)
  useEffect(() => {
    if (!isSeekingSong) return;

    window.addEventListener("mousemove", onSeekMoveSong);
    window.addEventListener("mouseup", onSeekEndSong);

    return () => {
      window.removeEventListener("mousemove", onSeekMoveSong);
      window.removeEventListener("mouseup", onSeekEndSong);
    };
  }, [isSeekingSong]);

  // Update progress bar and time display during playback
  useEffect(() => {
    const audio = audioRef.current;
    const seekBar = seekBarRef.current;
    if (!audio || !seekBar) return;

    const handleTimeUpdate = () => {
      const current = audio.currentTime;
      const duration = isNaN(audio.duration) ? 0 : audio.duration;

      // Only update bar if not actively seeking
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
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isSeekingSong]);

  // Update total duration when metadata is loaded
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

  // ==================== CONTEXT VALUE ====================
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
