import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Main from "./components/Main/Main.tsx";
import Player from "./components/Player/Player.tsx";
import { usePlayerContext } from "./context/PlayerContext.tsx";

const App = () => {
  const { audioRef, isLooping, next } = usePlayerContext();

  return (
    <div className="flex h-screen flex-col">
      <Navbar />

      <div className="flex flex-1 justify-between gap-3 overflow-hidden px-4 pt-16 pb-21">
        <Sidebar />
        <Main />
      </div>

      <Player />
      <audio
        ref={audioRef}
        preload="auto"
        loop={isLooping}
        onEnded={next}
      ></audio>
    </div>
  );
};

export default App;
