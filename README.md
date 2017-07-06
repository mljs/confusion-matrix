# confusion-matrix

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![npm download][download-image]][download-url]

Confusion matrix for supervised classification. Compute metrics on your classification like accuracy, sensitivity, specificity. The list of implemented metrics were inspired from [the confusion matrix wikipedia page](https://en.wikipedia.org/wiki/Confusion_matrix). See [API documentation](https://mljs.github.io/confusion-matrix/) for the list of metrics.

## Installation
`$ npm install --save ml-confusion-matrix`

## Usage
### Load the library
```js
// CommonJS
const ConfusionMatrix = require('ml-confusion-matrix');

// ES6 module syntax
import ConfusionMatrix from 'ml-confusion-matrix';
```
### Instanciate from the list of true and predicted labels
Handy if you want a confusion matrix from a cross-validation or from the test data set prediction results.
```js
const trueLabels =      [0, 1, 0, 1, 1, 0];
const predictedLabels = [1, 1, 1, 1, 0, 0];

// The order of the arguments are important !!!
const CM2 = new ConfusionMatrix.fromLabels(trueLabels, predictedLabels);
console.log(CM2.getAccuracy()); // 0.5
```

### Instanciate from confusion matrix
You can call the constructor directly with the confusion matrix and the labels corresponding to each rows/columns.

```js
const CM1 = new ConfusionMatrix([[13, 2], [10, 5]], ['cat', 'dog']);
console.log(CM1.getTruePositiveCount('cat')); // 13 
```

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-confusion-matrix.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-confusion-matrix
[travis-image]: https://img.shields.io/travis/mljs/confusion-matrix/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/confusion-matrix
[download-image]: https://img.shields.io/npm/dm/ml-confusion-matrix.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-confusion-matrix
