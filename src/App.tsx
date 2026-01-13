import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Main from "./components/Main/Main.tsx";
import Player from "./components/Player/Player.tsx";
import { usePlayerContext } from "./context/PlayerContext.tsx";

const App = () => {
  const { track, audioRef, isLooping } = usePlayerContext();

  return (
    <div className="flex h-screen flex-col">
      <Navbar />

      <div className="flex flex-1 justify-between gap-3 overflow-hidden px-4 pt-16 pb-21">
        <Sidebar />
        <Main />
      </div>

      <Player />
      <audio ref={audioRef} preload="auto" loop={isLooping}>
        <source src={`/assets/songs/${track.source}.mp3`} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default App;
