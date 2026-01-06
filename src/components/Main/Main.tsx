import { song } from "../../data/song.ts";
import Category from "./Category.tsx";

const category: string[] = ["Hip-Hop", "Pop", "Blues"];

const Main = () => {
  return (
    <main className="bg-surface flex flex-1 flex-col gap-8 overflow-y-auto rounded-t-[10px] pt-5 pb-5 pl-5">
      {category.map((item, index) => (
        <Category
          key={index}
          category={item}
          song={song.filter((s) => s.category === item)}
        />
      ))}
    </main>
  );
};

export default Main;
