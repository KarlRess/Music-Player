import SongCard from "./SongCard.tsx";
import type { Song } from "../../data/song.ts";
import { useRef } from "react";
import { leftArrowIcon, rightArrowIcon } from "../assets.ts";

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
    <div className="group flex flex-col gap-1">
      <div className="flex items-center justify-between pr-2">
        <div className="pl-8 text-2xl font-semibold">{category}</div>

        {/* Carousel Button */}
        <div className="flex h-full items-center gap-3 p-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={() => handleScroll("left")}
            className="bg-surface-secondary flex-center h-8 w-8 cursor-pointer rounded-full pr-0.5 shadow-md shadow-black/20 hover:brightness-125"
          >
            <img src={leftArrowIcon} alt="previous slide" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="bg-surface-secondary flex-center h-8 w-8 cursor-pointer rounded-full pl-0.5 shadow-md shadow-black/20 hover:brightness-125"
          >
            <img src={rightArrowIcon} alt="next slide" />
          </button>
        </div>
      </div>

      <div className="flex items-start overflow-hidden pl-5" ref={track}>
        {/* Music Card */}
        {song.map((s) => (
          <SongCard key={s.id} song={s} />
        ))}
      </div>
    </div>
  );
};

export default Category;
