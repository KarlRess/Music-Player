import { type JSX } from "react";

import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Main from "./components/Main.tsx";
import Player from "./components/Player/Player.tsx";

const App = (): JSX.Element => (
  <div className="flex h-screen w-full flex-col justify-between">
    <Navbar />

    <div className="flex w-full flex-1 justify-between gap-3 px-4">
      <Sidebar />
      <Main />
    </div>

    <Player />
  </div>
);

export default App;
