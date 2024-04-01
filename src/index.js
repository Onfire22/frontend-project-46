import parseData from './parsers.js';
import buildDiffTree from './buildTree.js';
import getFormat from './formatters/index.js';

const genDiff = (path1, path2, format = 'stylish') => {
  const file1 = parseData(path1);
  const file2 = parseData(path2);
  const tree = buildDiffTree(file1, file2);
  return getFormat(format, tree);
};

export default genDiff;
