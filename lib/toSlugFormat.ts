import slugify from "slugify";

const toSlugFormat = (text: string) => {
  return slugify(text, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: 'en', // language code of the locale to use
  });
};

export default toSlugFormat;
