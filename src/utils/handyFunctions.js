export const getFilter = (data, keyword) => {
  let array;
  if (keyword.includes("&")) array = keyword.split("&");
  else array = keyword.split(" ").join(",");

  console.log(array);
  return data?.filter((item) => {
    return Object.keys(item).some((key) => {
      let flag1, flag2;
      if (key !== "subTransactions") {
        flag1 = item[key].toString().toLowerCase().includes(keyword);
      }

      if (key === "subTransactions") {
        item[key].every((el) => {
          flag2 = Object.keys(el).some((key) =>
            el[key].toString().toLowerCase().includes(keyword)
          );
          if (flag2) {
            return false;
          }
          return true;
        });
      }

      return flag1 || flag2;
    });
  });
};
