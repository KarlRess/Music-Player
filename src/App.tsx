import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Main from "./components/Main/Main.tsx";
import Player from "./components/Player/Player.tsx";

const App = () => (
  <div className="flex h-screen flex-col">
    <Navbar />

    <div className="flex flex-1 justify-between gap-3 overflow-hidden px-4 pt-16 pb-21">
      <Sidebar />
      <Main />
    </div>

    <Player />
  </div>
);

export default App;
