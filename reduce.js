// Plain JS implementation of reduce

const reduce = (fn, defaultAccumulator, list) => {
  let res = defaultAccumulator;
  for (let i = 0; i < list.length; i++) {
    res = fn(res, list[i]);
  }
  return res;
};
