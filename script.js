/*

    Copyright Oscar Litorell 2019

*/

// Class that handles complex numbers and mathematical operations with complex numbers.
class Complex {
    constructor(re=0, im=0) {
        this.re = Number(re);
        this.im = Number(im);    
    }

    // Prints nicely
    print(decimals=null) {
        let re;
        let im;
        if (decimals !== null) {
            let multiplier = Math.pow(10, decimals);
            re = Math.round(this.re * multiplier) / multiplier;
            im = Math.round(this.im * multiplier) / multiplier;
        } else {
            re = this.re;
            im = this.im;
        }

        return `${re} ${(im >= 0) ? "+" : "-"} ${Math.abs(im)}i`;
    }

    // From polar coordinates
    static fromPolar(r, theta) {
        let re = r * Math.cos(theta);
        let im = r * Math.sin(theta);
        return new Complex(re, im);
    }

    // Add two numbers
    static add(num1, num2) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        if (num2.constructor !== Complex) num2 = new Complex(num2);

        let out = new Complex();
        out.re = num1.re + num2.re;
        out.im = num1.im + num2.im;
        return out;
    }

    // Subtract one number from another
    static subtract(num1, num2) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        if (num2.constructor !== Complex) num2 = new Complex(num2);

        let out = new Complex();
        out.re = num1.re - num2.re;
        out.im = num1.im - num2.im;
        return out;
    }

    // Multiply two numbers
    static multiply(in1, in2) {
        if (in1.constructor !== Complex) in1 = new Complex(in1);
        if (in2.constructor !== Complex) in2 = new Complex(in2);
        let num1 = in1.re * in2.re;
        let num2 = in1.im * in2.re;
        let num3 = in1.re * in2.im;
        let num4 = in1.im * in2.im;

        let out = new Complex();

        out.re = num1 - num4;
        out.im = num2 + num3;
        return out;
    }

    // Divide one number with another
    static divide(num1, num2) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        if (num2.constructor !== Complex) num2 = new Complex(num2);
        num2 = Complex.raise(num2, -1);
        return Complex.multiply(num1, num2);
    }

    // Natural logarithm
    static ln(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        let polar = Complex.toPolar(num1);
        return new Complex(Math.log(polar.r), polar.theta);
    }

    // Cosine
    static cos(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        let e = new Complex(Math.E);
        let c = Complex;

        // (e^(ix) + e^(-ix)) * 0.5
        return c.multiply(c.add(c.raise(e, c.multiply(new Complex(0, 1), num1)), c.raise(e, c.multiply(new Complex(0, -1), num1))), 0.5);
    }

    // Sine
    static sin(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        let e = new Complex(Math.E);
        let c = Complex;

        // (e^(-ix) - e^(ix)) * 0.5i
        return c.multiply(c.subtract(c.raise(e, c.multiply(new Complex(0, -1), num1)), c.raise(e, c.multiply(new Complex(0, 1), num1))), new Complex(0, 0.5));
    }

    // Tangent
    static tan(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        return Complex.divide(Complex.sin(num1), Complex.cos(num1));
    }

    // Exponents
    static raise(num1, num2) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        if (num2.constructor !== Complex) num2 = new Complex(num2);

        if (Complex.abs(num1).re === 0 && Complex.abs(num2).re !== 0) {
            return new Complex(0);
        }

        let num1Polar = Complex.toPolar(num1);

        // Absolute value and argument of base
        let absB = num1Polar.r;
        let argB = num1Polar.theta;
        
        let out = Complex.fromPolar(Math.exp(num2.re * Math.log(absB) - num2.im * argB), num2.im * Math.log(absB) + num2.re * argB);

        return out;
    }

    // Absolute value
    static abs(num) {
        return new Complex(Complex.toPolar(num).r);
    }

    // To polar coordinates (radius and angle)
    static toPolar(num) {
        let r = Math.pow(Math.pow(num.re, 2) + Math.pow(num.im, 2), 0.5);
        let theta = Math.atan2(num.im, num.re);
        return {
            r: r,
            theta: theta
        };
    }

    // The following methods may be deprecated in the future
    added(num) {
        return Complex.add(this, num);
    }

    subtracted(num) {
        return Complex.subtract(this, num);
    }

    multipliedBy(num) {
        return Complex.multiply(this, num);
    }

    dividedBy(num) {
        return Complex.divide(this, num);
    }

    raisedTo(num) {
        return Complex.raise(this, num);
    }

}

// Class which holds a certain style of line (color and width), used when drawing on canvas.
class LineStyle {
    constructor(width, color) {
        this.width = width;
        this.color = color;
    }
}


class Vector3D {
    constructor(x=0, y=0, z=0) {
        this.x = Number(x);
        this.y = Number(y);
        this.z = Number(z);
    }

    addVector(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
    }

