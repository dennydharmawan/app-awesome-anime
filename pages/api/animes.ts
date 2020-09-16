import axios from "axios";
import cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";

import {
  parseAnimePage,
  parseEpisodeListing,
  parseSearchResults
} from "../../lib/animeScraper/html";
import getPageFromUrl from "../../lib/getPageFromUrl";
import { AnimeInfo, Episode, SearchResult } from "./types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { keyword },
  } = req;

  if (!keyword) {
    // return bad request
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end();
  }

  const searchResults = await getPageFromUrl<SearchResult[]>(
    '/search.html',
    {
      method: 'GET',
      params: {
        keyword,
      },
    },
    parseSearchResults
  );

  if (searchResults.length === 0) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ data: [] }));
  }

  const animeInfo = await getPageFromUrl<AnimeInfo>(
    searchResults[0].url,
    {},
    parseAnimePage
  );

  const episodes = await getPageFromUrl<Episode[]>(
    '/load-list-episode',
    {
      params: {
        ep_start: 0,
        ep_end: 2000,
        id: animeInfo.id,
      },
    },
    parseEpisodeListing
  );

  // const episodesWithVideoSources: EpisodeVideoSources[] = await pMap(
  //   episodes,
  //   async (episode: Episode, index: number) => {
  //     const videoSources = await getPageFromUrl<VideoSource[] | null>(
  //       episode.url,
  //       {},
  //       parseVideo
  //     );

  //     // remove empty url
  //     const filteredVideoSource = videoSources
  //       ? videoSources.filter((videoSource) => videoSource.url)
  //       : null;

  //     return {
  //       ...episode,
  //       videoSources: filteredVideoSource || [],
  //     };
  //   }
  // );

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ data: episodes }));
};
