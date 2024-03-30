import _ from 'lodash';
import {
  getValue,
  getStatus,
  getKey,
  getChildren,
} from './utils.js';
import buildDiffTree from './buildTree.js';

const convertToString = (value) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const entries = Object.entries(value);
  const result = entries.map(([key, val]) => `${key}: ${convertToString(val)}`);
  return result;
};

const stylish = (file1, file2) => {
  const tree = buildDiffTree(file1, file2);
  const iter = (node) => {
    const lines = node.map((item) => {
      const status = getStatus(item);
      switch (status) {
        case 'complex':
          return `${getKey(item)}: ${iter(getChildren(item))}`;
        case 'deleted':
          return `- ${getKey(item)}: ${convertToString(getValue(item))}`;
        case 'added':
          return `+ ${getKey(item)}: ${convertToString(getValue(item))}`;
        case 'changed':
          return `- ${getKey(item)}: ${convertToString(getValue(item))} \n + ${getKey(item)}: ${convertToString(file2[getKey(item)])}`;
        case 'unchanged':
          return ` ${getKey(item)}: ${convertToString(getValue(item))}`;
        default:
          return 'unknown';
      }
    });
    return lines.join('\n');
  };
  return iter(tree);
};

export default stylish;
