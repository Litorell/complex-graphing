

// Matrix class, also supports matrix multiplication.
class Matrix {
    // Can either be initialized with an array of arrays (2D array) or two dimensions and a default value.
    constructor(matrix=null, size=null, value=0) {
        if (matrix !== null) {
            this.matrix = matrix;
        } else {
            this.matrix = []
            for (let i = 0; i < size[0]; i++) {
                this.matrix.push([]);
                for (let j = 0; j < size[1]; j++) {
                    this.matrix[i].push(value)
                }

            }
        }
    }

    // Height of the matrix
    get m() {
        return this.matrix.length;
    }
    // Width of the matrix
    get n() {
        return this.matrix[0].length;
    }

    get transpose() {
        let n = this.m;
        let m = this.n

        let newMatrix = [];

        for (let y = 0; y < m; y++) {
            newMatrix.push([]);
            for (let x = 0; x < n; x++) {
                newMatrix[y].push(this.matrix[x][y]);
            }
        }
        return new Matrix(newMatrix);
    }

    // Applies the transformation correspending to the matrix to a vector.
    transformVector(vector) {
        let result = new Array(this.m);
        result.fill(0);

        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < Math.min(vector.length, this.n); j++) {
                result[i] += this.matrix[i][j] * vector[j];
            }
        }
        return result;
    }

    // Multiply two matrices
    multipliedBy(matrix) {
        let m = matrix.matrix.length;
        let n = this.matrix[0].length;
        let result = new Matrix(null, [m, n]);

        for (let i = 0; i < n; i++) {
            let vector = new Array(n);
            for (let j = 0; j < m; j++) {
                vector[j] = this.matrix[j][i];
            }
            vector = matrix.transformVector(vector);
            for (let j = 0; j < m; j++) {
                result.matrix[j][i] = vector[j];
            }
        }

        return result;
    }
}

class Vector {
    static addition(vector1, vector2) {
        let length = Math.max(vector1.length, vector2.length);
        let result = [];
        
        for (let i = 0; i < length; i++) {
            let term1 = vector1[i];
            let term2 = vector2[i];
            if (isNaN(term1)) term1 = 0;
            if (isNaN(term2)) term2 = 0;

            result.push(term1 + term2);
        }

        return result;
    }

    static subtraction(vector1, vector2) {
        let length = Math.max(vector1.length, vector2.length);
        let result = [];
        
        for (let i = 0; i < length; i++) {
            let term1 = vector1[i];
            let term2 = vector2[i];
            if (isNaN(term1)) term1 = 0;
            if (isNaN(term2)) term2 = 0;

            result.push(term1 - term2);
        }

        return result;
    }

    static scalarMultiplication(vector, scalar) {
        return vector.map(x => x * scalar);
    }
}

