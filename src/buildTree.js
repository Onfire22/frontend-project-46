import _ from 'lodash';

const buildDiffTree = (content1, content2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(content1), ...Object.keys(content2)]));
  const tree = keys.map((key) => {
    if (_.isPlainObject(content1[key]) && _.isPlainObject(content2[key])) {
      return { key, children: buildDiffTree(content1[key], content2[key]), type: 'complex' };
    }
    if (!_.has(content2, key)) {
      return { key, value1: content1[key], type: 'deleted' };
    }
    if (!_.has(content1, key) && _.has(content2, key)) {
      return { key, value1: content2[key], type: 'added' };
    }
    if (!_.isEqual(content1[key], content2[key])) {
      return {
        key,
        value1: content1[key],
        value2: content2[key],
        type: 'changed',
      };
    }
    return { key, value1: content1[key], type: 'unchanged' };
  });
  return tree;
};

export default buildDiffTree;
