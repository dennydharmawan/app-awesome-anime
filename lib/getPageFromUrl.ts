import axios from "axios";
import cheerio from "cheerio";

const getPageFromUrl = async <T>(
  url: string,
  options = {},
  fn: ($: cheerio.Root) => T
) => {
  const instance = axios.create({
    baseURL: process.env.GOGOANIME_BASE_URL,
  });

  const response = await instance(url, options);
  const $ = cheerio.load(response.data);

  const parsedResult = fn($);

  return parsedResult;
};

export default getPageFromUrl;
