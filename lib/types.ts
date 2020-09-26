export type VideoSource = {
  name: 'string';
  url: 'string';
  type: 'iframe';
};

export type SearchResult = {
  name: string;
  url: string;
};

export type AnimeInfo = {
  id: string;
  url: string;
  name: string;
  summary: string;
  genres: string[];
  released: string;
  type: string;
};

export type Episode = {
  name: string;
  url: string;
};

export type EpisodeVideoSources = {
  name: string;
  url: string;
  videoSources: VideoSource[];
};

export type MultiStreamUrl = {
  url: string;
};

export type EpisodeMultiStream = {
  name: string;
  url: string;
  multiStreamUrl: MultiStreamUrl;
};

export type EpisodeGroup = Record<
  number,
  { start: number; end: number }
> | null;
