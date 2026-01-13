import { usePlayerContext } from "../../context/PlayerContext.tsx";
import { useRef, useEffect, useState } from "react";

const Left_Section = () => {
  const { track, time } = usePlayerContext();
  const nameRef = useRef<HTMLDivElement>(null);
  const artistRef = useRef<HTMLSpanElement>(null);
  const [nameOverflow, setNameOverflow] = useState(false);
  const [artistOverflow, setArtistOverflow] = useState(false);

  useEffect(() => {
    if (nameRef.current) {
      setNameOverflow(
        nameRef.current.scrollWidth > nameRef.current.clientWidth,
      );
    }
    if (artistRef.current) {
      setArtistOverflow(
        artistRef.current.scrollWidth > artistRef.current.clientWidth,
      );
    }
  }, [track.name, track.artist]);

  return (
    <div className="flex h-full w-[19%] items-center gap-2 overflow-hidden">
      {/* Music Picture */}
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-gray-500 shadow-xs shadow-gray-500/50">
        <img
          src={`/assets/song_pictures/${track.smallPict}.jpg`}
          alt={`${track.name} picture`}
        />
      </div>

      {/* Music Info */}
      <div className="flex flex-col justify-between">
        <div
          className="text-text-primary max-w-[26ch] overflow-hidden p-0 text-[14px] whitespace-nowrap"
          ref={nameRef}
          style={
            nameOverflow ? { animation: "scrollText 10s linear infinite" } : {}
          }
        >
          {track.name}
        </div>
        <span
          className="text-text-secondary p-0 text-[12px] whitespace-nowrap"
          ref={artistRef}
          style={
            artistOverflow
              ? { animation: "scrollText 10s linear infinite" }
              : {}
          }
        >
          {track.artist.join(", ")}
        </span>
        <span className="text-text-secondary p-0 text-[10px]">
          {time.currentTime.min}:{String(time.currentTime.sec).padStart(2, "0")}{" "}
          / {time.totalTime.min}:{String(time.totalTime.sec).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default Left_Section;
