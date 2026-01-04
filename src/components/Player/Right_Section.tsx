import { volumeIcon } from "./assets.ts";

const Right_Section = () => (
  <div className="bg-primary flex h-full w-[19%] items-center justify-end gap-1 pr-2">
    {/* Volume Icon */}
    <div className="cursor-pointer">
      <img src={volumeIcon} alt={"Volume button"} />
    </div>

    {/* Volume Bar */}
    <div className="h-1 w-22.5 cursor-pointer overflow-hidden rounded-full">
      <div className="bg-icon h-full w-full">
        <div className="h-full w-[75%] rounded-full bg-white"></div>
      </div>
    </div>
  </div>
);

export default Right_Section;
