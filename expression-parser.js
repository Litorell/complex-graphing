

function isNumeral(char) {
    return "0123456789.".includes(char);
}

function isAlpha(char) {
    return (char.toLowerCase() !== char.toUpperCase());
}

function getType(char) {
    if (isNumeral(char)) return "number";
    if (isAlpha(char)) return "alpha";
    return "other";
}


function parseToken(expression, index) {
    let char = expression[index];

    let oneChars = "+-*/^()";

    let type;

    if (oneChars.includes(char)) {
        return char;
    } else {
        type = getType(expression[index]);
    }


    for (var i = index + 1; i < expression.length; i++) {
        if (getType(expression[i]) !== type) {

            // If last character is not i
            if (!(expression[i] === "i" && (getType(expression[i - 1]) === type))) break;
        };
    }

    let token = expression.substring(index, i);

    return token;
}

function isFunction(token) {
    return (token in Complex.operations && Complex.operations[token].args === 1);
}

function isOperator(token) {
    return (token in Complex.operations && Complex.operations[token].args === 2);
}

function isNumber(token) {
    return (token === "i" || isNumeral(token[0]));
}


// https://en.wikipedia.org/wiki/Shunting-yard_algorithm#The_algorithm_in_detail

function parseExpression(expression) {
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
        let token = parseToken(expression, i);

        i += token.length;       

        if (isFunction(token)) {
            operatorStack.push(token);
        } else if (isOperator(token)) {
            let top = operatorStack[operatorStack.length - 1];
            while (operatorStack.length > 0 && (isFunction(top)
                || (isOperator(top) && operators[top].precedence > operators[token].precedence)
                || (isOperator(top) && operators[top].precedence === operators[token].precedence && operators[top].associativity === "left"))
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