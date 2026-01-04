import {
  nextIcon,
  pauseIcon,
  prevIcon,
  repeatIcon,
  shuffleIcon,
} from "./assets.ts";

const middle_section = () => (
  <div className="flex h-full flex-1 items-center justify-center gap-5">
    {/* Shuffle Button */}
    <div className="cursor-pointer hover:opacity-80">
      <img src={shuffleIcon} alt={"Shuffle button"} />
    </div>

    {/* Previous Button */}
    <div className="cursor-pointer hover:opacity-80">
      <img src={prevIcon} alt={"Previous button"} />
    </div>

    {/* Play/Pause Button */}
    <div className="w flex h-18 w-18 cursor-pointer items-center justify-center rounded-full bg-white hover:opacity-80">
      <img src={pauseIcon} alt={"Pause button"} />
    </div>

    {/* Next Button */}
    <div className="cursor-pointer hover:opacity-80">
      <img src={nextIcon} alt={"Next button"} />
    </div>

    {/* Repeat Button */}
    <div className="cursor-pointer hover:opacity-80">
      <img src={repeatIcon} alt={"Repeat button"} />
    </div>
  </div>
);

export default middle_section;
