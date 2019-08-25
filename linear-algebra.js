/**
 * @file Matrix and Vector operations.
 * 
 * @copyright Oscar Litorell 2019
 */


/**
 * Holds an n * m matrix.
 * @property {number} m - The height of the matrix. (read-only)
 * @property {number} n - The width of the matrix. (read-only)
 * @property {Matrix} transpose - The transpose of the matrix. (read-only)
 */
class Matrix {
    /**
     * Can either be constructed with an array of arrays (2D array) or two dimensions and a default value.
     * @param {number[][]} [matrix] 
     * @param {number[]} [size] 
     * @param {number} [value] 
     */
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

    /**
     * Applies the matrix's transformation to a vector.
     * @param {number[]} vector 
     * @returns {number[]} The transformed vector.
     */
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


    /**
     * Matrix multiplication. Multiply two matrices.
     * @param {Matrix} matrix1 - The left matrix.
     * @param {Matrix} matrix2 - The right matrix.
     * @returns {Matrix}
     * 
     * @example
     * let matrix1 = new Matrix([
     *     [0, 1],
     *     [0, 0]
     * ]);
     * let matrix2 = new Matrix([
     *     [0, 0],
     *     [1, 0]
     * ]);
     * Matrix.multiplication(matrix1, matrix2);
     * // returns new Matrix([
     * //     [1, 0],
     * //     [0, 0]
     * // ]);
     */
    static multiplication(matrix1, matrix2) {
        let m = matrix1.matrix.length;
        let n = matrix2.matrix[0].length;
        let result = new Matrix(null, [m, n]);

        for (let i = 0; i < n; i++) {
            let vector = new Array(n);
            for (let j = 0; j < m; j++) {
                vector[j] = matrix2.matrix[j][i];
            }
            vector = matrix1.transformVector(vector);
            for (let j = 0; j < m; j++) {
                result.matrix[j][i] = vector[j];
            }
        }

        return result;
    }

}

/**
 * Contains static vector operation methods.
 * @hideconstructor
 */
class Vector {
    /**
     * Add two vectors.
     * @param {number[]} vector1 
     * @param {number[]} vector2 
     * @returns {number[]}
     */
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

    /**
     * Subtract one vector from another.
     * @param {number[]} vector1 - The vector to subtract from.
     * @param {number[]} vector2 - The vector to subtract.
     * @returns {number[]}
     */
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

    /**
     * Multiply a vector with a constant.
     * @param {number[]} vector
     * @param {number} scalar
     * @returns {number[]}
     */
    static scalarMultiplication(vector, scalar) {
        return vector.map(x => x * scalar);
    }
}

