import {
  getKey,
  getStatus,
  getValue,
  getChildren,
} from '../src/utils.js';

const obj = {
  key: 'one',
  value: 'two',
  status: true,
  children: [
    'one, two',
  ],
};

test('utilTest', () => {
  expect(getKey(obj)).toEqual('one');
  expect(getValue(obj)).toEqual('two');
  expect(getStatus(obj)).toEqual(true);
  expect(getChildren(obj)).toEqual(['one, two']);
});
