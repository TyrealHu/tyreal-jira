export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  let result = { ...object };
  Object.keys(result).forEach((key) => {
    let value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });

  return result;
};
