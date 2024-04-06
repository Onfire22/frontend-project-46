import * as fs from 'node:fs';
import path from 'node:path';

const currentDirrectory = process.cwd();
const getPath = (file) => path.resolve(currentDirrectory, file);
const getData = (file) => fs.readFileSync(getPath(file), { encoding: 'utf8', flag: 'r' });
const getExtName = (file) => path.extname(file).slice(1);

export {
  getData,
  getExtName,
};
