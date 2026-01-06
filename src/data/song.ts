export interface Song {
  id: number;
  name: string;
  artist: string[];
  feat?: string;
  genre: string[];
  category: "Hip-Hop" | "Pop" | "Blues";
  source: string;
  bigPict: string;
  smallPict: string;
}

export const song: Song[] = [
  {
    id: 1,
    name: "a lot",
    artist: ["21 Savage", "J Cole"],
    genre: ["Alternative Hip-Hop/Rap"],
    category: "Hip-Hop",
    source: "song1",
    bigPict: "song1Big",
    smallPict: "song1Small",
  },
  {
    id: 2,
    name: "Jimmy Cooks",
    artist: ["Drake", "21 Savage"],
    genre: [
      "Trap music",
      "Dance/Electronic",
      "Nigerian Street Music",
      "New Age",
      "Natural sounds",
      "Afrobeats",
    ],
    category: "Hip-Hop",
    source: "song2",
    bigPict: "song2Big",
    smallPict: "song2Small",
  },
  {
    id: 3,
    name: "Rich Flex",
    artist: ["Drake", "21 Savage"],
    genre: ["Hip-Hop/Rap", "Trap"],
    category: "Hip-Hop",
    source: "song3",
    bigPict: "song3Big",
    smallPict: "song3Small",
  },
  {
    id: 4,
    name: "Like That",
    artist: ["Future", "Metro Boomin", "Kendrick Lamar"],
    genre: ["Trap music", "Hardcore hip hop"],
    category: "Hip-Hop",
    source: "song4",
    bigPict: "song4Big",
    smallPict: "song4Small",
  },
  {
    id: 5,
    name: "euphoria",
    artist: ["Kendrick Lamar"],
    genre: ["Trap music", "Rap music", "Hardcore hip hop", "Hip-Hop/Rap"],
    category: "Hip-Hop",
    source: "song5",
    bigPict: "song5Big",
    smallPict: "song5Small",
  },
];
