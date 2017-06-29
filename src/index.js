/**
 *  Constructs a confusion matrix
 * @class ConfusionMatrix
 * @example
 * const CM = new ConfusionMatrix([[13, 2], [10, 5], ['cat', 'dog'])
 * @param {Array<Array<number>>} matrix - The confusion matrix, a 2D Array. Rows represent the actual label and columns the
 *     predicted label.
 * @param {Array<any>} labels - Labels of the confusion matrix, a 1D Array
 */
class ConfusionMatrix {
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
     * Construct confusion matrix from the predicted and actual labels (classes)
     * @param {Array<any>} actual  - The predicted labels of the classification
     * @param {Array<any>} predicted     - The actual labels of the classification. Has to be of same length as predicted.
     * @param {object} [options] - Additional options
     * @param {Array<any>} [options.labels] - The list of labels that should be used. If not provided the distinct set of
     *     labels present in predicted and actual is used. Labels are compared using the strict equality operator '==='
     * @return {ConfusionMatrix} - Confusion matrix
     */
    static fromLabels(actual, predicted, options = {}) {
        if (predicted.length !== actual.length) {
            throw new Error('predicted and actual must have the same length');
        }
        let distinctLabels;
        if (options.labels) {
            distinctLabels = new Set(options.labels);
        } else {
            distinctLabels = new Set([...actual, ...predicted]);
        }
        distinctLabels = Array.from(distinctLabels);
        if (options.sort) {
            distinctLabels.sort(options.sort);
        }

        // Create confusion matrix and fill with 0's
        const matrix = Array.from({length: distinctLabels.length});
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = new Array(matrix.length);
            matrix[i].fill(0);
        }

        for (let i = 0; i < predicted.length; i++) {
            const actualIdx = distinctLabels.indexOf(actual[i]);
            const predictedIdx = distinctLabels.indexOf(predicted[i]);
            if (actualIdx >= 0 && predictedIdx >= 0) {
                matrix[actualIdx][predictedIdx]++;
            }
        }

        return new ConfusionMatrix(matrix, distinctLabels);
    }

    /**
     * Compute the general prediction accuracy
     * @return {number} - The prediction accuracy ([0-1]
     */
    get accuracy() {
        let correct = 0;
        let incorrect = 0;
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

    /**
     * Returns the element in the confusion matrix that corresponds to the given actual and predicted labels.
     * @param {any} actual - The true label
     * @param {any} predicted - The predicted label
     * @return {number} - The element in the confusion matrix
     */
    getCount(actual, predicted) {
        const actualIndex = this.labels.indexOf(actual);
        const predictedIndex = this.labels.indexOf(predicted);
        if (actualIndex < 0 || predictedIndex < 0) {
            throw new Error('The provided label does not exist');
        }
        return this.matrix[actualIndex][predictedIndex];
    }
}

module.exports = ConfusionMatrix;
