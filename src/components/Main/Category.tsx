import SongCard from "./SongCard.tsx";
import type { Song } from "../../data/song.ts";

const Category = ({ category, song }: { category: string; song: Song[] }) => {
  return (
    <div className="flex cursor-pointer flex-col gap-3">
      <p className="text-xl font-semibold">{category}</p>

      <div className="flex w-full items-center gap-5 overflow-hidden pl-3">
        {/* Music Card */}
        {song.map((s) => (
          <SongCard key={s.id} song={s} />
        ))}
      </div>
    </div>
  );
};

export default Category;