    added(vector) {
        return new Vector3D(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }
	
	subtracted(vector) {
        return new Vector3D(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    toArray() {
        return [this.x, this.y, this.z];
    }
}

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
    // Note: the vector argument is a normal array, and not a Vector3D object. It also returns a normal array.
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

// Holds information about the viewport perspective and position relative to the coordinate system.
class View {
    constructor(longitude = 0, latitude = 0, offset = new Vector3D(0, 0, 0), zoom = 100, projection="perspective") {
        // Longitude angle (degrees)
        this._longitude = longitude;
        // Latitude angle (degrees)
        this._latitude = latitude;
        // Coordinates for center of rotation
        this.offset = offset;
        // Zoom (for perspective mode this equates to distance from the center of rotation)
        this.zoom = zoom;
        // Type of projection (either "perspective" or "orthogonal")
        this.projection = projection;
        this.updateMatrix();
    }

    // Setters and getters because the view matrix needs to be updated when the rotation changes.
    set longitude(value) {
        this._longitude = value;
        this.updateMatrix();
    }
    get longitude() {
        return this._longitude;
    }

    set latitude(value) {
        this._latitude = value;
        this.updateMatrix();
    }
    get latitude() {
        return this._latitude;
    }

    snap() {
        this._latitude = Math.round((this.latitude / 45)) * 45;
        this._longitude = Math.round((this.longitude / 45)) * 45;
        this.updateMatrix();
        updateCanvas();
    }

    // Updates the matrix which encodes the rotation.
    updateMatrix() {
        let lo = this._longitude / 180 * Math.PI;
        let la = this._latitude / 180 * Math.PI;

        let cos = Math.cos;
        let sin = Math.sin;

        let longMatrix = new Matrix([
            [cos(lo), 0, sin(lo)],
            [0,       1, 0       ],
            [-sin(lo), 0, cos(lo) ]
        ]);

        let latMatrix = new Matrix([
            [1, 0,        0      ],
            [0, cos(la),  sin(la)],
            [0, -sin(la), cos(la)]
        ]);
        
        this.matrix = longMatrix.multipliedBy(latMatrix);
    }

    getProjectedVector(point, distance=null) {
        if (distance === null) distance = this.zoom;

        if (this.projection === "perspective") {
            let fovCoeff = Math.max(mainCanvas.width, mainCanvas.height) * 0.8;

            point[0] *= distance / fovCoeff;
            point[1] *= distance / fovCoeff;
        } else {
            point[0] *= this.zoom / 600;
            point[1] *= this.zoom / 600;
        }
        distance -= this.zoom;

        let projectedVector = this.matrix.transpose.transformVector([point[0], point[1], distance]);
        projectedVector[0] += this.offset.x;
        projectedVector[1] += this.offset.y;
        projectedVector[2] += this.offset.z;

        return projectedVector;

    }

    projectVector(vectorInput) {
        return (this.projection === "perspective") ? this.projectVectorPerspective(vectorInput) : this.projectVectorOrtho(vectorInput);
    }

    // Project a vector onto a plane using perspective (like a pinhole camera)
    // NOTE: vectorInput is a normal array, and not a Vector3D object.
    projectVectorPerspective(vectorInput) {
        let vector = [vectorInput[0] - this.offset.x, vectorInput[1] - this.offset.y, vectorInput[2] - this.offset.z];

        let transformed = this.matrix.transformVector(vector);
        
        let fovCoeff = Math.max(mainCanvas.width, mainCanvas.height) * 0.8;
        
        transformed[2] += this.zoom;

        let x = transformed[0] / transformed[2] * fovCoeff;
        let y = transformed[1] / transformed[2] * fovCoeff;
        
        return new Vector3D(x, y);
    }

    // Projects a vector onto a plane (orthogonally)
    // NOTE: vectorInput is a normal array, and not a Vector3D object.
    projectVectorOrtho(vectorInput) {
        let vector = [vectorInput[0] - this.offset.x, vectorInput[1] - this.offset.y, vectorInput[2] - this.offset.z];

        let transformed = this.matrix.transformVector(vector);

        let x = transformed[0] / this.zoom * 600;
        let y = transformed[1] / this.zoom * 600;
        
        return new Vector3D(x, y);
    }

    // Cut a line such that only the section in front of the "camera" is rendered
    // NOTE: lineStart and lineEnd are normal arrays, and not Vector3D objects.
    calculateClip(lineStart, lineEnd) {
        let vector1 = [lineStart[0] - this.offset.x, lineStart[1] - this.offset.y, lineStart[2] - this.offset.z];
        let vector2 = [lineEnd[0] - this.offset.x, lineEnd[1] - this.offset.y, lineEnd[2] - this.offset.z];

        let transformed1 = this.matrix.transformVector(vector1);
        let transformed2 = this.matrix.transformVector(vector2);

        transformed1[2] += this.zoom;
        transformed2[2] += this.zoom;

        // If at least one of the points is behind the camera
        if (transformed1[2] < 0 || transformed2[2] < 0) {
            // If there is clipping (ONLY one point is behind the camera)
            if (transformed1[2] < 0 !== transformed2[2] < 0) {

                // Distance between the points in the direction parallel to the direction the camera is pointing
                let dz = transformed2[2] - transformed1[2];

                // Output points
                let point1;
                let point2;

                // If the first point is behind the camera
                if (transformed1[2] < 0) {
                    point1 = new Vector3D(...lineEnd);
                    let c = transformed2[2] / Math.abs(dz);
                    point2 = new Vector3D(lineEnd[0] - (lineEnd[0] - lineStart[0]) * c * 0.99, lineEnd[1] - (lineEnd[1] - lineStart[1]) * c * 0.99, lineEnd[2] - (lineEnd[2] - lineStart[2]) * c * 0.99);

                // If the second point is behind the camera
                } else {
                    point1 = new Vector3D(...lineStart);
                    let c = transformed1[2] / Math.abs(dz);
                    point2 = new Vector3D(lineStart[0] - (lineStart[0] - lineEnd[0]) * c * 0.99, lineStart[1] - (lineStart[1] - lineEnd[1]) * c * 0.99, lineStart[2] - (lineStart[2] - lineEnd[2]) * c * 0.99);
                }

                return [point1, point2];
            }
            
            // Entire line is behind the camera, no need to render.
            return null;
        }

        // No clipping
        return [new Vector3D(...lineStart), new Vector3D(...lineEnd)];
        
    }
}

// Draw a line on the canvas, with Vector3D start and endpoints.
function drawCanvas3d(canvas, lineStart, lineEnd, lineStyle, view) {
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;
    let originalStyle = new LineStyle(ctx.lineWidth, ctx.strokeStyle);
    
    ctx.lineWidth = lineStyle.width;
    ctx.strokeStyle = lineStyle.color;

    let point1;
    let point2;


    if (view.projection === "perspective") {
        // Perspective projection
        clipped = view.calculateClip([lineStart.x, lineStart.y, lineStart.z], [lineEnd.x, lineEnd.y, lineEnd.z]);
        if (clipped == null) return;
        point1 = clipped[0];
        point2 = clipped[1];
    
    } else {
        // Orthogonal projection
        point1 = lineStart;
        point2 = lineEnd;
    }

    // Start and end coordinates
    let start = view.projectVector([point1.x, point1.y, point1.z]);
    let end = view.projectVector([point2.x, point2.y, point2.z]);

    // Center graph
    start.x += width * 0.5;
    start.y = height * 0.5 - start.y;
    end.x += width * 0.5;
    end.y = height * 0.5 - end.y;
    
    // Draw
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.lineWidth = originalStyle.width;
    ctx.strokeStyle = originalStyle.color;
    
}

// 1px black
var lineStyle = new LineStyle(1, "#000000");

// Main canvas in the document.
var mainCanvas = document.getElementById("maincanvas");


// Draw the x, y (re) and z (im) axis lines as well as 1 numbers.
function drawAxisLines(canvas, view) {
    let pixelRatio = window.devicePixelRatio;
    
    let width = canvas.width;
    let height = canvas.height;

    // Draw lines 
    drawCanvas3d(canvas, new Vector3D(-20, 0, 0), new Vector3D(0, 0, 0), new LineStyle(1 * pixelRatio, "#00FF00"), view);
    drawCanvas3d(canvas, new Vector3D(20, 0, 0), new Vector3D(0, 0, 0), new LineStyle(2 * pixelRatio, "#00FF00"), view);
    drawCanvas3d(canvas, new Vector3D(0, -20, 0), new Vector3D(0, 0, 0), new LineStyle(1 * pixelRatio, "#FF0000"), view);
    drawCanvas3d(canvas, new Vector3D(0, 20, 0), new Vector3D(0, 0, 0), new LineStyle(2 * pixelRatio, "#FF0000"), view);
    drawCanvas3d(canvas, new Vector3D(0, 0, -20), new Vector3D(0, 0, 0), new LineStyle(1 * pixelRatio, "#0000FF"), view);
    drawCanvas3d(canvas, new Vector3D(0, 0, 20), new Vector3D(0, 0, 0), new LineStyle(2 * pixelRatio, "#0000FF"), view);

    let ctx = canvas.getContext("2d");
    ctx.font = `${20 * pixelRatio}px sans-serif`;

    let xVector;
    let yVector;
    let zVector;

    // Draw numbers
    // If statements check if the number is in front of the camera
    if (view.projection === "orthogonal" || view.matrix.transformVector([1 - view.offset.x, -view.offset.y, -view.offset.z])[2] + view.zoom > 0) {
        xVector = view.projectVector([1, 0, 0]);
        ctx.fillText(".1", xVector.x + width * 0.5 - 2.5 * pixelRatio, -xVector.y + height * 0.5 + 1 * pixelRatio);
    }
    if (view.projection === "orthogonal" || view.matrix.transformVector([-view.offset.x, 1 - view.offset.y, -view.offset.z])[2] + view.zoom > 0) {
        yVector = view.projectVector([0, 1, 0]);
        ctx.fillText(".1", yVector.x + width * 0.5 - 2.5 * pixelRatio, -yVector.y + height * 0.5 + 1 * pixelRatio);
    }
    if (view.projection === "orthogonal" || view.matrix.transformVector([-view.offset.x, -view.offset.y, 1 - view.offset.z])[2] + view.zoom > 0) {
        zVector = view.projectVector([0, 0, 1]);
        ctx.fillText(".1", zVector.x + width * 0.5 - 2.5 * pixelRatio, -zVector.y + height * 0.5 + 1 * pixelRatio);
    }

}

// Draws all values for a function on the canvas
function drawFunction(canvas, begin, end, step = 0.1, view) {
    let pixelRatio = window.devicePixelRatio;

    let style   = new LineStyle(1   * pixelRatio, "#222222");
    let reStyle = new LineStyle(0.5 * pixelRatio, "#FF4444");
    let imStyle = new LineStyle(0.5 * pixelRatio, "#4444FF");
    
    let lastValue = resultList[0];
    for (let j = 0; j < lastValue.length; j++) {
        // Real component line
        drawCanvas3d(canvas, new Vector3D(begin, 0, 0), new Vector3D(begin, lastValue[j].re, 0), reStyle, view);
        // Imaginary component line
        drawCanvas3d(canvas, new Vector3D(begin, 0, 0), new Vector3D(begin, 0, lastValue[j].im), imStyle, view);
    }
    
    // All values for the function are precalculated when the function updates, and stored in the resultList array.
    for (let i = 1; i <= (end - begin) / step; i++) {
        let x = i * step + begin
        
        //let result = func(new Complex(x, 0));
        let result = resultList[i];

        // Each element in the result (for when there are several functions)
        for (let j = 0; j < result.length; j++) {
            // Function line
            drawCanvas3d(canvas, new Vector3D(x - step, lastValue[j].re, lastValue[j].im), new Vector3D(x, result[j].re, result[j].im), style, view);
            
            // Real component line
            drawCanvas3d(canvas, new Vector3D(x, 0, 0), new Vector3D(x, result[j].re, 0), reStyle, view); // Vertical re lines
            drawCanvas3d(canvas, new Vector3D(x - step, lastValue[j].re, 0), new Vector3D(x, result[j].re, 0), reStyle, view);
    
            // Imaginary component line
            drawCanvas3d(canvas, new Vector3D(x, 0, 0), new Vector3D(x, 0, result[j].im), imStyle, view); // Horizontal im lines
            drawCanvas3d(canvas, new Vector3D(x - step, 0, lastValue[j].im), new Vector3D(x, 0, result[j].im), imStyle, view);
        }
        
        lastValue = result;
    }
}

function drawLabel(canvas, view) {
    let pixelRatio = window.devicePixelRatio;
    
    let width = canvas.width;
    let height = canvas.height;

    let ctx = canvas.getContext("2d");
    ctx.font = `${20 * pixelRatio}px sans-serif`;
    
    if (functionText.length > 0) {
        userFunction(tracingPoint).forEach((tracingResult) => {
            if (tracingResult.constructor !== Complex) tracingResult = new Complex(tracingResult);

            if (view.projection === "orthogonal" || view.matrix.transformVector([tracingPoint, tracingResult.re, tracingResult.im])[2] + view.zoom > 0) {
                let tracing = view.projectVector([tracingPoint, tracingResult.re, tracingResult.im]);

                originalFill = ctx.fillStyle;

                ctx.fillStyle = "#000000B0";

                let pointX =  tracing.x + width  * 0.5;
                let pointY = -tracing.y + height * 0.5;

                let line1 = `x = ${Math.round(tracingPoint * 100) / 100}`;
                let line2 = `z = ${tracingResult.print(2)}`;

                ctx.fillRect(pointX + 10 * pixelRatio, pointY - 20 * pixelRatio, (15 + Math.max(line1.length, line2.length) * 8.5) * pixelRatio, 40 * pixelRatio);
                ctx.beginPath();
                ctx.moveTo(pointX, pointY);
                ctx.lineTo(pointX + 10, pointY - 5);
                ctx.lineTo(pointX + 10, pointY + 5)
                ctx.closePath();

                ctx.fill();

                ctx.font = `${16 * pixelRatio}px monospace`;

                ctx.fillStyle = "#FFFFFF";
                ctx.fillText(line1, pointX + 15 * pixelRatio, pointY -  4 * pixelRatio);
                ctx.fillText(line2, pointX + 15 * pixelRatio, pointY + 14 * pixelRatio);
                ctx.fillStyle = originalFill;
            }
        });
    }
}




var zoom = document.getElementById("zoom");
var xOffset = document.getElementById("x-offset");
var yOffset = document.getElementById("y-offset");
var zOffset = document.getElementById("z-offset");

var view = new View(40, 30, new Vector3D(xOffset.value, yOffset.value, zOffset.value), 5);

// Contains all the values for the result of the function(s)
var resultList = [];

// Updates the view and canvas when an offset is changed
function updateView() {
    view.offset = new Vector3D(xOffset.value, yOffset.value, zOffset.value);
    updateCanvas();
}
xOffset.oninput = updateView;
yOffset.oninput = updateView;
zOffset.oninput = updateView;


// Updates the canvas and redraws the axis lines and function lines. Normally called when the view is changed.
function updateCanvas() {    
    mainCanvas.getContext("2d").clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    
    // Start and end of the function
    let minX = document.getElementById("minX").value;
    let maxX = document.getElementById("maxX").value;

    let resolution = Math.abs(document.getElementById("resolution").value);
    if (resolution === 0) resolution = 0.05; // Resolution cannot be 0, leads to ZeroDivisionError

    drawAxisLines(mainCanvas, view);
    drawFunction(mainCanvas, Math.min(minX, maxX), Math.max(minX, maxX), resolution, view);
    drawLabel(mainCanvas, view);

}

// Updates the values in resultList by calling func for each value of x.
function updateFunctionValues(func) {
    let begin = Number(document.getElementById("minX").value);
    let end = Number(document.getElementById("maxX").value);
    let step = Math.abs(document.getElementById("resolution").value);

    resultList = [];

    for (let i = 0; i <= (end - begin) / step; i++) {
        let x = i * step + begin
        let result = func(new Complex(x, 0));
        resultList.push(result);
    }
}

// The available operations.
// The keys are the names the user enters in the function window, while function is the corresponding function in the Complex class.
let operations = {
    "+": {args: 2, function: "add"},
    "-": {args: 2, function: "subtract"},
    "*": {args: 2, function: "multiply"},
    "/": {args: 2, function: "divide"},
    "^": {args: 2, function: "raise"},
    "ln": {args: 1, function: "ln"},
    "abs": {args: 1, function: "abs"},
    "sin": {args: 1, function: "sin"},
    "cos": {args: 1, function: "cos"},
    "tan": {args: 1, function: "tan"}
};

// List of all variables, with e and pi as default.
let variableList = [
    {
        name: "pi",
        type: "constant",
        value: new Complex(Math.PI)
    },
    {
        name: "e",
        type: "constant",
        value: new Complex(Math.E)
    },

];

// Gets the index of a variable in variableList.
// Returns -1 if it doesn't exist.
function getVariableIndex(name) {
    for (let i = 0; i < variableList.length; i++) {
        if (variableList[i].name === name) return i;
    }
    return -1;
}

// Parse a complex number string e.g. "4" or "3i" and return a Complex object.
function parseNumber(num) {
    if (num[num.length - 1] !== "i") {
        return new Complex(num);
    } else {
        if (num === "i") num = "1i";
        return new Complex(0, num.substring(0, num.length - 1));
    }
}


let functionText = "";


// Updates the function values and the canvas, and is normally called when the user clicks the "set function" button.
function updateFunction() {
    functionText = document.getElementById("function").value;
    updateFunctionValues(userFunction);
    updateCanvas();
}

// Interprets the function the user has entered and runs it.
function userFunction(num) {

    // Variables assigned using equals symbol, calculated by the function (e.g. =var1)
    let calculatedVars = {};


    let functionList = [];


    let lines = functionText.split("\n").filter(line => line.trim() !== "");
    lines.forEach((line) => {
        parseExpression(line).forEach((token) => {
            functionList.push(token);
        });
    });
    

    // Stack of all the values the function has calculated.
    // Read more here: https://en.wikipedia.org/wiki/Reverse_Polish_notation
    let functionStack = [];
    
    // For each line in the function
    for (let i = 0; i < functionList.length; i++) {
        let line = functionList[i].trim();

        // Check if line is x
        if (line === "x") {
            functionStack.push(num);
        // Check if line should be interpreted or if it is commented out or empty
        } else if (line !== "" && line [0] !== "#") {
            let variableIndex = getVariableIndex(line);
            let isCalculatedVariable = Object.keys(calculatedVars).includes(line);
            

            if (line[0] === "=") {
                // Store last element in the stack as a variable
                calculatedVars[line.substring(1).trim()] = functionStack.pop();

            } else if (operations.hasOwnProperty(line)) {
                // Line is an operation
                let operation = operations[line];
                let values = functionStack.slice(functionStack.length - operation.args);
                let value = Complex[operation.function].apply(this, values);
                functionStack.length -= operation.args;
                functionStack.push(value);
                
            } else if (variableIndex !== -1) {
                // Line is a user defined variable
                functionStack.push(variableList[variableIndex].value);
            
            } else if (isCalculatedVariable) {
                // Line is a calculated variable
                functionStack.push(calculatedVars[line.trim()]);
            } else {
                // Line is a number/constant
                functionStack.push(parseNumber(line));
            }
        }    
    }
    return functionStack;
}


let addVarElementBtn = document.getElementById("addVariableElement");

// Adds a new variable to variableList and updates the HTML document.
// Normally called when the user presses the "add variable" button.
function addVariableElement() {
    variableList.push({
        name: "",
        type: "constant",
        value: new Complex(0, 0),

        min: 0,
        max: 1,
        step: 0.1

    });
    variableListToHTML();
}

// Updates the list of variables based on the values in the HTML document.
// Normally called when the user changes any of the variables.
function updateVariableList(event) {

    let element = event.target;
    
    let parent = element.parentElement;

    let index = Array.prototype.slice.call(parent.parentElement.children).indexOf(parent);

    // Type of the variable (e.g. constant, range or time)
    let type = parent.children[1].value;

    variableList[index].type = type;

    variableList[index].name = parent.children[0].value

    switch (type) {
        case "constant":
            variableList[index].value = new Complex(parent.children[2].value, parent.children[3].value);
            break;
        case "range":
            variableList[index].value = new Complex((parent.children[3].value - parent.children[2].value) * parent.children[4].value * 0.005 + Number(parent.children[2].value));
            variableList[index].min = parent.children[2].value;
            variableList[index].max = parent.children[3].value;
            break;

        // Time is not implemented yet.
        case "time":
            variableList[index].value = element.value;
            break;
    }

    variableListToHTML();
}

// Updates variableList and the HTML document when the user changes the type of the variable.
function updateVariableType(event) {

    let element = event.target;
    
    let parent = element.parentElement;

    let index = Array.prototype.slice.call(parent.parentElement.children).indexOf(parent);

    let type = parent.children[1].value;

    variableList[index].type = type;

    variableListToHTML();
}

var variableTypes = [
    "constant",
    "range",
    "time"
];


function deleteVariable(event) {

    let element = event.target;
    let parent = element.parentElement;

    let index = Array.prototype.slice.call(parent.parentElement.children).indexOf(parent);
    variableList.splice(index, 1);
    variableListToHTML();
    
}

// Turns the list of variables into HTML
function variableListToHTML() {
    let variableElement = document.getElementById("variable-list");
    variableElement.innerHTML = "";

    // For each variable
    for (let i = 0; i < variableList.length; i++) {

        let htmlVariableElement = variableElement.appendChild(document.createElement("li"));
        htmlVariableElement.name = i;

        let html = "";
        let type = variableList[i].type;


        html += `Name: <input class="updateVariables" value="${variableList[i].name}">`
        html += `Type:<select class="updateVariableType">`;
        for (let j = 0; j < variableTypes.length; j++) {
            html += "<option";
            if (variableTypes[j] === type) {
                html += " selected";
            }
            html += ` value="${variableTypes[j]}">${variableTypes[j]}</option>`;
        }
        html += "</select>";

        switch (type) {
            case "constant":
                html += `
                Real part: <input class="updateVariables" type="number" value="${variableList[i].value.re}">
                Imaginary part: <input class="updateVariables" type="number" value="${variableList[i].value.im}">`;
                break;
            case "range":
                let value = variableList[i].value.re;
                value = Number((value + 1E-15).toFixed(13));
                html += `
                Min: <input class="updateVariables" type="number" value="${variableList[i].min}">
                Max: <input class="updateVariables" type="number" value="${variableList[i].max}">
                <input class="updateVariables" type="range" min="0" max="200" value="${200 * ((variableList[i].value.re - variableList[i].min) / (variableList[i].max - variableList[i].min))}">
                <span>${value}</span>`
                break;
            
            // Time mode is not implemented yet
            case "time":
                html += `
                Min: <input class="updateVariables" type="number" value="${variableList[i].min}">
                Max: <input class="updateVariables" type="number" value="${variableList[i].max}">
                Step: <input class="updateVariables" type="number" value="${variableList[i].step}">`
                break;

        }
        html += `<p class="button" onclick="deleteVariable(event)">Delete</p>`



        htmlVariableElement.innerHTML = html;
    }

    // For each HTML element with class "updateVariables"
    [].forEach.call(document.getElementsByClassName("updateVariables"), function (element) {
        
        if (element.type === "range") {
            // Update when the user moves a slider
            element.oninput = function(event) {
                let element = event.target;

                let parent = element.parentElement;

                let index = Array.prototype.slice.call(parent.parentElement.children).indexOf(parent);

                // Read slider value
                let value = (parent.children[3].value - parent.children[2].value) * parent.children[4].value * 0.005 + Number(parent.children[2].value);
            
                variableList[index].value = new Complex(value);
                variableList[index].min = parent.children[2].value;
                variableList[index].max = parent.children[3].value;
                
                // Round slightly
                parent.children[5].innerHTML = Number((value + 1E-15).toFixed(13));
                updateFunctionValues(userFunction);
                updateCanvas();

            };
        }
        element.addEventListener("change", (event) => {
            updateVariableList(event);
        });
    });

    // For the type dropdown element in each variable
    [].forEach.call(document.getElementsByClassName("updateVariableType"), function (element) {
        element.addEventListener("change", (event) => {
            updateVariableType(event);
        });
    });
    updateFunctionValues(userFunction);
    updateCanvas();
}


// "Add variable" button
addVarElementBtn.addEventListener("click", addVariableElement);

// When the user scrolls/zooms over the graph
mainCanvas.addEventListener("wheel", function(event) {
    event.preventDefault(); // Prevent scrolling
    view.zoom = Math.pow(10, Math.log10(view.zoom) + event.deltaY * 0.001);
    updateCanvas();
    
});

let tracingPoint = 0;

function setTracingPoint(clickX, clickY, canvas) {


    let width = canvas.width;
    let height = canvas.height;

    clickX -= width * 0.5 / devicePixelRatio;
    clickY -= height * 0.5 / devicePixelRatio;

    clickY *= -1;

    let unit;
    if (view.projection === "perspective") {
        unit = view.calculateClip([0, 0, 0], [1, 0, 0]);
    } else {
        unit = [new Vector3D(0, 0, 0), new Vector3D(1, 0, 0)];
    }

    let origin = view.projectVector(unit[0].toArray());
    let end = view.projectVector(unit[1].toArray());
    let angleUnit = Math.atan2(end.y - origin.y, end.x - origin.x);
    let distanceUnit = Math.sqrt(Math.pow(end.y - origin.y, 2) + Math.pow(end.x - origin.x, 2));

    let angleClick = Math.atan2(clickY - origin.y, clickX - origin.x);
    let distanceClick = Math.sqrt(Math.pow(clickY - origin.y, 2) + Math.pow(clickX - origin.x, 2));

    tracingPoint = distanceClick / distanceUnit * Math.cos(angleClick - angleUnit);
    updateCanvas();

    document.getElementById("trace-x").value = Math.round(tracingPoint * 100) / 100;
}

document.getElementById("trace-x").addEventListener("change", (event) => {
    tracingPoint = Number(event.target.value);
    updateCanvas();
});



// Used to change the view when the user drags thew cursor/finger over the graph.
// Normally called when the user clicks/touches the graph window.
function rotateGraph(event) {
    let originalX;
    let originalY;
    let originalDistance; // Distance between touch points

    let originalLongitude;
    let originalLatitude;

    // If user has clicked
    if (event.offsetX) {
        originalX = event.offsetX;
        originalY = event.offsetY;
    } else {
        // User has touched
        
        if (event.touches.length > 2) return; // Ignore 3 or more touches

        event.preventDefault();
        if (event.touches.length === 1) {
            // User only touches at one point
            originalX = event.touches[0].pageX;
            originalY = event.touches[0].pageY;
        } else {
            // User touches at several points
            var originalZoom = view.zoom;
            originalX = (event.touches[0].pageX + event.touches[1].pageX) * 0.5;
            originalY = (event.touches[0].pageY + event.touches[1].pageY) * 0.5;
            originalDistance = Math.sqrt(Math.pow(event.touches[0].pageX - event.touches[1].pageX, 2) + Math.pow(event.touches[0].pageY - event.touches[1].pageY, 2));
        }
    }
   

    originalLatitude = view.latitude;
    originalLongitude = view.longitude;

    // User moves the mouse cursoe
    function mousemove(event) {
        view.longitude = originalLongitude - (event.offsetX - originalX) * 0.5;
        view.latitude = originalLatitude + (event.offsetY - originalY) * 0.5;
        updateCanvas();
    }

    // User moves one touch point
    function touchmove(event) {
        let x;
        let y;
        if (event.touches.length === 1) {
            x = event.touches[0].pageX;
            y = event.touches[0].pageY;    
        } else {
            x = (event.touches[0].pageX + event.touches[1].pageX) * 0.5;
            y = (event.touches[0].pageY + event.touches[1].pageY) * 0.5;

            // Zoom based on the distance between the two touch points
            let distance = Math.sqrt(Math.pow(event.touches[0].pageX - event.touches[1].pageX, 2) + Math.pow(event.touches[0].pageY - event.touches[1].pageY, 2));
            view.zoom = originalZoom * (originalDistance / distance);
        }

        view.longitude = originalLongitude - (x - originalX) * 0.5;
        view.latitude = originalLatitude + (y - originalY) * 0.5;

        updateCanvas();
    }
    
    mainCanvas.addEventListener("mousemove", mousemove);
    mainCanvas.addEventListener("mouseup", function() {
        mainCanvas.removeEventListener("mousemove", mousemove);
    })

    mainCanvas.addEventListener("touchmove", touchmove);
    mainCanvas.addEventListener("touchend", function(event) {
        if (event.touches.length === 0) {
            // Remove event listener when user releases all touch points
            mainCanvas.removeEventListener("touchmove", touchmove);
        } else if (event.touches.length === 1) {
            // Reset original values when there is only 1 touch point left.
            originalX = event.touches[0].pageX;
            originalY = event.touches[0].pageY;
            
            originalLatitude = view.latitude;
            originalLongitude = view.longitude;
        }
    });
}

function moveGraph(event) {
    
    let width = mainCanvas.width;
    let height = mainCanvas.height;
    
    let originalX = event.offsetX * devicePixelRatio;
    let originalY = event.offsetY * devicePixelRatio;

    originalX -= width * 0.5;
    originalY -= height * 0.5;
    originalY *= -1;

    let originalOffset = new Vector3D(xOffset, yOffset, zOffset);

    let projectedOriginal = view.getProjectedVector([originalX, originalY]);
    

    function ctrlMove(event) {
        let x = event.offsetX * devicePixelRatio;
        let y = event.offsetY * devicePixelRatio;


        x -= width * 0.5;
        y -= height * 0.5;
        y *= -1;
        
        let projected = view.getProjectedVector([x, y]);
        projected[0] -= projectedOriginal[0];
        projected[1] -= projectedOriginal[1];
        projected[2] -= projectedOriginal[2];
        

        xOffset.value -= projected[0];
        yOffset.value -= projected[1];
        zOffset.value -= projected[2];
        
        updateView();
    }

    mainCanvas.addEventListener("mousemove", ctrlMove);
    mainCanvas.addEventListener("mouseup", () => {
        mainCanvas.removeEventListener("mousemove", ctrlMove);
    });
    
}

mainCanvas.addEventListener("mousedown", (event) => {

    if (event.getModifierState("Shift")) {
        function shiftMove(event) {
            setTracingPoint(event.offsetX, event.offsetY, mainCanvas);
        }

        mainCanvas.addEventListener("mousemove", shiftMove);
        mainCanvas.addEventListener("mouseup", () => {
            mainCanvas.removeEventListener("mousemove", shiftMove);
        });
    } else if (event.ctrlKey) {
        rotateGraph(event);
        
    } else {
        moveGraph(event);
    }
});



mainCanvas.addEventListener("touchstart", rotateGraph);

function isFullscreen() {
    return document.fullscreenElement !== null;
}

// Changes the size of the canvas element.
// Normally called when the window is resized.
function resize() {
    let pixelRatio = window.devicePixelRatio;

    if (isFullscreen()) {
        let width = window.innerWidth * pixelRatio;
        let height = window.innerHeight * pixelRatio;
        
        mainCanvas.width = width;
        mainCanvas.height = height;

    } else {
        let width = mainCanvas.offsetWidth;
        let viewportHeight = window.innerHeight;

        mainCanvas.width = width * pixelRatio;
        mainCanvas.height = viewportHeight * 0.7 * pixelRatio;
    }

    updateCanvas();
}

// Makes the canvas fullscreen
function fullscreen() {
    let pixelRatio = window.devicePixelRatio;

    // Temporarily remove the resize event listener
    window.removeEventListener("resize", resize);

    if (mainCanvas.requestFullscreen) {
        mainCanvas.requestFullscreen();
    } else if (mainCanvas.mozRequestFullScreen) { // Firefox
        mainCanvas.mozRequestFullScreen();
    } else if (mainCanvas.webkitRequestFullscreen) { // Chrome, Safari & Opera
        mainCanvas.webkitRequestFullscreen();
    } else if (mainCanvas.msRequestFullscreen) { // IE/Edge
        mainCanvas.msRequestFullscreen();
    }

    let width = window.innerWidth * pixelRatio;
    let height = window.innerHeight * pixelRatio;

    mainCanvas.width = width;
    mainCanvas.height = height;
    
    window.addEventListener("resize", resize);
}

// Projection dropdown event listener
document.getElementById("projection").addEventListener("change", function(event) {
    let type = event.target.value;
    view.projection = type;
    updateCanvas();
});

document.addEventListener("keydown", (event) => {
    if (event.code === "KeyQ" && event.ctrlKey) {
        view.snap();
    }
});

window.onload = () => {
    window.addEventListener("resize", resize);

    // Show default variables (e and pi)
    variableListToHTML();

    // Initial sizing. Called twice because the first resize might change the
    // scroll bar on the right, changeing the width. Weird stuff.
    resize();
    resize();
}

