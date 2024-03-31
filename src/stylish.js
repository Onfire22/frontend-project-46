import _ from 'lodash';
import {
  getValue,
  getStatus,
  getKey,
  getChildren,
} from './utils.js';
import buildDiffTree from './buildTree.js';

const makeSpaces = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);

const convertToString = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const entries = Object.entries(value);
  const result = entries.map(([key, val]) => `${makeSpaces(depth + 1)}  ${key}: ${convertToString(val, depth + 1)}`);
  return `{\n${result.join('\n')}\n  ${makeSpaces(depth)}}`;
};

const stylish = (file1, file2) => {
  const tree = buildDiffTree(file1, file2);
  const iter = (node, depth = 1) => {
    const lines = node.map((item) => {
      const status = getStatus(item);
      const space = makeSpaces(depth);
      switch (status) {
        case 'complex':
          return `${space}  ${getKey(item)}: {\n${iter(getChildren(item), depth + 1)}\n${space}  }`;
        case 'deleted':
          return `${space}- ${getKey(item)}: ${convertToString(getValue(item), depth)}`;
        case 'added':
          return `${space}+ ${getKey(item)}: ${convertToString(getValue(item), depth)}`;
        case 'changed':
          return `${space}- ${getKey(item)}: ${convertToString(getValue(item), depth)}\n${space}+ ${getKey(item)}: ${convertToString(item.value2, depth)}`;
        case 'unchanged':
          return `${space}  ${getKey(item)}: ${convertToString(getValue(item), depth)}`;
        default:
          return 'unknown';
      }
    });
    return lines.join('\n');
  };
  return `{\n${iter(tree)}\n}`;
};

export default stylish;

// to do: stylish(file file) --> stylish(tree)
