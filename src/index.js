'use strict';

/**
 * ConfusionMatrix class
 */
class ConfusionMatrix {
    /**
     * Constructor
     * @param {Array} matrix - The confusion matrix, a 2D Array. Rows represent the actual label and columns the
     *     predicted label. TODO: provide example
     * @param {Array} labels - Labels of the confusion matrix, a 1D Array
     */
    constructor(matrix, labels) {
        if (matrix.length !== matrix[0].length) {
            throw new Error('Confusion matrix must be square');
        }
        if (labels.length !== matrix.length) {
            throw new Error('Confusion matrix and labels should have the same length');
        }
        this.labels = labels;
        this.matrix = matrix;

    }

    /**
     * Compute the general prediction accuracy
     * @return {number} - The prediction accuracy ([0-1]
     */
    get accuracy() {
        var correct = 0, incorrect = 0;
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix.length; j++) {
                if (i === j) correct += this.matrix[i][j];
                else incorrect += this.matrix[i][j];
            }
        }

        return correct / (correct + incorrect);
    }

    /**
     * Compute the number of predicted observations
     * @return {number} - The number of predicted observations
     */
    get nbPredicted() {
        var predicted = 0;
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix.length; j++) {
                predicted += this.matrix[i][j];
            }
        }
        return predicted;
    }
}

module.exports = ConfusionMatrix;
