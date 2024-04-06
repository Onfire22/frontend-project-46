import parseData from './parsers.js';
import buildDiffTree from './buildTree.js';
import getFormat from './formatters/index.js';

const genDiff = (path1, path2, format = 'stylish') => {
  const content1 = parseData(path1);
  const content2 = parseData(path2);
  const tree = buildDiffTree(content1, content2);
  return getFormat(format, tree);
};

export default genDiff;
