import { searchIcon, historyIcon, userPict } from "./assets.ts";

const Navbar = () => (
  <header className="bg-primary flex h-16 w-screen items-center justify-between gap-3 px-4 py-3">
    {/* App Icon */}
    <div className="bg-layout h-full w-10">
      <div className="flex h-full w-full items-center justify-center">Icon</div>
    </div>

    {/* Search Bar */}
    <div className="bg-surface-secondary flex h-full w-[30%] items-center overflow-hidden rounded-full">
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

      <div className="bg-surface flex h-full w-10 cursor-pointer items-center justify-center rounded-full shadow-sm shadow-gray-500">
        <img src={userPict} alt="User Pict" className="h-full w-full" />
      </div>
    </div>
  </header>
);

export default Navbar;
