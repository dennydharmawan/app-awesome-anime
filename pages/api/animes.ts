import axios from "axios";
import cheerio from "cheerio";
import { GraphQLNonNull } from "graphql";
import { NextApiRequest, NextApiResponse } from "next";

import {
  parseAnimePage,
  parseEpisodeListing,
  parseSearchResults
} from "../../lib/animeScraper/html";
import getPageFromUrl from "../../lib/getPageFromUrl";
import {
  AnimeInfo,
  Episode,
  EpisodeGroup,
  SearchResult
} from "../../lib/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { keyword, numberOfEpisodes },
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

    return;
  }

  let animeInfo: AnimeInfo | null = null;
  for (const searchResult of searchResults) {
    animeInfo = await getPageFromUrl<AnimeInfo>(
      searchResult.url,
      {},
      parseAnimePage
    );

    // blacklist types Special
    if (animeInfo.type !== 'Special') {
      break;
    }
  }

  // Grouping episodes
  // const episodePerPage = 100;
  // const episodeNumber = parseInt(numberOfEpisodes as string);
  // let episodeGroup: EpisodeGroup = {};
  // let i;
  // for (i = 0; i <= Math.ceil(episodeNumber / episodePerPage) - 1; i++) {
  //   episodeGroup[i] = {
  //     start: i * episodePerPage + 1,
  //     end: (i + 1) * episodePerPage,
  //   };
  // }

  console.log(`Parsing episodes anime id ${animeInfo!.id}`);

  const episodes = await getPageFromUrl<Episode[]>(
    '/load-list-episode',
    {
      params: {
        ep_start: 0,
        ep_end: 2000,
        id: animeInfo!.id,
      },
    },
    parseEpisodeListing
  );

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ data: episodes }));
};
