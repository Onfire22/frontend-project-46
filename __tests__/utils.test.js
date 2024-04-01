import {
  getKey,
  getStatus,
  getValue1,
  getChildren,
  getValue2,
} from '../src/utils.js';

const obj = {
  key: 'one',
  value1: 'one',
  value2: 'two',
  status: true,
  children: [
    'one, two',
  ],
};

test('utilTest', () => {
  expect(getKey(obj)).toEqual('one');
  expect(getValue1(obj)).toEqual('one');
  expect(getValue2(obj)).toEqual('two');
  expect(getStatus(obj)).toEqual(true);
  expect(getChildren(obj)).toEqual(['one, two']);
});
