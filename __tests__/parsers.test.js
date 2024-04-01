import { fileURLToPath } from 'url';
import path from 'path';
import parseData from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const obj = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const fixtureJSON1 = getFixturePath('file1.json');
const fixtureYAML1 = getFixturePath('file1.yaml');

test('parsedata yaml, json test', () => {
  expect(parseData(fixtureJSON1)).toEqual(obj);
  expect(parseData(fixtureYAML1)).toEqual(obj);
});

test('parsedata unknown ext', () => {
  expect(() => {
    parseData('__fixtures__/plainResult.txt');
  }).toThrow('Unknown file extantion: .txt. Extantions supported: .json, .yaml, .yml');
});
