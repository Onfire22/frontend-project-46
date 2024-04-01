import _ from 'lodash';

const getUniqKeys = (file1, file2) => {
  const keys = [...Object.keys(file1), ...Object.keys(file2)];
  return _.uniq(keys);
};

const getSortedKeys = (file1, file2) => {
  const keys = getUniqKeys(file1, file2);
  const sorted = _.sortBy(keys);
  return sorted;
};

const buildDiffTree = (file1, file2) => {
  const keys = getSortedKeys(file1, file2);
  const tree = keys.map((key) => {
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      return { key, children: buildDiffTree(file1[key], file2[key]), status: 'complex' };
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      return { key, value1: file1[key], status: 'deleted' };
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return { key, value1: file2[key], status: 'added' };
    }
    if (!_.isEqual(file1[key], file2[key])) {
      return {
        key,
        value1: file1[key],
        value2: file2[key],
        status: 'changed',
      };
    }
    return { key, value1: file1[key], status: 'unchanged' };
  });
  return tree;
};

export default buildDiffTree;
