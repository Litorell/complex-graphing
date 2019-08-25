/**
 * @file Main script of the complex graphing calculator.
 * 
 * @copyright Oscar Litorell 2019
 */

/**
 * Used for parsing infix expressions, and converting them to postfix.
 * @hideconstructor
 */
class ExpressionParser {
    /**
     * Check if a character is a number or decimal.
     * @param {string} char
     * @returns {boolean}
     */
    static isNumeral(char) {
        return "0123456789.".includes(char);
    }

    /**
     * Check if a character is a letter of the alphabet.
     * @param {string} char 
     * @returns {boolean}
     */
    static isAlpha(char) {
        return (char.toLowerCase() !== char.toUpperCase());
    }

    /**
     * Get the type of a character, i.e. of it's a number, letter of the alphabet or something else.
     * @param {string} char 
     * @returns {string} "number", "alpha" or "other"
     */
    static getType(char) {
        if (ExpressionParser.isNumeral(char)) return "number";
        if (ExpressionParser.isAlpha(char)) return "alpha";
        return "other";
    }

    /**
     * Get the token at a given index in an expression.
     * @param {string} expression - The expression that should be parsed.
     * @param {number} index - The index where the token begins.
     * @returns {string} The complete token.
     */
    static parseToken(expression, index) {
        let char = expression[index];

        let oneChars = "+-*/^()";

        let type;

        if (oneChars.includes(char)) {
            return char;
        } else {
            type = ExpressionParser.getType(expression[index]);
        }


        for (var i = index + 1; i < expression.length; i++) {
            if (ExpressionParser.getType(expression[i]) !== type) {

                // If last character is not i
                if (!(expression[i] === "i" && (ExpressionParser.getType(expression[i - 1]) === type))) break;
            };
        }

        let token = expression.substring(index, i);

        return token;
    }


    /**
     * Check if a token is a function.
     * @param {string} token
     * @returns {boolean}
     */
    static isFunction(token) {
        return (token in operations && operations[token].args === 1);
    }

    /**
     * Check if a token is an operator.
     * @param {string} token 
     * @returns {boolean}
     */
    static isOperator(token) {
        return (token in operations && operations[token].args === 2);
    }

    /**
     * Check if a token is a number
     * @param {string} token 
     * @returns {boolean}
     */
    static isNumber(token) {
        return (token === "i" || ExpressionParser.isNumeral(token[0]));
    }



    /**
     * Parse an infix notation expression into a postfix expression. Logic is taken largely from wikipedia:
     * <br>
     * <a href="https://en.wikipedia.org/wiki/Shunting-yard_algorithm#The_algorithm_in_detail">https://en.wikipedia.org/wiki/Shunting-yard_algorithm#The_algorithm_in_detail</a>
     * @param {string} expression - The expression to parse written in infix notation.
     * @returns {string[]} The postfix expression stack.
     * @example
     * // returns ["2", "4", "3", "-", "*"]
     * ExpressionParser.parseExpression("2*(4-3)")
     */
    static parseExpression(expression) {
        let operators = {
            "^": {associativity: "right", precedence: 4},
            "*": {associativity: "left", precedence: 3},
            "/": {associativity: "left", precedence: 3},
            "+": {associativity: "left", precedence: 2},
            "-": {associativity: "left", precedence: 2}
        }

        expression = expression.replace(/\s/g, "").replace(/\(-/g, "(0-");
        if (expression[0] === "-") expression = "0" + expression;

        let operatorStack = [];
        let outputQueue = [];


        for (let i = 0; i < expression.length;) {
            let token = ExpressionParser.parseToken(expression, i);

            i += token.length;       

            if (ExpressionParser.isFunction(token)) {
                operatorStack.push(token);
            } else if (ExpressionParser.isOperator(token)) {
                let top = operatorStack[operatorStack.length - 1];
                while (operatorStack.length > 0 && (ExpressionParser.isFunction(top)
                    || (ExpressionParser.isOperator(top) && operators[top].precedence > operators[token].precedence)
                    || (ExpressionParser.isOperator(top) && operators[top].precedence === operators[token].precedence && operators[top].associativity === "left"))
                    && (top !== "(")) {
                    outputQueue.push(operatorStack.pop());
                    top = operatorStack[operatorStack.length - 1];
                }
                operatorStack.push(token);
            } else if (token === "(") {
                operatorStack.push(token);
            } else if (token === ")") {
                while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== "(") {
                    outputQueue.push(operatorStack.pop())
                }
                if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] === "(") {
                    operatorStack.pop();
                }
            } else {
                outputQueue.push(token);
            }

        }

        while (operatorStack.length > 0) {
            outputQueue.push(operatorStack.pop())
        }

        return outputQueue;
    }
}