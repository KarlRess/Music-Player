import SongCard from "./SongCard.tsx";
import type { Song } from "../../data/song.ts";
import { useRef } from "react";

const Category = ({ category, song }: { category: string; song: Song[] }) => {
  const track = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right"): void => {
    const el = track.current;
    if (!el) return;

    const scrollAmount = el.clientWidth;
    const delta = direction === "left" ? -scrollAmount : scrollAmount;

    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="group flex flex-col gap-3">
      <div className="flex items-center justify-between pr-2">
        <div className="text-xl font-semibold">{category}</div>

        {/* Carousel Button */}
        <div className="bg-layout flex h-full items-center gap-1 p-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <button
            onClick={() => handleScroll("left")}
            className="bg-surface-secondary flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
          >
            L
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="bg-surface-secondary flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
          >
            R
          </button>
        </div>
      </div>

      <div className="flex items-start overflow-hidden pl-3" ref={track}>
        {/* Music Card */}
        {song.map((s) => (
          <SongCard key={s.id} song={s} />
        ))}
      </div>
    </div>
  );
};

export default Category;
