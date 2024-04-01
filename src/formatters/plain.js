import _ from 'lodash';
import {
  getValue1,
  getValue2,
  getStatus,
  getKey,
  getChildren,
} from '../utils.js';

const convertToString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  const result = typeof value === 'string' ? `'${value}'` : value;
  return result;
};

const plain = (tree) => {
  const iter = (node, route) => {
    const line = node.filter((item) => item.status !== 'unchanged')
      .map((item) => {
        const status = getStatus(item);
        const path = `${route}${getKey(item)}`;
        switch (status) {
          case 'complex':
            return iter(getChildren(item), `${path}.`);
          case 'deleted':
            return `Property '${path}' was removed`;
          case 'added':
            return `Property '${path}' was added with value: ${convertToString(getValue1(item))}`;
          case 'changed':
            return `Property '${path}' was updated. From ${convertToString(getValue1(item))} to ${convertToString(getValue2(item))}`;
          default:
            throw new Error(`Unknown status ${status}`);
        }
      });
    return line.join('\n');
  };
  return iter(tree, '');
};

export default plain;
