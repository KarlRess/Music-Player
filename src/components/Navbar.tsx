import {type JSX} from "react";

const Navbar = (): JSX.Element => (
  <header className="h-16 bg-[#1f1f1f] w-screen flex justify-between items-center py-3 px-4 gap-3">
    <div className="h-full w-10 bg-[#248DCE]">
      <div className="h-full w-full flex justify-center items-center">
        Icon
      </div>
    </div>

    <div className="h-full w-[30%] bg-[#4c4c4c] flex items-center overflow-hidden rounded-full">
      <div className="h-full w-[10%] bg-[#248dce] flex justify-center items-center">
        <div>
          icon
        </div>
      </div>

      <input className="w-[90%] h-full bg-[#4c4c4c] pl-2 items-center rounded-r-full focus:outline-none"
             placeholder="What do you want to hear?"/>
    </div>

    <div className="h-full w-10 bg-[#248DCE] flex justify-center items-center rounded-full">
      <p>Icon</p>
    </div>
  </header>
)

export default Navbar;