import yaml from 'js-yaml';

const parseData = (extName, data) => {
  switch (extName) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown file extantion: ${extName}. Extantions supported: .json, .yaml, .yml`);
  }
};

export default parseData;
