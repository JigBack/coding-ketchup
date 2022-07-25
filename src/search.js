module.exports = (data, query) => {
  // write your code here

  const checkQueryPath = (data, queryPath) => {
    const [path, targetValue] = queryPath;
    const splitPath = path.split(".");
    const dataValue = splitPath.reduce(
      (prev, curr) => prev && prev[curr],
      data
    );
    return dataValue === targetValue;
  };

  const itemValid = (element, queryObject) => {
    const individualQueries = Object.entries(queryObject);

    const validElement = individualQueries.every((query) => {
      if (!checkQueryPath(element, query)) {
        return false;
      }

      return true;
    });

    return validElement;
  };

  return data.filter((item) => itemValid(item, query));
};
