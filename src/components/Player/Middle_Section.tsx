import {
  shuffleIcon,
  activeShuffleIcon,
  prevIcon,
  pauseIcon,
  playIcon,
  nextIcon,
  repeatIcon,
  activeRepeatIcon,
} from "./assets.ts";
import { usePlayerContext } from "../../context/PlayerContext.tsx";

const Middle_Section = () => {
  const {
    isPlaying,
    isShuffled,
    isLooping,
    playPause,
    shuffleToggle,
    loopToggle,
    prev,
    next,
  } = usePlayerContext();

  const playButtonStyle =
    "flex h-14 w-14 cursor-pointer items-center justify-center pl-0.5 rounded-full bg-white hover:opacity-80";

  const pauseButtonStyle =
    "flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white hover:opacity-80";

  return (
    <div className="flex h-full flex-1 items-center justify-center gap-5 py-4">
      {/* Shuffle Button */}
      <div className="cursor-pointer hover:opacity-80" onClick={shuffleToggle}>
        <img
          src={isShuffled ? activeShuffleIcon : shuffleIcon}
          alt={"Shuffle button"}
        />
      </div>

      {/* Previous Button */}
      <div className="cursor-pointer hover:opacity-80" onClick={prev}>
        <img src={prevIcon} alt={"Previous button"} />
      </div>

      {/* Play/Pause Button */}
      <div
        className={isPlaying ? pauseButtonStyle : playButtonStyle}
        onClick={playPause}
      >
        <img
          src={isPlaying ? pauseIcon : playIcon}
          alt={isPlaying ? "Pause Button" : "Play Button"}
        />
      </div>

      {/* Next Button */}
      <div className="cursor-pointer hover:opacity-80" onClick={next}>
        <img src={nextIcon} alt={"Next button"} />
      </div>

      {/* Repeat Button */}
      <div className="cursor-pointer hover:opacity-80" onClick={loopToggle}>
        <img
          src={isLooping ? activeRepeatIcon : repeatIcon}
          alt={"Repeat button"}
        />
      </div>
    </div>
  );
};

export default Middle_Section;
