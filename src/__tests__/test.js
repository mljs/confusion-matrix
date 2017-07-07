import ConfusionMatrix from '..';

var diagonal = {
    matrix: [[2, 0, 0], [0, 3, 0], [0, 0, 1]],
    labels: [0, 1, 2]
};

var full = {
    matrix: [[3, 4], [1, 7]],
    labels: [0, 1]
};

describe('Confusion Matrix', function () {
    it('trivial', function () {
        const CM = new ConfusionMatrix(diagonal.matrix, diagonal.labels);
        expect(CM.getMatrix()).toBe(diagonal.matrix);
        expect(CM.getLabels()).toBe(diagonal.labels);
    });


    it('diagonal', function () {
        const CM = new ConfusionMatrix(diagonal.matrix, diagonal.labels);
        expect(CM.accuracy).toBe(1);
        expect(CM.total).toBe(6);
        expect(CM.getCount(1, 0)).toBe(0);
    });

    it('full', function () {
        const CM = new ConfusionMatrix(full.matrix, full.labels);
        expect(CM.accuracy).toBe(10 / 15);
        expect(CM.total).toBe(15);
        expect(CM.getCount(1, 0)).toBe(1);
    });

    it('should throw when matrix and labels do not have the same length', function () {
        expect(function () {
            new ConfusionMatrix([[1]], [1, 2]);
        }).toThrowError(/matrix and labels should have the same length/);
    });

    it('should throw when the given matrix is not square', function () {
        expect(function () {
            new ConfusionMatrix([[1, 2]], []);
        }).toThrowError(/matrix must be square/);
    });

    it('should throw if trying to get the count for unexisting label', function () {
        const CM = new ConfusionMatrix(full.matrix, full.labels);
        expect(() => CM.getCount('A', 'B')).toThrow(/label does not exist/);
    });
});

