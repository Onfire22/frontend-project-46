import _ from 'lodash';
import {
  getValue1,
  getValue2,
  getStatus,
  getKey,
  getChildren,
} from '../utils.js';

const makeSpaces = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - 2);

const convertToString = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const entries = Object.entries(value);
  const result = entries.map(([key, val]) => `${makeSpaces(depth + 1)}  ${key}: ${convertToString(val, depth + 1)}`);
  return `{\n${result.join('\n')}\n  ${makeSpaces(depth)}}`;
};

const stylish = (tree) => {
  const iter = (node, depth = 1) => {
    const lines = node.map((item) => {
      const status = getStatus(item);
      const space = makeSpaces(depth);
      switch (status) {
        case 'complex':
          return `${space}  ${getKey(item)}: {\n${iter(getChildren(item), depth + 1)}\n${space}  }`;
        case 'deleted':
          return `${space}- ${getKey(item)}: ${convertToString(getValue1(item), depth)}`;
        case 'added':
          return `${space}+ ${getKey(item)}: ${convertToString(getValue1(item), depth)}`;
        case 'changed':
          return `${space}- ${getKey(item)}: ${convertToString(getValue1(item), depth)}\n${space}+ ${getKey(item)}: ${convertToString(getValue2(item), depth)}`;
        case 'unchanged':
          return `${space}  ${getKey(item)}: ${convertToString(getValue1(item), depth)}`;
        default:
          throw new Error(`Unknown status ${status}`);
      }
    });
    return lines.join('\n');
  };
  return `{\n${iter(tree)}\n}`;
};

export default stylish;
