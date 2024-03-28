import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getExpectedResult = (filename) => fs.readFileSync(getFixturePath(filename), { encoding: 'utf8', flag: 'r' });

test('genDiff test', () => {
  const flatResult = getExpectedResult('flatResult.txt');
  const fixtureJSON1 = getFixturePath('flat1.json');
  const fixtureJSON2 = getFixturePath('flat2.json');
  const fixtureYAML1 = getFixturePath('flat1.yaml');
  const fixtureYAML2 = getFixturePath('flat2.yaml');
  expect(genDiff(fixtureJSON1, fixtureJSON2)).toEqual(flatResult);
  expect(genDiff(fixtureYAML1, fixtureYAML2)).toEqual(flatResult);
});
