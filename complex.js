/**
 * @file Contains the Complex class.
 * 
 * @copyright Oscar Litorell 2019
 */


/**
 * Represents a complex number.
 */
class Complex {
    /**
     * @param {number} [re] - The real component of the complex number.
     * @param {number} [im] - The imaginary component of the complex number.
     */
    constructor(re=0, im=0) {
        this.re = Number(re);
        this.im = Number(im);    
    }

    /**
     * Formats a complex number nicely. Rounds the number to the given length.
     * @param {number} [decimals] - Number of decimals to use.
     */
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

    /**
     * Create a complex number from polar coordinates.
     * @param {number} r - Distance from 0 (absolute value).
     * @param {number} theta - Angle from the number to 0 + 0i to 1 + 0i.
     * @returns {Complex}
     */
    static fromPolar(r, theta) {
        let re = r * Math.cos(theta);
        let im = r * Math.sin(theta);
        return new Complex(re, im);
    }

    /**
     * Add two numbers.
     * @param {number|Complex} num1 
     * @param {number|Complex} num2 
     * @returns {Complex}
     */
    static add(num1, num2) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        if (num2.constructor !== Complex) num2 = new Complex(num2);

        let out = new Complex();
        out.re = num1.re + num2.re;
        out.im = num1.im + num2.im;
        return out;
    }

    /**
     * Subtract one number from another.
     * @param {number|Complex} num1 
     * @param {number|Complex} num2 
     * @returns {Complex}
     */
    static subtract(num1, num2) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        if (num2.constructor !== Complex) num2 = new Complex(num2);

        let out = new Complex();
        out.re = num1.re - num2.re;
        out.im = num1.im - num2.im;
        return out;
    }

    /**
     * Multiply two numbers.
     * @param {number|Complex} num1 
     * @param {number|Complex} num2 
     * @returns {Complex}
     */
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

    /**
     * Divide one number with another.
     * @param {number|Complex} num1 
     * @param {number|Complex} num2 
     * @returns {Complex}
     */
    static divide(num1, num2) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        if (num2.constructor !== Complex) num2 = new Complex(num2);
        num2 = Complex.raise(num2, -1);
        return Complex.multiply(num1, num2);
    }

    /**
     * Natural logarithm.
     * @param {number|Complex} num1 
     * @returns {Complex}
     */
    static ln(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        let polar = Complex.toPolar(num1);
        return new Complex(Math.log(polar.r), polar.theta);
    }

    /**
     * Sine.
     * @param {number|Complex} num1 
     * @returns {Complex}
     */
    static sin(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        let e = new Complex(Math.E);
        let c = Complex;

        // (e^(-ix) - e^(ix)) * 0.5i
        return c.multiply(c.subtract(c.raise(e, c.multiply(new c(0, -1), num1)), c.raise(e, c.multiply(new c(0, 1), num1))), new c(0, 0.5));
    }

    /**
     * Cosine.
     * @param {number|Complex} num1 
     * @returns {Complex}
     */
    static cos(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        let e = new Complex(Math.E);
        let c = Complex;

        // (e^(ix) + e^(-ix)) * 0.5
        return c.multiply(c.add(c.raise(e, c.multiply(new c(0, 1), num1)), c.raise(e, c.multiply(new c(0, -1), num1))), 0.5);
    }

    /**
     * Tangent.
     * @param {number|Complex} num1 
     * @returns {Complex}
     */
    static tan(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        return Complex.divide(Complex.sin(num1), Complex.cos(num1));
    }

    /**
     * Inverse sine / arcsin.
     * @param {number|Complex} num1 
     * @returns {Complex}
     */
    static asin(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        let c = Complex;
        
        // -i * ln(ix + sqrt(1 - x^2))
        return c.multiply(new c(0, -1), c.ln(c.add(c.multiply(num1, new c(0, 1)), c.raise(c.subtract(1, c.raise(num1, 2)), 0.5))));
    }

    /**
     * Inverse cosine / arccos.
     * @param {number|Complex} num1 
     * @returns {Complex}
     */
    static acos(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);

        return Complex.subtract(new Complex(Math.PI / 2), Complex.asin(num1));
    }

    /**
     * Inverse tangent / arctan.
     * @param {number|Complex} num1 
     * @returns {Complex}
     */
    static atan(num1) {
        if (num1.constructor !== Complex) num1 = new Complex(num1);
        let c = Complex;
        let iz = c.multiply(new Complex(0, 1), num1);

        // i/2*ln((1-i*z)/(1+i*z))
        return c.multiply(new c(0, 0.5), c.ln(c.divide(c.subtract(1, iz), c.add(1, iz))));
    }

    /**
     * Raise one number to another.
     * @param {number|Complex} num1 
     * @param {number|Complex} num2 
     * @returns {Complex}
     */
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

    /**
     * The absolute value of a complex number.
     * @param {Complex} num1 
     * @returns {Complex}
     */
    static abs(num) {
        if (num.constructor !== Complex) return new Complex(Math.abs(num));
        return new Complex(Math.pow(Math.pow(num.re, 2) + Math.pow(num.im, 2), 0.5));
    }

    /**
     * To Polar coordinates (radius and angle).
     * @param {Complex} num 
     * @returns {Object} {"r": r, "theta": theta}
     */
    static toPolar(num) {
        let r = Complex.abs(num).re;
        let theta = Math.atan2(num.im, num.re);
        return {
            r: r,
            theta: theta
        };
    }
}
