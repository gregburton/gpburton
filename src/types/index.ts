/******************* SPOTIFY TYPES *****************/
export type SpotifyTrack = {
  type: "track";
  name: string;
  duration_ms: number;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    release_date: string;
    total_tracks: number;
    images: Array<{ url: string }>;
  };
  track_number: number;
  external_urls: { spotify: string };
};

export type PlaybackResponse = {
  is_playing?: boolean;
  progress_ms?: number | null;
  item?: SpotifyTrack | { type?: string } | null;
};

export type CurrentlyPlayingResponse = {
  active: boolean;
  artistName: string;
  trackName: string;
  trackNumber: number;
  trackUrl: string;
  albumArtUrl: string;
  albumName: string;
  albumReleaseDate: string;
  albumTotalTracks: number;
  progressMs: number;
  durationMs: number;
  fetchedAt: number;
};
/**************************************************/

type Link = {
  external: boolean;
  url: string;
};

export type ToolProps = {
  image: string;
  altText: string;
  title: string;
  subtitle: string;
  url: string;
  category: string;
};

export type MobileNavProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type StackHighlightProps = {
  image: string;
  altText: string;
  url: string;
  description?: string;
  title?: string;
  subtitle?: string;
};

export type FeatureProps = {
  title: string;
  description: string;
  image?: string;
};

export type ProjectProps = {
  image: string;
  name: string;
  description: string;
  tools: ToolProps[];
  link?: Link;
};
export type TooltipProps = {
  id: string;
  text: string;
};
