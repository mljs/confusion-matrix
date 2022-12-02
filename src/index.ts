/**
 *  Constructs a confusion matrix
 * @class ConfusionMatrix
 * @example
 * const CM = new ConfusionMatrix([[13, 2], [10, 5]], ['cat', 'dog'])
 * @param {Array<Array<number>>} matrix - The confusion matrix, a 2D Array. Rows represent the actual label and columns
 *     the predicted label.
 * @param {Array<any>} labels - Labels of the confusion matrix, a 1D Array
 */
export default class ConfusionMatrix {
  private labels;
  private matrix;
  constructor(matrix: number[][], labels: any[]) {
    if (matrix.length !== matrix[0].length) {
      throw new Error('Confusion matrix must be square');
    }
    if (labels.length !== matrix.length) {
      throw new Error(
        'Confusion matrix and labels should have the same length',
      );
    }
    this.labels = labels;
    this.matrix = matrix;
  }

  /**
   * Construct confusion matrix from the predicted and actual labels (classes). Be sure to provide the arguments in
   * the correct order!
   * @param {Array<any>} actual  - The predicted labels of the classification
   * @param {Array<any>} predicted     - The actual labels of the classification. Has to be of same length as
   *     predicted.
   * @param {object} [options] - Additional options
   * @param {Array<any>} [options.labels] - The list of labels that should be used. If not provided the distinct set
   *     of labels present in predicted and actual is used. Labels are compared using the strict equality operator
   *     '==='
   * @param {any} [options.sort]
   * @return {ConfusionMatrix} - Confusion matrix
   */
  static fromLabels(
    actual: any[],
    predicted: any[],
    options: FromLabelsOptions = {},
  ) {
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
    const matrix: number[][] = Array.from({ length: distinctLabels.length });
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
   * Get the confusion matrix
   * @return {Array<Array<number> >}
   */
  getMatrix() {
    return this.matrix;
  }

  getLabels() {
    return this.labels;
  }

  /**
   * Get the total number of samples
   * @return {number}
   */
  getTotalCount() {
    let predicted = 0;
    for (const row of this.matrix) {
      for (const element of row) {
        predicted += element;
      }
    }
    return predicted;
  }

  /**
   * Get the total number of true predictions
   * @return {number}
   */
  getTrueCount() {
    let count = 0;
    for (let i = 0; i < this.matrix.length; i++) {
      count += this.matrix[i][i];
    }
    return count;
  }

  /**
   * Get the total number of false predictions.
   * @return {number}
   */
  getFalseCount() {
    return this.getTotalCount() - this.getTrueCount();
  }

  /**
   * Get the number of true positive predictions.
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getTruePositiveCount(label: any): number {
    const index = this.getIndex(label);
    return this.matrix[index][index];
  }

  /**
   * Get the number of true negative predictions
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getTrueNegativeCount(label: any) {
    const index = this.getIndex(label);
    let count = 0;
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix.length; j++) {
        if (i !== index && j !== index) {
          count += this.matrix[i][j];
        }
      }
    }
    return count;
  }

  /**
   * Get the number of false positive predictions.
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getFalsePositiveCount(label: any) {
    const index = this.getIndex(label);
    let count = 0;
    for (let i = 0; i < this.matrix.length; i++) {
      if (i !== index) {
        count += this.matrix[i][index];
      }
    }
    return count;
  }

  /**
   * Get the number of false negative predictions.
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getFalseNegativeCount(label: any): number {
    const index = this.getIndex(label);
    let count = 0;
    for (let i = 0; i < this.matrix.length; i++) {
      if (i !== index) {
        count += this.matrix[index][i];
      }
    }
    return count;
  }

  /**
   * Get the number of real positive samples.
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getPositiveCount(label: any) {
    return this.getTruePositiveCount(label) + this.getFalseNegativeCount(label);
  }

  /**
   * Get the number of real negative samples.
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getNegativeCount(label: any) {
    return this.getTrueNegativeCount(label) + this.getFalsePositiveCount(label);
  }

  /**
   * Get the index in the confusion matrix that corresponds to the given label
   * @param {any} label - The label to search for
   * @throws if the label is not found
   * @return {number}
   */
  getIndex(label: any) {
    const index = this.labels.indexOf(label);
    if (index === -1) throw new Error('The label does not exist');
    return index;
  }

  /**
   * Get the true positive rate a.k.a. sensitivity. Computes the ratio between the number of true positive predictions and the total number of positive samples.
   * {@link https://en.wikipedia.org/wiki/Sensitivity_and_specificity}
   * @param {any} label - The label that should be considered "positive"
   * @return {number} - The true positive rate [0-1]
   */
  getTruePositiveRate(label: any) {
    return this.getTruePositiveCount(label) / this.getPositiveCount(label);
  }

  /**
   * Get the true negative rate a.k.a. specificity. Computes the ration between the number of true negative predictions and the total number of negative samples.
   * {@link https://en.wikipedia.org/wiki/Sensitivity_and_specificity}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getTrueNegativeRate(label: any) {
    return this.getTrueNegativeCount(label) / this.getNegativeCount(label);
  }

  /**
   * Get the positive predictive value a.k.a. precision. Computes TP / (TP + FP)
   * {@link https://en.wikipedia.org/wiki/Positive_and_negative_predictive_values}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getPositivePredictiveValue(label: any) {
    const TP = this.getTruePositiveCount(label);
    return TP / (TP + this.getFalsePositiveCount(label));
  }

  /**
   * Negative predictive value
   * {@link https://en.wikipedia.org/wiki/Positive_and_negative_predictive_values}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getNegativePredictiveValue(label: any) {
    const TN = this.getTrueNegativeCount(label);
    return TN / (TN + this.getFalseNegativeCount(label));
  }

  /**
   * False negative rate a.k.a. miss rate.
   * {@link https://en.wikipedia.org/wiki/Type_I_and_type_II_errors#False_positive_and_false_negative_rates}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getFalseNegativeRate(label: any) {
    return 1 - this.getTruePositiveRate(label);
  }

  /**
   * False positive rate a.k.a. fall-out rate.
   * {@link https://en.wikipedia.org/wiki/Type_I_and_type_II_errors#False_positive_and_false_negative_rates}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getFalsePositiveRate(label: any) {
    return 1 - this.getTrueNegativeRate(label);
  }

  /**
   * False discovery rate (FDR)
   * {@link https://en.wikipedia.org/wiki/False_discovery_rate}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getFalseDiscoveryRate(label: any) {
    const FP = this.getFalsePositiveCount(label);
    return FP / (FP + this.getTruePositiveCount(label));
  }

  /**
   * False omission rate (FOR)
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getFalseOmissionRate(label: any) {
    const FN = this.getFalseNegativeCount(label);
    return FN / (FN + this.getTruePositiveCount(label));
  }

  /**
   * F1 score
   * {@link https://en.wikipedia.org/wiki/F1_score}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getF1Score(label: any) {
    const TP = this.getTruePositiveCount(label);
    return (
      (2 * TP) /
      (2 * TP +
        this.getFalsePositiveCount(label) +
        this.getFalseNegativeCount(label))
    );
  }

  /**
   * Matthews correlation coefficient (MCC)
   * {@link https://en.wikipedia.org/wiki/Matthews_correlation_coefficient}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getMatthewsCorrelationCoefficient(label: any) {
    const TP = this.getTruePositiveCount(label);
    const TN = this.getTrueNegativeCount(label);
    const FP = this.getFalsePositiveCount(label);
    const FN = this.getFalseNegativeCount(label);
    return (
      (TP * TN - FP * FN) /
      Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN))
    );
  }

  /**
   * Informedness
   * {@link https://en.wikipedia.org/wiki/Youden%27s_J_statistic}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getInformedness(label: any) {
    return (
      this.getTruePositiveRate(label) + this.getTrueNegativeRate(label) - 1
    );
  }

  /**
   * Markedness
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */
  getMarkedness(label: any) {
    return (
      this.getPositivePredictiveValue(label) +
      this.getNegativePredictiveValue(label) -
      1
    );
  }

  /**
   * Get the confusion table.
   * @param {any} label - The label that should be considered "positive"
   * @return {Array<Array<number> >} - The 2x2 confusion table. [[TP, FN], [FP, TN]]
   */
  getConfusionTable(label: any) {
    return [
      [this.getTruePositiveCount(label), this.getFalseNegativeCount(label)],
      [this.getFalsePositiveCount(label), this.getTrueNegativeCount(label)],
    ];
  }

  /**
   * Get total accuracy.
   * @return {number} - The ratio between the number of true predictions and total number of classifications ([0-1])
   */
  getAccuracy() {
    let correct = 0;
    let incorrect = 0;
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix.length; j++) {
        if (i === j) correct += this.matrix[i][j];
        else incorrect += this.matrix[i][j];
      }
    }
    return correct / (correct + incorrect);
  }

  /**
   * Returns the element in the confusion matrix that corresponds to the given actual and predicted labels.
   * @param {any} actual - The true label
   * @param {any} predicted - The predicted label
   * @return {number} - The element in the confusion matrix
   */
  getCount(actual: any, predicted: any) {
    const actualIndex = this.getIndex(actual);
    const predictedIndex = this.getIndex(predicted);
    return this.matrix[actualIndex][predictedIndex];
  }

  /**
   * Compute the general prediction accuracy
   * @deprecated Use getAccuracy
   * @return {number} - The prediction accuracy ([0-1]
   */
  get accuracy() {
    return this.getAccuracy();
  }

  /**
   * Compute the number of predicted observations
   * @deprecated Use getTotalCount
   * @return {number}
   */
  get total() {
    return this.getTotalCount();
  }
}

interface FromLabelsOptions {
  labels?: any[];
  sort?: (...args: any[]) => number;
}
