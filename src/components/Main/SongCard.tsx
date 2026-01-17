import type { Song } from "../../data/song.ts";
import { smallPauseIcon, smallPlayIcon } from "../assets.ts";
import { usePlayerContext } from "../../context/PlayerContext.tsx";

const SongCard = ({ song, index }: { song: Song; index: number }) => {
  const { isPlaying, track, selectSong, playPause } = usePlayerContext();
  const isSameSong = track === song;
  const isSameSongPlaying = isSameSong && isPlaying;

  return (
    <div className="hover:bg-surface-secondary group/song flex shrink-0 flex-col gap-2 overflow-hidden rounded-lg px-2 py-3 transition-colors duration-300">
      <div className="bg-surface-secondary flex-center relative h-38 w-38 shrink-0 cursor-pointer overflow-hidden rounded-lg">
        <img
          src={`/assets/song_pictures/${song.bigPict}.jpg`}
          alt={song.name}
          className="h-full w-full object-cover"
        />
        <div
          className="bg-layout flex-center absolute right-2.5 bottom-0 h-12 w-12 rounded-full opacity-0 shadow-md shadow-black/50 transition-all duration-300 group-hover/song:bottom-2.5 group-hover/song:opacity-100 hover:brightness-110"
          onClick={() => {
            if (isSameSong) {
              playPause();
            } else {
              selectSong(index);
            }
          }}
        >
          <img
            src={isSameSongPlaying ? smallPauseIcon : smallPlayIcon}
            alt={`play ${song.name}`}
          />
        </div>
      </div>
      <div className="flex w-38 flex-col overflow-hidden px-1">
        <div className="text-md cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
          {song.name}
        </div>
        <div className="text-text-secondary h-auto cursor-pointer flex-wrap text-xs">
          {song.artist.join(", ")}
        </div>
      </div>
    </div>
  );
};

export default SongCard;
