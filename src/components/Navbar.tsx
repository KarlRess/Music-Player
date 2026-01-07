import { searchIcon, historyIcon, userPict } from "./assets.ts";

const Navbar = () => (
  <header className="bg-primary fixed top-0 right-0 left-0 z-10 flex h-16 items-center justify-between gap-3 px-4 py-3">
    {/* App Icon */}
    <div className="bg-layout h-full w-10">
      <div className="flex h-full w-full items-center justify-center">Icon</div>
    </div>

    {/* Search Bar */}
    <div className="bg-surface-secondary hover:border-layout border-surface-secondary flex h-full w-[30%] items-center overflow-hidden rounded-full border hover:border">
      <div className="flex h-full items-center justify-center px-4">
        <label htmlFor="search" className="cursor-pointer hover:opacity-75">
          <img src={searchIcon} alt="Search icon" />
        </label>
      </div>

      <input
        id="search"
        className="bg-surface-secondary h-full flex-1 items-center rounded-r-full focus:outline-none"
        placeholder="What do you want to hear?"
      />
    </div>

    {/* Right Section */}
    <div className="flex items-center justify-center gap-3">
      <div className="cursor-pointer hover:opacity-75">
        <img src={historyIcon} alt="History" />
      </div>

      <div className="flex h-full w-10 cursor-pointer items-center justify-center rounded-full p-1 transition-all duration-200 hover:p-0">
        <img
          src={userPict}
          alt="User Pict"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  </header>
);

export default Navbar;
