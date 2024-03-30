import _ from 'lodash';

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
  const tree = keys.map((key) => {
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      return { key, children: buildDiffTree(file1[key], file2[key]), status: 'complex' };
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      return { key, value: file1[key], status: 'deleted' };
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return { key, value: file2[key], status: 'added' };
    }
    if (!_.isEqual(file1[key], file2[key])) {
      return { key, value: file1[key], status: 'changed' };
    }
    return { key, value: file1[key], status: 'unchanged' };
  });
  return tree;
};

export default buildDiffTree;
