// Implementation of map using reduce

const map = (fn, list) =>
  list.reduce((acc, el) => {
    return [...acc, fn(el)];
  }, []);
