import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getExpectedResult = (filename) => fs.readFileSync(getFixturePath(filename), { encoding: 'utf8', flag: 'r' });

test('genDiff test', () => {
  const result = getExpectedResult('result.txt');
  const fixture1 = getFixturePath('file1.json');
  const fixture2 = getFixturePath('file2.json');
  expect(genDiff(fixture1, fixture2)).toEqual(result);
});
