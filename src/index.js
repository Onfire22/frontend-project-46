import parseData from './parsers.js';
import buildDiffTree from './buildTree.js';
import getFormat from './formatters/index.js';
import { getData, getExtName } from './utils.js';

const genDiff = (path1, path2, format = 'stylish') => {
  const extName1 = getExtName(path1);
  const extName2 = getExtName(path2);
  const data1 = getData(path1);
  const data2 = getData(path2);
  const content1 = parseData(extName1, data1);
  const content2 = parseData(extName2, data2);
  const tree = buildDiffTree(content1, content2);
  return getFormat(format, tree);
};

export default genDiff;
