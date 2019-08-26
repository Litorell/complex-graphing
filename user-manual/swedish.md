# Hur man använder den komplexa grafräknaren
[English version](https://github.com/OscarLitorell/complex-graphing/blob/master/user-manual/english.md)

[Länk till räknaren](https://oscarlitorell.github.io/complex-graphing/)

[GitHub repository](https://github.com/OscarLitorell/complex-graphing)

### Delar

*   [Graffönstret](#graffönstret)
*   [Funktionsfönstret](#funktionsfönstret)
*   [Variabelfönstret](#variabelfönstret)
*   [Exempelfunktioner du kan testa](#exempelfunktioner-du-kan-testa)

## Graffönstret

Graffönstret är den del av sidan där man kan se självaste grafen, som utgör den största delen av fönstret.

Det går att rotera grafen genom att klicka och dra på den, samt att zooma in genom att scrolla ovanpå den.

Grafen har tre axlar, röd, grön och blå. Den gröna axeln visar in-värdet (d.v.s. x), och de två andra axlarna visar utvärdet. Den röda (lodräta) axeln visar utvärdets reella del medan den blåa (vågräta) axeln visar utvärdets imaginära del. Den positiva sidan av respektive axel är markerad med en 1:a.

När man roterar grafen roterar den till att börja med alltid runt punkten (0, 0, 0) men detta går att ändra på genom att ändra värdena för "x Offset", "Real Offset" och "Imaginary Offset".

Det går att ändra funktionens definitionsmängd med värdena för "Graph starts at" och "Graph ends at".

Det går också att ändra vilken grafens upplösning med "Graph resolution", som är längden på steget mellan de olika punkterna som beräknas.

För att ändra grafens projektion kan man välja mellan "perspective" och "orthographic". Perspektivläget är mer likt det vi är vana vid att se, medan det ortografiska läget gör att parallella linjer också visas parallella och att linjer längre bort inte blir mindre.

Det går även att se grafen i helskärmsläge genom att klicka på "Set fullscreen". Tryck på ESC eller F11 för att återgå till det vanliga läget.

## Funktionsfönstret

Funktionsfönstret är den del av sidan där man kan skriva in funktioner.

Det finns totalt 13 funktioner:

*   **+** (addition)
*   **-** (subtraktion)
*   **\*** (multiplikation)
*   **/** (division)
*   **^** (exponenter)
*   **ln()** (naturliga logaritmen)
*   **abs()** (absolutvärdet av ett komplext tal, d.v.s. avståndet till 0.)
*   **sin()** (sinus)
*   **cos()** (cosinus)
*   **tan()** (tangens)
*   **asin()** (arcsin, sin<sup>-1</sup>)
*   **acos()** (arccos, cos<sup>-1</sup>)
*   **atan()** (arctan, tan<sup>-1</sup>)

Räknaren fungerar som förväntat, man kan skriva ett vanligt matematiskt uttryck och räknaren beräknar svaret för alla värden på x. Exempel:

```
2 + sin(x)
```

### Flera funktioner

För att visa flera funktioner på samma graf behöver du bara skriva dem efter varandra. Om man t.ex. vill skriva funktionerna x+5 och 2<sup>x</sup> kan man skriva:

```
x + 5 
2 ^ x
```

Det går att kommentera ut rader genom att skriva # längst fram. Tomma rader ignoreras också.

### Lagra variabler

Det går att lagra resultaten från en funktion. För att spara ett värde i en variabel skriver man = och namnet på variabeln. För att t.ex. spara värdet på 2 + x i varabeln a skriver man:

```
2 + x  
=a
```

Dessa variabler är inte samma sorts variabler som används i variabelfönstret. Värdet på varje _beräknad_ variabel är unikt för varje x-värde. Man kan alltså säga att det är mer likt att spara en funktion. För att använda variabeln skriver man bara variablens namn i ett senare uttryck. Exempel:

```
2 + x
=a
e ^ a * a
```

motsvarar att skriva

```
e ^ (2 + x) * (2 + x)
```

### Omvänd polsk notation
Det går även att använda [omvänd polsk notation](https://sv.wikipedia.org/wiki/Omv%C3%A4nd_polsk_notation), även kallat "Reverse Polish notation" (RPN) och "Postfix Notation" för att skriva funktioner. Detta gör man genom att skriva sina tal, variabler och operationer på separata rader efter varandra. Funktionen

```
2 + sin(x)
```

skrivs istället som

```
2
x
sin
+
```

Det går även att blanda RPN och infix. Ett exempel:

```
3 * x
2 ^ x
+
```

motsvarar att skriva

```
(3 * x) + (2 ^ x)
```

## Variabelfönstret

Variabelfönstret kan användas för att skapa och justera variabler och konstanter utan att ändra på funktionen.

Det finns till att börja med redan två variabler, e och pi.

Det finns två olika sorters variabler:

*   constant - En konstant har ett värde som kan kan skriva in. Det går att specificera både den reella och imaginära delen.
*   range - Range-variabler har ett min- och max-värde, och en slider där man kan justera värdet på variabeln. Grafen uppdateras kontinuerligt när man justerar slidern, vilket kan vara användbart.

## Exempelfunktioner du kan testa

Här är en lista med några intressanta saker man kan testa.

### x<sup>x</sup>

Funktionen x<sup>x</sup>, som skrivs som:

```
x ^ x
```

### x<sup>n</sup>

Du har säkert märkt att alla x<sup>n</sup>-funktioner med jämna n-värden ger positiva tal för negativa x-värden och ser ut som ett "u", medan de med udda n-värden ger negativa värden och ser ut som ett omvänt "s". Vad händer om man skulle testa ett värde mitt emellan?

Testa att skriva in funktionen

```
x ^ n
```

Lägg sedan till en variabel med namnet "n" och välj typen "range". Sätt "min" till 1 och "max" till "4". Vad händer när man ändrar på slidern?

### Eulers formel

Du kanske har hört talas om [Eulers formel](https://sv.wikipedia.org/wiki/Eulers_formel), e<sup>ix</sup>. Hur ser den egentligen ut? Du kan testa genom att skriva funktionen

```
e ^ (i * x)
```

I detta läge kan det också vara bra att öka funktionens definitionsmängd i båda riktningarna, t.ex. till -10 och 10\. Kolla på den reella respektiva imaginära delen. Vilka funktioner ser det ut som?