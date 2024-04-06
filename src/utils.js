import * as fs from 'node:fs';
import path from 'node:path';

const currentDirrectory = process.cwd();
const getPath = (file) => path.resolve(currentDirrectory, file);
const getData = (file) => fs.readFileSync(getPath(file), { encoding: 'utf8', flag: 'r' });
const getExtName = (file) => path.extname(file).slice(1);

const getStatus = (obj) => obj.status;
const getKey = (obj) => obj.key;
const getValue1 = (obj) => obj.value1;
const getValue2 = (obj) => obj.value2;
const getChildren = (obj) => obj.children;

export {
  getStatus,
  getKey,
  getValue1,
  getValue2,
  getData,
  getExtName,
  getChildren,
};
