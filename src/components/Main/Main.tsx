import { song } from "../../data/song.ts";
import Category from "./Category.tsx";

const category: string[] = ["Hip-Hop", "Pop"];

const Main = () => {
  return (
    <main className="bg-surface flex h-full flex-1 flex-col gap-8 overflow-hidden rounded-[10px] pt-5 pl-5">
      {category.map((item, index) => (
        <Category key={index} category={item} song={song} />
      ))}
    </main>
  );
};

export default Main;
