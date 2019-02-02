// Plain JS implementation of filter

const filter = (fn, list) => {
  let res = [];
  for (let i = 0; i < list.length; i++) {
    if (fn(list[i])) {
      res.push(list[i]);
    }
  }
};
