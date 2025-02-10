export const getString = async (path, separator) => {
  try {
    const result = (await (await fetch(path)).text()).split(separator);
    return result;
  } catch (error) {
    console.error(error.message);
  }
};
