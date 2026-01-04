import { type JSX } from "react";

const Navbar = (): JSX.Element => (
  <header className="flex h-16 w-screen items-center justify-between gap-3 bg-[#1f1f1f] px-4 py-3">
    <div className="h-full w-10 bg-[#248DCE]">
      <div className="flex h-full w-full items-center justify-center">Icon</div>
    </div>

    <div className="flex h-full w-[30%] items-center overflow-hidden rounded-full bg-[#4c4c4c]">
      <div className="flex h-full w-[10%] items-center justify-center bg-[#248dce]">
        <div>icon</div>
      </div>

      <input
        className="h-full w-[90%] items-center rounded-r-full bg-[#4c4c4c] pl-2 focus:outline-none"
        placeholder="What do you want to hear?"
      />
    </div>

    <div className="flex h-full w-10 items-center justify-center rounded-full bg-[#248DCE]">
      <p>Icon</p>
    </div>
  </header>
);

export default Navbar;
