# How to use the complex graphing calculator
[Swedish version](https://github.com/OscarLitorell/complex-graphing/blob/master/user-manual/swedish.md)

### Sections

*   [The graphing window](#the-graphing-window)
*   [The function window](#the-function-window)
*   [The variable window](#the-variable-window)
*   [Functions worth trying](#functions-worth-trying)

## The graphing window

The graphing window is the section of the page containing the graph itself.

You can rotate the graph by clicking and dragging, as well as zoom by scrolling on it.

The graph has three axes, red, green and blue. The green axis shows the input value (i.e. x), and the two other axes show the output value. The red (vertical) axis shows the real part of the output while the blue (horizontal) axis shoes the imaginary part. The positive side of each graph is marked with a "1".

When rotating the graph, it initially rotates around the point (0, 0, 0) but this can be changed by changing the values for "x Offset", "Real Offset" and "Imaginary Offset".

You can also change the range of the graph with "Graph starts at" and "Graph ends at".

"Graph resolution" changes the resolution of the graph, i.e. the distance between each point.

To change the projection of the graph you can choose between perspective and orthographic mode. Perspective is more like what the human eye normally sees, but the orthographic mode makes parallel line remain parallel.

It's also possible to view the graph in full screen mode by clicking "Set fullscreen". ESC and F11 exit fullscreen mode.

## The function window

The function window is the section of the page where you can enter functions.

The function window uses [Reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation), also known as Postfix notation, which is not what we normally use to write functions.

Simply put, it's like a mix between the way we normally write functions and programming.

It is based around each line containing either an operation (e.g. +, -, or *) or a number.

Instead of the operation sign being **between** the operands, it is **after** the operands, hence the name "Postfix". For instance, instead of writing

```
2 + x
```

you write

```
2  
x  
+
```

Most operations use the two last operands before the operation sign, which means that parentheses are not required (or used) since you can choose the order of operations yourself. Example:

```
(x + 4)^2
```

translates to

```
x  
4  
+  
2  
^
```

You can imagine that the order is

```
((x 4 +) 2 ^)
```

Example 2:

```
2^(x + 4)
```

translates to

```
2  
x  
4  
+  
^
```

You can imagine that the order is

```
(2 (x 4 +) ^)
```

### The three types

There are three different things you can write on each line: variables, constants and operations.

Variables are easy to understand, the only thing you have to write is the name of the variable, which can have one or more characters. More info under the [Variable window](#variables) section. x is also considered to be a variable.

To store a value inside a variable you write = and then the name of the variable. For instance, to store the value of 2 + x in the variable a you write:

```
2  
x  
+  
=a
```

These variables are not the same as the ones found in the variable window. The value of each _calculated_ variable is unique for each value of x. You could say it's more like storing a function. To later use the variable, you only need to write the name of the variable again.

For constants, i.e. ordinary numbers, you only need to enter a number. A few examples:

```
2  
-4.67  
i  
-2.6 + 0.4i  
-i+5
```

You don't need to worry about the order or white spacing.

The third type is operations, which there are a total of 10 of. These are:

*   **+** (adds the two last numbers)
*   **-** (subtracts the last number from the second to last number)
*   **\*** (multiplies the two last numbers)
*   **/** (divides the last number with the second to last number)
*   **^** (raises the second to last number to the last number)
*   **ln** (returns the natural logarithm of the last number)
*   **abs** (returns the absolute value of the last number, i.e. the distance from zero)
*   **sin** (the sine function)
*   **cos** (the cosine function)
*   **tan** (the tangent function)

You can also comment out lines by starting the line with #. Empty lines are ignored as well.

### Multiple functions

To display multiple functions in the same window, you only need to write them after each other. For instance, if you'd like to write the functions x+5 and 2<sup>x</sup> you could write:

```
x  
5  
+  

2  
x  
^
```

## The variable window

The variable window can be used to create and edit variables, without editing the function.

Initially, there are already two variables by default - e and pi.

There are two (or three) types of variables:

*   constant - A constant has two values which you can enter, the real part and the imaginary.
*   range - Range variables have a minimum and maximum value, and a slider which adjusts the value of the variable. The graph is updated continously when moving the slider.
*   time - This type of variable is not yet implemented, but the idea is that it automatically adjusts the value of the variable continously.

## Functions worth trying

Here's a list of a few interesting things worth trying.

### x<sup>x</sup>

The function x<sup>x</sup>, which is written as:

```
x  
x  
^
```

### x<sup>n</sup>

You might have noticed that all x<sup>n</sup> functions with even values of n return positive numbers for negative values of x and look like a "u", while negative values of n return negative values and look more like a backwards "s". What would happen for values in between?

Try writing the function

```
x  
n  
^
```

Add a variable with the name "n", and select the type "range". Set "min" to 1 and "max" to 4\. What happens when you adjust the slider?

### Euler's formula

You might have heard about [Euler's formula](https://en.wikipedia.org/wiki/Euler%27s_formula), e<sup>ix</sup>. How does it actually look? You can try by entering the function

```
e  
i  
x  
*  
^
```

At this point it could also be a good idea to change the range of the function, and set the start and end points to something like -10 and 10\. Look at the real and imaginary part. What functions do they look like?