import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getExpectedResult = (filename) => fs.readFileSync(getFixturePath(filename), { encoding: 'utf8', flag: 'r' });

test.each([
  ['file1.json', 'file2.json', 'stylish', 'stylishResult.txt'],
  ['file1.yaml', 'file2.yaml', 'stylish', 'stylishResult.txt'],
  ['file1.json', 'file2.json', undefined, 'stylishResult.txt'],
  ['file1.yaml', 'file2.yaml', undefined, 'stylishResult.txt'],
  ['file1.json', 'file2.json', 'plain', 'plainResult.txt'],
  ['file1.yaml', 'file2.yaml', 'plain', 'plainResult.txt'],
  ['file1.json', 'file2.json', 'json', 'jsonResult.txt'],
  ['file1.yaml', 'file2.yaml', 'json', 'jsonResult.txt'],
])('gendiff test', (file1, file2, style, result) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), style))
    .toEqual(getExpectedResult(result));
});
