import _ from 'lodash';

const convertToString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  const result = typeof value === 'string' ? `'${value}'` : value;
  return result;
};

const plain = (tree) => {
  const iter = (node, route) => {
    const line = node.filter((item) => item.type !== 'unchanged')
      .map((item) => {
        const {
          key, children, value, value1, value2, type,
        } = item;
        const path = `${route}${key}`;
        switch (type) {
          case 'complex':
            return iter(children, `${path}.`);
          case 'deleted':
            return `Property '${path}' was removed`;
          case 'added':
            return `Property '${path}' was added with value: ${convertToString(value)}`;
          case 'changed':
            return `Property '${path}' was updated. From ${convertToString(value1)} to ${convertToString(value2)}`;
          default:
            throw new Error(`Unknown type ${type}`);
        }
      });
    return line.join('\n');
  };
  return iter(tree, '');
};

export default plain;
