export const getMessages = (language = 'en') => {
  switch (language) {
    default:
      return require('./en.json');
  }
};
