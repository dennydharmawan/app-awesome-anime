import { NextApiRequest, NextApiResponse } from "next";

import { parseMultiStreamVideo } from "../../lib/animeScraper/html";
import getPageFromUrl from "../../lib/getPageFromUrl";
import { MultiStreamUrl } from "../../lib/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { url },
  } = req;

  const multiStreamUrl = await getPageFromUrl<MultiStreamUrl | null>(
    url as string,
    {},
    parseMultiStreamVideo
  );

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ data: multiStreamUrl }));
};

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
