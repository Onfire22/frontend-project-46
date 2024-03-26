import { getKey, getStatus, getValue } from '../src/utils.js';

const obj = {
  key: 'one',
  value: 'two',
  status: true,
};

test('utilTest', () => {
  expect(getKey(obj)).toEqual('one');
  expect(getValue(obj)).toEqual('two');
  expect(getStatus(obj)).toEqual(true);
});
