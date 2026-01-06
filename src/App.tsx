import { type JSX } from "react";

import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Main from "./components/Main/Main.tsx";
import Player from "./components/Player/Player.tsx";

const App = (): JSX.Element => (
  <div className="h-screen flex flex-col">
    <Navbar />

    <div className="flex flex-1 justify-between gap-3 px-4 pb-21">
      <Sidebar />
      <Main />
    </div>

    <Player />
  </div>
);

export default App;
