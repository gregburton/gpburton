/******************* SPOTIFY TYPES *****************/
/***** ↓ Types for the data returned from the API ↓ *****/
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

export type PlaybackApiResponse = {
  is_playing?: boolean;
  progress_ms?: number | null;
  item?: SpotifyTrack | { type?: string } | null;
};

export type QueueApiResponse = {
  currently_playing?: SpotifyTrack | null;
  queue: SpotifyTrack[] | [];
};

export type HistoryApiResponse = {
  href: string;
  limit: number;
  next: string;
  cursors: {
    after: string;
    before: string;
  };
  total: number;
  items:
    | {
        track: SpotifyTrack;
        played_at: string;
        context: {
          type: string;
          href: string;
          external_urls: {
            spotify: string;
          };
          uri: string;
        };
      }[]
    | [];
};

/***** ↓ Types for the formatted data used on the client ↓ *****/

/** Contains information regarding the previously listened to songs */
export type PlaybackHistory = {
  /** A reason why the request failed */
  reason?: string;
  /** `Date.now()` value for when the endpoint was hit */
  fetchedAt: number;
  /** An array of songs and their information */
  history: {
    /** The song title */
    trackName: string;
    /**
     * The band's name. If there are multiple then they are joined
     * together in a comma separated string.
     */
    artistName: string;
    /** The album's name */
    albumName: string;
    /** A url for the album art */
    albumArtUrl: string;
    /** The link used to reach the song on Spotify */
    trackUrl: string;
  }[];
};

export type CurrentlyPlaying = {
  /** Is there a song currently playing? */
  active: boolean;
  /**
   * The band's name. If there are multiple then they are joined
   * together in a comma separated string.
   */
  artistName: string;
  /** The song title */
  trackName: string;
  /** The song's position in the album */
  trackNumber: number;
  /** The link used to reach the song on Spotify */
  trackUrl: string;
  /** A url for the album art */
  albumArtUrl: string;
  /** The album's name */
  albumName: string;
  /** The date the album was released - YYYY-MM-DD */
  albumReleaseDate: string;
  /** Total number of tracks in the album */
  albumTotalTracks: number;
  /** The length of the song in milliseconds */
  durationMs: number;
  /** The progress of the currently playing song when the endpoint was called */
  progressMs: number;
  /** `Date.now()` value for when the endpoint was hit */
  fetchedAt: number;
};

export type Queue = {
  /** A reason why the request failed */
  reason?: string;
  /** `Date.now()` value for when the endpoint was hit */
  fetchedAt: number;
  /** Is there a song currently playing? This has to be true for the queue to contain info */
  active: boolean;
  /** An array of songs and their information */
  queue: {
    artistName: string;
    /** The song title */
    trackName: string;
    /** The song's position in the album */
    trackNumber: number;
    /** The link used to reach the song on Spotify */
    trackUrl: string;
    /** A url for the album art */
    albumArtUrl: string;
    /** The album's name */
    albumName: string;
    /** The date the album was released - YYYY-MM-DD */
    albumReleaseDate: string;
    /** Total number of tracks in the album */
    albumTotalTracks: number;
    /** The length of the song in milliseconds */
    durationMs: number;
  }[];
};

/**
 * This is a fallback type that will be put to use if Spotify
 * rate limits end up destroying the widget by calling 3 endpoints
 * (currently-playing, queue, history). Getting the currently playing
 * song worked fine using the /queue endpoint, but it doesn't return
 * a `progressMs` value that's needed for the `<ProgressBar />`.
 */
export type QueuedWithCurrentlyPlaying = {
  /** A reason why the request failed */
  reason?: string;
  /** `Date.now()` value for when the endpoint was hit */
  fetchedAt: number;
  /**
   * Information about the currently playing song. Will use fallback
   * blank values if no song is being played.
   */
  currently_playing: {
    /** Is there a song currently playing? */
    active: boolean;
    /**
     * The band's name. If there are multiple then they are joined
     * together in a comma separated string.
     */
    artistName: string;
    /** The song title */
    trackName: string;
    /** The song's position in the album */
    trackNumber: number;
    /** The link used to reach the song on Spotify */
    trackUrl: string;
    /** A url for the album art */
    albumArtUrl: string;
    /** The album's name */
    albumName: string;
    /** The date the album was released - YYYY-MM-DD */
    albumReleaseDate: string;
    /** Total number of tracks in the album */
    albumTotalTracks: number;
    /** The length of the song in milliseconds */
    durationMs: number;
  };
  /** An array of songs and their information */
  queue: {
    artistName: string;
    /** The song title */
    trackName: string;
    /** The song's position in the album */
    trackNumber: number;
    /** The link used to reach the song on Spotify */
    trackUrl: string;
    /** A url for the album art */
    albumArtUrl: string;
    /** The album's name */
    albumName: string;
    /** The date the album was released - YYYY-MM-DD */
    albumReleaseDate: string;
    /** Total number of tracks in the album */
    albumTotalTracks: number;
    /** The length of the song in milliseconds */
    durationMs: number;
  }[];
};

/**************************************************/

type Link = {
  external: boolean;
  url: string;
};

export type ClipCategory = "funny" | "bugs" | "highlights";

export type Clip = {
  /** A stable identifier for React keys and linking to individual clips */
  id: string;
  /** The name of the clip */
  title: string;
  /** A short description about the clip */
  description?: string;
  /** The original Medal URL */
  medalUrl: string;
  /**
   * Don't assume every share URL can be used directly as an iframe source.
   * Medal has historically had differences between its redirect URLs and iframe embed URLs.
   */
  embedUrl?: string;
  /** Optional custom thumbnail */
  thumbnailUrl?: string;
  /** A broad classification for filtering. */
  category: ClipCategory;
  /** The game the clip came from */
  game: string;
  /** A way to provide more granular searchable metadata */
  tags: string[];
  /** Enables chronological sorting */
  createdAt: string;
  /** Should this clip be highlighted? */
  featured?: boolean;
};

export type ToolProps = {
  image: string;
  altText: string;
  title: string;
  subtitle: string;
  url: string;
  category: string;
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
  featured: boolean;
  tools: ToolProps[];
  link?: Link;
};
export type TooltipProps = {
  id: string;
  text: string;
};
