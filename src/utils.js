import * as fs from 'node:fs';
import path from 'node:path';

const currentDirrectory = process.cwd();
const getPath = (file) => path.resolve(currentDirrectory, file);
const getData = (file) => fs.readFileSync(getPath(file), { encoding: 'utf8', flag: 'r' });
const getExtName = (file) => path.extname(file);

const getStatus = (obj) => obj.status;
const getKey = (obj) => obj.key;
const getValue = (obj) => obj.value;

export {
  getStatus,
  getKey,
  getValue,
  getData,
  getExtName,
};
