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
        CM.matrix.should.deepEqual(diagonal.matrix);
        CM.labels.should.deepEqual(diagonal.labels);
    });


    it('diagonal', function () {
        const CM = new ConfusionMatrix(diagonal.matrix, diagonal.labels);
        CM.accuracy.should.equal(1);
        CM.nbPredicted.should.equal(6);
    });

    it('full', function () {
        const CM = new ConfusionMatrix(full.matrix, full.labels);
        CM.accuracy.should.equal(10 / 15);
        CM.nbPredicted.should.equal(15);
    });

    it('should throw when matrix and labels do not have the same length', function () {
        (function () {
            new ConfusionMatrix([[1]], [1, 2]);
        }).should.throw(/matrix and labels should have the same length/);
    });

    it('should throw when the given matrix is not square', function () {
        (function () {
            new ConfusionMatrix([[1, 2]], []);
        }).should.throw(/matrix must be square/);
    });


});


