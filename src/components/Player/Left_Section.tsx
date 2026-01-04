import musicPicture from "../../assets/Music-Picture/21-savage-a-lot 1.svg";

const Left_Section = () => (
  <div className="flex h-full w-[19%] items-center gap-2 overflow-hidden">
    {/* Music Picture */}
    <div className="h-14 w-14 overflow-hidden rounded-md bg-gray-500 shadow-sm shadow-gray-500/50">
      <img src={musicPicture} alt={"Music Picture"} />
    </div>

    {/* Music Info */}
    <div className="flex flex-col justify-between">
      <div className="text-text-primary max-w-[26ch] overflow-hidden p-0 text-[14px]">
        a lot
      </div>
      <span className="text-text-secondary p-0 text-[12px]">21 Savage</span>
      <span className="text-text-secondary p-0 text-[10px]">2:24 / 4:48</span>
    </div>
  </div>
);

export default Left_Section;
