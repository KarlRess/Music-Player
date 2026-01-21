import { halfVolumeIcon, muteIcon, volumeIcon } from "./assets.ts";
import { usePlayerContext } from "../../context/PlayerContext.tsx";

const Right_Section = () => {
  const {
    isMuted,
    volumeContainerRef,
    volumeBarRef,
    volume,
    seekVolume,
    muteVolume,
  } = usePlayerContext();

  return (
    <div className="flex h-full w-[19%] items-center justify-end gap-1 pr-2">
      {/* Volume Icon */}
      <div
        className="flex-center h-5 cursor-pointer hover:brightness-125"
        onClick={muteVolume}
      >
        <img
          src={isMuted ? muteIcon : volume > 0.5 ? volumeIcon : halfVolumeIcon}
          alt={"Volume button"}
        />
      </div>

      {/* Volume Bar */}
      <div
        className="flex-center group/volume h-5 w-22.5 cursor-pointer overflow-hidden"
        ref={volumeContainerRef}
        onClick={seekVolume}
      >
        <div className="bg-icon h-1 w-full rounded-full">
          <div
            className="group-hover/volume:bg-layout relative flex h-full w-0.5 items-center rounded-full bg-white"
            ref={volumeBarRef}
          >
            <div className="absolute -right-1.5 h-3 w-3 rounded-full bg-white opacity-0 group-hover/volume:opacity-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Right_Section;
