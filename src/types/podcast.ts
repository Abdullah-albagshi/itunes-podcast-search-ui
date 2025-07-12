export type Podcast = {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName?: string;
  feedUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  releaseDate?: string;
  country?: string;
  primaryGenreName?: string;
  trackViewUrl?: string;
}

export type Episode = {
  artistViewUrl?: string;
  episodeUrl?: string;
  episodeContentType?: string;
  episodeFileExtension?: string;
  episodeGuid?: string;
  episodeLength?: number;
  kind?: string;
  wrapperType?: string;
  shortDescription?: string;
  description?: string;
  trackTimeMillis?: number;
} & Podcast;