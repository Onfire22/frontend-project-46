import parseData from './dataParse.js';

const genDiff = (path1, path2) => {
  const file1 = parseData(path1);
  const file2 = parseData(path2);
  return [file1, file2];
};

export default genDiff;
