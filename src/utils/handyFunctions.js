let array = [];
const isSubset = (array1, array2) =>
  array2.every((element) => array1.includes(element));

export const getFilter = (data, keyword) => {
  if (keyword.includes(" ")) {
    array = keyword.toLowerCase().split(" ");
    return data?.filter((item) => {
      return isSubset(item.search, array);
    });
  }
  return data?.filter((item) => item.search.toString().includes(keyword));
};
