import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getExpectedResult = (filename) => fs.readFileSync(getFixturePath(filename), { encoding: 'utf8', flag: 'r' });

const fixtureJSON1 = getFixturePath('file1.json');
const fixtureJSON2 = getFixturePath('file2.json');
const fixtureYAML1 = getFixturePath('file1.yaml');
const fixtureYAML2 = getFixturePath('file2.yaml');

test('gendiff stylish test', () => {
  const stylishResult = getExpectedResult('stylishResult.txt');
  expect(genDiff(fixtureJSON1, fixtureJSON2)).toEqual(stylishResult);
  expect(genDiff(fixtureYAML1, fixtureYAML2)).toEqual(stylishResult);
});

test('gendiff plain test', () => {
  const plainResult = getExpectedResult('plainResult.txt');
  expect(genDiff(fixtureJSON1, fixtureJSON2, 'plain')).toEqual(plainResult);
  expect(genDiff(fixtureYAML1, fixtureYAML2, 'plain')).toEqual(plainResult);
});

test('gendiff unknown formatter', () => {
  expect(() => {
    genDiff(fixtureJSON1, fixtureJSON2, 'line');
  }).toThrow('Unknown format line. Supported formats: stylish, plain, json');
});
