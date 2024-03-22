import * as fs from 'node:fs';
import path from 'node:path';

const currentDirrectory = process.cwd();
const getPath = (file) => path.resolve(currentDirrectory, file);
const getData = (file) => fs.readFileSync(getPath(file), { encoding: 'utf8', flag: 'r' });
const parseData = (file) => {
  const data = getData(file);
  return JSON.parse(data);
};

export default parseData;
