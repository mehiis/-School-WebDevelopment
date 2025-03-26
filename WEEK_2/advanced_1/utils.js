const sortListAlphabeticly = (list) => {
  list.sort(function (a, b) {
    return a.name > b.name ? 1 : -1;
  });
};

export default {sortListAlphabeticly};
