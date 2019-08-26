# How to use the complex graphing calculator
[Swedish version](https://github.com/OscarLitorell/complex-graphing/blob/master/user-manual/swedish.md)

[Link to the calculator](https://oscarlitorell.github.io/complex-graphing/)

[GitHub repository](https://github.com/OscarLitorell/complex-graphing)

### Sections

*   [The graphing window](#the-graphing-window)
*   [The function window](#the-function-window)
*   [The variable window](#the-variable-window)
*   [Functions worth trying](#functions-worth-trying)

<hr>

## The graphing window

The graphing window is the section of the page containing the graph itself.

The graph has three axes, red, green and blue. The green axis shows the input value (i.e. x), and the two other axes show the output value. The red (vertical) axis shows the real part of the output while the blue (horizontal) axis shoes the imaginary part. The positive side of each graph is marked with a "1".

### Mouse Controls

*   **Clicking and dragging** moves the graph around translationally.
*   **CTRL-clicking and dragging** rotates the graph around.
*   **Shift-clicking and dragging** moves the tracing point.
*   **Scrolling** zooms in and out.
*   **CTRL-Q** snaps the viewing angle to the closest 45 degrees (both longitudinally and laterally).
*   **CTRL-I** snaps the center of rotation to an integer position.

### Touch Controls

*   **Dragging with one finger** rotates the graph around.
*   **Dragging with two fingers** moves the graph around translationally.
*   **Pinching with two fingers** zooms in and out.

### Buttons and fields

**Trace x** is used to see the exact output values for a input value.

**Graph starts at** and **Graph ends at** control the range/domain of the graph.

**Graph resolution** controls the resolution of the graph, i.e. the distance between each point.

**Perspective/Orthogonal** determines the projection of the window. Perspective is more like what the human eye normally sees, but the orthogonal mode makes parallel line remain parallel.

**Set fullscreen** displays the graph in full screen mode. ESC and F11 exit fullscreen mode.

**x Offset**, **Real Offset** and **Imaginary Offset** are used to translate the graph manually.

<hr>

## The function window

The function window is the section of the page where you can enter functions. 

There is a total of 13 operations:

*   **+** (addition)
*   **-** (subtraction)
*   **\*** (multiplication)
*   **/** (division)
*   **^** (exponents)
*   **ln()** (the natural logarithm)
*   **abs()** (the absolute value of a complex number, i.e. the distance from zero)
*   **sin()** (sine)
*   **cos()** (cosine)
*   **tan()** (tangent)
*   **asin()** (inverse sine, arcsin, sin<sup>-1</sup>)
*   **acos()** (inverse cosine, arccos, cos<sup>-1</sup>)
*   **atan()** (inverse tangent, arctan, tan<sup>-1</sup>)

It works as you would expect, you can write a normal mathematical expression and the calculator will evaluate it for all values of x. Example:

```
2 + sin(x)
```

### Multiple functions

To display multiple functions in the same window, you only need to write them after each other. For instance, if you'd like to write the functions x+5 and 2<sup>x</sup> you could write:

```
x + 5 
2 ^ x
```

You can comment out lines by starting the line with #. Empty lines are ignored as well.

### Storing variables

It is possible to store results of a function. To store a value inside a variable you write = on the next line and then the name of the variable. For instance, to store the value of 2 + x in the variable a you write:

```
2 + x  
=a
```

These variables are not the same as the ones found in the variable window. The value of each _calculated_ variable is unique for each value of x. You could say it's more like storing a function. To use the variable, just use the variable as part of a later expression. Example:

```
2 + x
=a
e ^ a * a
```

is equivalent to writing

```
e ^ (2 + x) * (2 + x)
```

### Reverse Polish Notation
In addition, it is possible to use [Reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation) (also known as Postfix notation) to write functions. You do this by writing your numbers, variables and operators on separate lines after each other. The function
```
2 + sin(x)
```

would be written as

```
2
x
sin
+
```

You can also mix writing in RPN and infix. An example:

```
3 * x
2 ^ x
+
```

is equivalent to writing

```
(3 * x) + (2 ^ x)
```

<hr>

## The variable window

The variable window can be used to create and edit variables and constants, without editing the function.

Initially, there are already two variables by default - e and pi.

There are two types of variables:

*   constant - A constant has two values which you can enter, the real part and the imaginary.
*   range - Range variables have a minimum and maximum value, and a slider which adjusts the value of the variable. The graph is updated continously when moving the slider.

<hr>

## Functions worth trying

Here's a list of a few interesting things worth trying.

### x<sup>x</sup>

The function x<sup>x</sup>, which is written as:

```
x ^ x
```

### x<sup>n</sup>

You might have noticed that all x<sup>n</sup> functions with even values of n return positive numbers for negative values of x and look like a "u", while negative values of n return negative values and look more like a backwards "s". What would happen for values in between?

Try writing the function

```
x ^ n
```

Add a variable with the name "n", and select the type "range". Set "min" to 1 and "max" to 4\. What happens when you adjust the slider?

### Euler's formula

You might have heard about [Euler's formula](https://en.wikipedia.org/wiki/Euler%27s_formula), e<sup>ix</sup>. How does it actually look? You can try by entering the function

```
e ^ (i * x)
```

At this point it could also be a good idea to change the range of the function, and set the start and end points to something like -10 and 10\. Look at the real and imaginary part. What functions do they look like?