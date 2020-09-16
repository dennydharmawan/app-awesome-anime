import { NextApiRequest, NextApiResponse } from "next";

import { parseMultiStreamVideo, parseVideo } from "../../lib/animeScraper/html";
import getPageFromUrl from "../../lib/getPageFromUrl";
import { EpisodeMultiStream, MultiStreamUrl, VideoSource } from "./types";

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
