import ConfusionMatrix from '..';

// Tests are based on wikipedia page
// https://en.wikipedia.org/wiki/Confusion_matrix
const matrix = [[5, 3, 0], [2, 3, 1], [0, 2, 11]];
const labels = ['cat', 'dog', 'rabbit'];
const CM = new ConfusionMatrix(matrix, labels);

describe('Test metrics on the wikipedia example', function () {

    it('positive count', function () {
        expect(CM.getTrueCount()).toEqual(5 + 3 + 11);
    });

    it('negative count', function () {
        expect(CM.getFalseCount()).toEqual(3 + 2 + 1 + 2);
    });

    it('positive count', function () {
        expect(CM.getPositiveCount('cat')).toEqual(5 + 3);
    });

    it('negative count', function () {
        expect(CM.getNegativeCount('cat')).toEqual(2 + 3 + 1 + 2 + 11);
    });

    it('true positive count', function () {
        expect(CM.getTruePositiveCount('cat')).toEqual(5);
    });

    it('true negative count', function () {
        expect(CM.getTrueNegativeCount('cat')).toEqual(17);
    });

    it('false positive count', function () {
        expect(CM.getFalsePositiveCount('cat')).toEqual(2);
    });

    it('false negative count', function () {
        expect(CM.getFalseNegativeCount('cat')).toEqual(3);
    });

    it('confusion table', function () {
        expect(CM.getConfusionTable('cat')).toEqual([[5, 3], [2, 17]]);
    });
});
