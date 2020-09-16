const toTitleCase = (title: string = 'Unknown Title') => {
  return title.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export default toTitleCase;
