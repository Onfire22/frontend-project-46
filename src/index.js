import printDiffs from './flatDiff.js';
import parseData from './parsers.js';
import { buildDiffTree } from './flatDiff.js';

const genDiff = (path1, path2) => {
  const file1 = parseData(path1);
  const file2 = parseData(path2);
  const diffs = printDiffs(file1, file2);
  return JSON.stringify(buildDiffTree(file1, file2), null, 2);
};
console.log(genDiff('__fixtures__/complex1.json', '__fixtures__/complex2.json'))
export default genDiff;
