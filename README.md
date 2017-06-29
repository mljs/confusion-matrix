# confusion-matrix

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![npm download][download-image]][download-url]

Confusion matrix for supervised classification.

## Installation

`$ npm install --save ml-confusion-matrix`

## Usage

```js
import ConfusionMatrix from 'ml-confusion-matrix';

const CM1 = new ConfusionMatrix([[13, 2], [10, 5]], ['cat', 'dog']);

// Construct the confusion matrix from the true and the predicted labels
const trueLabels =      [0, 1, 0, 1, 1, 0];
const predictedLabels = [1, 1, 1, 1, 0, 0];
const CM2 = new ConfusionMatrix.fromLabels(trueLabels, predictedLabels); // The order of the arguments are important !!!

// Compute some derivatives of the confusion matrix
// See API documentation for the complete list
console.log(CM1.accuracy); // 0.6 # (13 + 5) / 30
console.log(CM2.accuracy); // 0.5
console.log(CM2.total);    // 6
```

## [API Documentation](https://mljs.github.io/confusion-matrix/)

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-confusion-matrix.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-confusion-matrix
[travis-image]: https://img.shields.io/travis/mljs/confusion-matrix/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/confusion-matrix
[download-image]: https://img.shields.io/npm/dm/ml-confusion-matrix.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-confusion-matrix
