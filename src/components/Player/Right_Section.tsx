import { volumeIcon } from "./assets.ts";

const Right_Section = () => (
  <div className="flex h-full w-[19%] items-center justify-end gap-1 bg-[#1f1f1f] pr-2">
    {/* Volume Icon */}
    <div>
      <img src={volumeIcon} alt={"Volume button"} />
    </div>

    {/* Volume Bar */}
    <div className="h-1 w-22.5 overflow-hidden rounded-full">
      <div className="h-full w-full bg-[#808080]">
        <div className="h-full w-[75%] rounded-full bg-white"></div>
      </div>
    </div>
  </div>
);

export default Right_Section;
