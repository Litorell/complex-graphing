# Hur man använder den komplexa grafräknaren
[English version](https://github.com/OscarLitorell/complex-graphing/blob/master/user-manual/english.md)

[Länk till räknaren](https://oscarlitorell.github.io/complex-graphing/)

[GitHub repository](https://github.com/OscarLitorell/complex-graphing)

### Delar

*   [Graffönstret](#graffönstret)
*   [Funktionsfönstret](#funktionsfönstret)
*   [Variabelfönstret](#variabelfönstret)
*   [Exempelfunktioner du kan testa](#exempelfunktioner-du-kan-testa)

---

## Graffönstret

Graffönstret är den del av sidan där man kan se självaste grafen, som utgör den största delen av fönstret.

Grafen har tre axlar, röd, grön och blå. Den gröna axeln visar in-värdet (d.v.s. x), och de två andra axlarna visar utvärdet. Den röda (lodräta) axeln visar utvärdets reella del medan den blåa (vågräta) axeln visar utvärdets imaginära del. Den positiva sidan av respektive axel är markerad med en 1:a.

### Muskontroller

*   **Klicka och dra** förflyttar grafen.
*   **CTRL- eller skrollklicka och dra** roterar grafen.
*   **Shift-klicka och dra** flyttar trace-rutan.
*   **Skrollning** zoomar in och ut.
*   **CTRL-Q** roterar visningsvinkeln till de närmaste 45 graderna.
*   **CTRL-I** flyttar grafen till en heltalsposition.

### Touch-kontroller

*   **Dra med ett finger** roterar grafen.
*   **Dra med två fingrar** förflyttar grafen.
*   **Nypa med två fingrar** zoomar in och ut.

### Knappar och textrutor

**Trace x** används för att se funktionens exakta resultat för ett givet invärde.

**Graph starts at** och **Graph ends at** bestämmer funktionens definitionsmängd.

**Graph resolution** bestämmer grafens upplösning, d.v.s längden på stegen mellan punkterna som beräknas.

**Projection** bestämmer fönstrets projektions. Perspektivläget är mer likt det vi är vana vid att se, medan det ortogonala läget gör att parallella linjer alltid visas parallella och att linjer längre bort inte blir mindre.

**Set fullscreen** visar grafen i helskärmsläge. Tryck på ESC eller F11 för att återgå till det vanliga läget.

**x Offset**, **Real Offset** och **Imaginary Offset** används för att förflytta grafen manuellt.

---

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

---

## Variabelfönstret

Variabelfönstret kan användas för att skapa och justera variabler och konstanter utan att ändra på funktionen.

Det finns till att börja med redan två variabler, e och pi.

Det finns två olika sorters variabler:

*   constant - En konstant har ett värde som kan kan skriva in. Det går att specificera både den reella och imaginära delen.
*   range - Range-variabler har ett min- och max-värde, och en slider där man kan justera värdet på variabeln. Grafen uppdateras kontinuerligt när man justerar slidern, vilket kan vara användbart.

---

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