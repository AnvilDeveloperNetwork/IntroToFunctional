// Plain JS implementation of map

const map = (fn, list) => {
  let res = [];
  for (let i = 0; i < list.length; i++) {
    res[i] = fn(list[i]);
  }
  return res;
};
