const MAGIC_NUMBER = 5;
export const selectFiveElements = (array: any[]) => {
  if (!array.length) return array;
  const shuffled = array.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, MAGIC_NUMBER);
  return selected;
};

export const removeDuplicates = (array: any[]) => {
  const map = new Map();
  return array.reduce((result, item) => {
    if (!map.has(item.id)) {
      map.set(item.id, true);
      result.push(item);
    }
    return result;
  }, []);
};

export const filterByType = (array: any[], type: string, value: string) => {
  return array.filter((item) => item[type] === value);
};
