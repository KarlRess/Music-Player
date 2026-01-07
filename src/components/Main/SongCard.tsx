import type { Song } from "../../data/song.ts";

const SongCard = ({ song }: { song: Song }) => {
  return (
    <div className="flex w-38 shrink-0 flex-col gap-2 overflow-hidden rounded-lg shadow-xl transition-shadow duration-300 hover:shadow-2xl">
      <div className="bg-surface-secondary flex h-38 w-38 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg">
        <img
          src={`/assets/song_pictures/${song.bigPict}.jpg`}
          alt={song.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col overflow-hidden px-1">
        <div className="text-md cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
          {song.name}
        </div>
        <div className="text-text-secondary cursor-pointer overflow-hidden text-xs text-ellipsis whitespace-nowrap">
          {song.artist.join(", ")}
        </div>
      </div>
    </div>
  );
};

export default SongCard;
