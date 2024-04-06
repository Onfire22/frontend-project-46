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
const stylishResult = getExpectedResult('stylishResult.txt');
const plainResult = getExpectedResult('plainResult.txt');
const jsonResult = getExpectedResult('jsonResult.txt');

test.each([
  [fixtureJSON1, fixtureJSON2, 'stylish', stylishResult],
  [fixtureYAML1, fixtureYAML2, 'stylish', stylishResult],
  [fixtureJSON1, fixtureJSON2, undefined, stylishResult],
  [fixtureYAML1, fixtureYAML2, undefined, stylishResult],
  [fixtureJSON1, fixtureJSON2, 'plain', plainResult],
  [fixtureYAML1, fixtureYAML2, 'plain', plainResult],
  [fixtureJSON1, fixtureJSON2, 'json', jsonResult],
  [fixtureYAML1, fixtureYAML2, 'json', jsonResult],
])('gendiff test', (file1, file2, style, result) => {
  expect(genDiff(file1, file2, style)).toEqual(result);
});

test('gendiff unknown formatter error', () => {
  expect(() => {
    genDiff(fixtureJSON1, fixtureJSON2, 'line');
  }).toThrow('Unknown format line. Supported formats: stylish, plain, json');
});
