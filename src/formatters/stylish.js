import _ from 'lodash';

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
      const {
        key, children, value, value1, value2, type,
      } = item;
      const space = makeSpaces(depth);
      switch (type) {
        case 'complex':
          return `${space}  ${key}: {\n${iter(children, depth + 1)}\n${space}  }`;
        case 'deleted':
          return `${space}- ${key}: ${convertToString(value, depth)}`;
        case 'added':
          return `${space}+ ${key}: ${convertToString(value, depth)}`;
        case 'changed':
          return `${space}- ${key}: ${convertToString(value1, depth)}\n${space}+ ${key}: ${convertToString(value2, depth)}`;
        case 'unchanged':
          return `${space}  ${key}: ${convertToString(value, depth)}`;
        default:
          throw new Error(`Unknown type ${type}`);
      }
    });
    return lines.join('\n');
  };
  return `{\n${iter(tree)}\n}`;
};

export default stylish;
