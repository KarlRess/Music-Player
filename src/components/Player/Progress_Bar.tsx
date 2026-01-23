import { usePlayerContext } from "../../context/PlayerContext.tsx";

const Progress_Bar = () => {
  const { seekContainerRef, seekBarRef, time, onSeekStartSong } =
    usePlayerContext();

  return (
    <div
      className="group absolute -top-4 flex h-8 w-full cursor-pointer items-center justify-center active:cursor-grabbing"
      ref={seekContainerRef}
      onMouseDown={onSeekStartSong}
    >
      <div className="h-0.5 w-full bg-[#b3b3b3] transition-all duration-100 group-hover:h-1">
        <div
          className="bg-layout relative flex h-full w-0.5 items-center"
          ref={seekBarRef}
        >
          <div className="bg-surface-secondary/50 pointer-events-none absolute -top-9 -right-6.5 rounded-full px-2.5 text-white opacity-0 transition-opacity duration-100 group-active:opacity-100">
            {time.currentTime.min}:
            {String(time.currentTime.sec).padStart(2, "0")}
          </div>
          <div className="bg-layout absolute -right-1.75 h-3.5 w-3.5 rounded-full opacity-0 group-hover:opacity-100"></div>
        </div>
      </div>
    </div>
  );
};

export default Progress_Bar;
