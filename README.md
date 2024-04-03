### Hexlet tests and linter status:
[![Actions Status](https://github.com/Onfire22/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Onfire22/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/2972253631d363f897e4/maintainability)](https://codeclimate.com/github/Onfire22/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2972253631d363f897e4/test_coverage)](https://codeclimate.com/github/Onfire22/frontend-project-46/test_coverage)
## Installation:
make ci
## Usage:
- as CLI:
```
gendiff [options] path/to/file1 path/to/file2
```
- as JS function:
```
import genDiff from gendiff.js
const diffs = genDiff('path/to/file1', 'path/to/file2')
```
## Options:
- shows help info
```
gendiff -h
```
- to choose stylish format type
```
gendiff -f || gendiff --format
```
  --format supports options:
  ```
   [stylish]
   plain
   json
  ```
## Flat files diff:
[![asciicast](https://asciinema.org/a/AqCpAC4Yu2pcUIW4ndW7KM5dh.svg)](https://asciinema.org/a/AqCpAC4Yu2pcUIW4ndW7KM5dh)
## Complex files diff stylish representation:
[![asciicast](https://asciinema.org/a/SOcQwJlyAn37h1vCAO3I3bl9q.svg)](https://asciinema.org/a/SOcQwJlyAn37h1vCAO3I3bl9q)
## Complex files diff plain representation:
[![asciicast](https://asciinema.org/a/PnnqLOKEyMQGXPfZ2Ey3l9MJi.svg)](https://asciinema.org/a/PnnqLOKEyMQGXPfZ2Ey3l9MJi)
## Complex files diff json representation:
[![asciicast](https://asciinema.org/a/XBpt9oBcQKZ2rqw7XwthqLj9y.svg)](https://asciinema.org/a/XBpt9oBcQKZ2rqw7XwthqLj9y)