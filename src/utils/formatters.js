export const normalizeData = (arr) => {
  return arr.reduce((acc, item) => {
    return { ...acc, [item._id]: item };
  }, {});
};


export const denormalizeData = (obj) => {
  return Object.values(obj);
};


export const formatData = (obj) => {
  return Object.entries(obj);
};

export const currencyFormat = (num = 0) => {
  let format = /[$]/;
  if (format.test(num)) {
    num = num.replace("$", "");
  }
  num = parseFloat(num).toFixed(2);
  let str = num.toString().split(".");
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  let result = str.join(".");
  result = `$ ${result}`;
  return result;
};

export const sortData = (arr) => {
  return arr.sort((a, b) => {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA > nameB) {
      return 1
    } else if (nameA < nameB) {
      return -1;
    }
    return arr;
  })
}