import Left_Section from "./Left_Section.tsx";
import Middle_Section from "./Middle_Section.tsx";
import Right_Section from "./Right_Section.tsx";
import Progress_Bar from "./Progress_Bar.tsx";

const Player = () => {
  return (
    <footer className="fixed bottom-0 z-10 w-full flex-col">
      <Progress_Bar />

      <div className="bg-primary flex h-21 items-center justify-between px-4">
        <Left_Section />
        <Middle_Section />
        <Right_Section />
      </div>
    </footer>
  );
};

export default Player;
