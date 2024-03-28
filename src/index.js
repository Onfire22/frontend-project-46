import printDiffs from './flatDiff.js';
import parseData from './parsers.js';

const genDiff = (path1, path2) => {
  const file1 = parseData(path1);
  const file2 = parseData(path2);
  const diffs = printDiffs(file1, file2);
  return diffs;
};

export default genDiff;
