import Left_Section from "./Left_Section.tsx";
import Middle_Section from "./Middle_Section.tsx";
import Right_Section from "./Right_Section.tsx";

const Player = () => (
  <footer className="fixed bottom-0 z-10 flex h-21 w-full items-center justify-between bg-[#1f1f1f] px-4">
    <Left_Section />
    <Middle_Section />
    <Right_Section />
  </footer>
);

export default Player;
