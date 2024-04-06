import yaml from 'js-yaml';
import { getData, getExtName } from './utils.js';

const parseData = (filename) => {
  const extName = getExtName(filename);
  const data = getData(filename);
  switch (extName) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return yaml.load(data);
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown file extantion: ${extName}. Extantions supported: .json, .yaml, .yml`);
  }
};

export default parseData;
