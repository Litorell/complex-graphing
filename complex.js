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

    
    // The available operations.
    // The keys are the names the user enters in the function window, while function is the corresponding function in the Complex class.
    static operations = {
        "+": {args: 2, function: "add"},
        "-": {args: 2, function: "subtract"},
        "*": {args: 2, function: "multiply"},
        "/": {args: 2, function: "divide"},
        "^": {args: 2, function: "raise"},
        "ln": {args: 1, function: "ln"},
        "abs": {args: 1, function: "abs"},
        "sin": {args: 1, function: "sin"},
        "cos": {args: 1, function: "cos"},
        "tan": {args: 1, function: "tan"},
        "asin": {args: 1, function: "asin"},
        "acos": {args: 1, function: "acos"},
        "atan": {args: 1, function: "atan"}
    };

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

    // Sine
    static sin(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        let e = new Complex(Math.E);
        let c = Complex;

        // (e^(-ix) - e^(ix)) * 0.5i
        return c.multiply(c.subtract(c.raise(e, c.multiply(new c(0, -1), num1)), c.raise(e, c.multiply(new c(0, 1), num1))), new c(0, 0.5));
    }

    // Cosine
    static cos(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        let e = new Complex(Math.E);
        let c = Complex;

        // (e^(ix) + e^(-ix)) * 0.5
        return c.multiply(c.add(c.raise(e, c.multiply(new c(0, 1), num1)), c.raise(e, c.multiply(new c(0, -1), num1))), 0.5);
    }

    // Tangent
    static tan(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        return Complex.divide(Complex.sin(num1), Complex.cos(num1));
    }

    // Inverse sine
    static asin(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        let c = Complex;
        
        // -i * ln(ix + sqrt(1 - x^2))
        return c.multiply(new c(0, -1), c.ln(c.add(c.multiply(num1, new c(0, 1)), c.raise(c.subtract(1, c.raise(num1, 2)), 0.5))));
    }

    // Inverse cosine
    static acos(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);

        return Complex.subtract(new Complex(Math.PI / 2), Complex.asin(num1));
    }

    // Inverse tangent
    static atan(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        let c = Complex;
        let iz = c.multiply(new Complex(0, 1), num1);

        // i/2*ln((1-i*z)/(1+i*z))
        return c.multiply(new c(0, 0.5), c.ln(c.divide(c.subtract(1, iz), c.add(1, iz))));
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

