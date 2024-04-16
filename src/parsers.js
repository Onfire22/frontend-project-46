import yaml from 'js-yaml';

const parseData = (type, data) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown file extantion: ${type}. Extantions supported: .json, .yaml, .yml`);
  }
};

export default parseData;
