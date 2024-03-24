import _ from 'lodash';
import { getValue, getStatus, getKey } from './utils.js';

const getSortedKeys = (file) => {
  const keys = Object.keys(file);
  const sorted = _.sortBy(keys);
  return sorted;
};

const getUniqKeys = (file1, file2) => {
  const keys = [...getSortedKeys(file1), ...getSortedKeys(file2)];
  return _.uniq(keys);
};

const buildDiffTree = (file1, file2) => {
  const keys = getUniqKeys(file1, file2);
  const tree = keys.map((item) => {
    const diffs = {};
    diffs.key = item;
    diffs.value = file1[item];
    if (Object.hasOwn(file1, item) && !file2[item]) {
      diffs.status = 'deleted';
    } else if (!file1[item] && Object.hasOwn(file2, item)) {
      diffs.value = file2[item];
      diffs.status = 'added';
    } else if (file2[item] && file1[item] !== file2[item]) {
      diffs.status = 'changed';
    } else {
      diffs.status = 'unchanged';
    }
    return diffs;
  });
  return tree;
};

const printDiffs = (file1, file2) => {
  const tree = buildDiffTree(file1, file2);
  const lines = tree.map((item) => {
    const status = getStatus(item);
    switch (status) {
      case 'deleted':
        return ` - ${getKey(item)}: ${getValue(item)}`;
      case 'added':
        return ` + ${getKey(item)}: ${getValue(item)}`;
      case 'unchanged':
        return `   ${getKey(item)}: ${getValue(item)}`;
      case 'changed':
        return ` - ${getKey(item)}: ${getValue(item)}\n + ${getKey(item)}: ${file2[getKey(item)]}`;
      default:
        return 'unknown data';
    }
  });
  const result = ['{', ...lines, '}'];
  return result.join('\n');
};

export default printDiffs;
