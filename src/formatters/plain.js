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
        const { key, type } = item;
        const path = `${route}${key}`;
        switch (type) {
          case 'complex':
            return iter(item.children, `${path}.`);
          case 'deleted':
            return `Property '${path}' was removed`;
          case 'added':
            return `Property '${path}' was added with value: ${convertToString(item.value)}`;
          case 'changed':
            return `Property '${path}' was updated. From ${convertToString(item.value1)} to ${convertToString(item.value2)}`;
          default:
            throw new Error(`Unknown type ${type}`);
        }
      });
    return line.join('\n');
  };
  return iter(tree, '');
};

export default plain;
