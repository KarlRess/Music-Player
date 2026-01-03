import {type JSX} from "react";

import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Main from "./components/Main.tsx";

const App = (): JSX.Element => (
  <div className="h-screen w-full flex flex-col">
    <Navbar/>

    <div className="flex justify-between flex-1 w-full px-4 gap-3">
      <Sidebar/>
      <Main/>
    </div>
  </div>
)


export default App;
