// Implementation of filter using reduce

const filter = (fn, list) =>
  list.reduce((acc, el) => {
    if (fn(el)) {
      return [...acc, el];
    }
    return acc;
  }, []);
