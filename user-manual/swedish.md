# Hur man använder den komplexa grafräknaren
[English version](https://github.com/OscarLitorell/complex-graphing/blob/master/user-manual/english.md)

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

Funktionsfönstret är den del av sidan där man kan skriva in en funktion/funktioner.

Funktionsfönstret använder sig inte av det sätt att skriva funktioner som vi normalt använder utan använder sig istället av ett sätt som kallas för [omvänd polsk notation](https://sv.wikipedia.org/wiki/Omv%C3%A4nd_polsk_notation), även kallat "Reverse Polish notation" (RPN) och "Postfix Notation".

Kort sagt kan man säga att det är en blandning av att skriva funktioner på det sätt vi är vana vid och att programmera.

Det bygger på att varje rad antingen har en operation (t.ex. +, - eller *) eller ett tal.

Istället för att ha operationstecknet **mellan** operanderna har man det istället **efter**, därav namnet "Postfix". Istället för att t.ex. skriva

```
2 + x
```

skriver man istället

```
2  
x  
+
```

De flesta operationerna använder sig av de två operanderna innan operationstecknet, vilket innebär att man inte behöver (eller kan) använda parenteser eftersom man helt själv kan bestämma vilken ordning funktionens operationer skall beräknas. Exempel:

```
(x + 4)^2
```

blir

```
x  
4  
+  
2  
^
```

Man kan alltså tänka att ordningen blir

```
((x 4 +) 2 ^)
```

Exempel 2:

```
2^(x + 4)
```

blir

```
2  
x  
4  
+  
^
```

Man kan alltså tänka att ordningen blir

```
(2 (x 4 +) ^)
```

### De tre typerna

Det finns tre olika saker man kan skriva på varje rad: variabler, konstanter och operationer.

Variabler är enkla, det enda man behöver skriva på raden är variablens namn, som kan ha ett eller flera tecken. Se mer information under rubriken ["Variabelfönstret"](#variables). x räknas också som en variabel.

För att spara ett värde i en variabel skriver man = och namnet på variabeln. För att t.ex. spara värdet på 2 + x i varabeln a skriver man:

```
2  
x  
+  
=a
```

Dessa variabler är inte samma sorts variabler som används i variabelfönstret. Värdet på varje _beräknad_ variabel är unikt för varje x-värde. Man kan alltså säga att det är mer likt att spara en funktion. För att använda variabeln skriver man bara variablens namn igen.

För konstanter, d.v.s. vanliga tal behöver man bara skriva in ett tal. Några exempel:

```
2  
-4.67  
i  
-2.6 + 0.4i  
-i+5
```

Man behöver alltså inte oroa sig över mellanslag eller ordning.

Den tredje typen är operationer, som det i nuläget finns 10 av. Dessa är:

*   **+** (adderar de två föregående talen)
*   **-** (subtraherar det föregående talet från talet två positioner innan)
*   **\*** (multiplicerar de två föregående talen)
*   **/** (dividerar talet två positioner innan med det föregående talet)
*   **^** (höjer upp talet två positioner innan med det föregående talet)
*   **ln** (ger naturliga logaritmen på det föregående talet)
*   **abs** (ger absolutvärdet på det föregående talet, d.v.s. avståndet mellan talet och noll)
*   **sin** (sinusfunktionen)
*   **cos** (cosinusfunktionen)
*   **tan** (tangensfunktionen)

Det går även att kommentera ut rader genom att skriva # längst fram. Tomma rader ignoreras också.

### Flera funktioner

För att visa flera funktioner på samma graf behöver du bara skriva dem efter varandra. Om man t.ex. vill skriva funktionerna x+5 och 2<sup>x</sup> kan man skriva:

```
x  
5  
+  

2  
x  
^
```

## Variabelfönstret

Variabelfönstret kan användas för att skapa och justera variabler utan att ändra på funktionen.

Det finns till att börja med redan två variabler, e och pi.

Det finns två (eller tre) olika sorters variabler:

*   constant - En konstant har ett värde som kan kan skriva in. Det går att specificera både den reella och imaginära delen.
*   range - Range-variabler har ett min- och max-värde, och en slider där man kan justera värdet på variabeln. Grafen uppdateras kontinuerligt när man justerar slidern, vilket kan vara användbart.
*   time - Denna variabeltyp är ej implementerad än, men tanken är att värdet på en variabel automatiskt ska ändras kontinuerligt.

## Exempelfunktioner du kan testa

Här är en lista med några intressanta saker man kan testa.

### x<sup>x</sup>

Funktionen x<sup>x</sup>, som skrivs som:

```
x  
x  
^
```

### x<sup>n</sup>

Du har säkert märkt att alla x<sup>n</sup>-funktioner med jämna n-värden ger positiva tal för negativa x-värden och ser ut som ett "u", medan de med udda n-värden ger negativa värden och ser ut som ett omvänt "s". Vad händer om man skulle testa ett värde mitt emellan?

Testa att skriva in funktionen

```
x  
n  
^
```

Lägg sedan till en variabel med namnet "n" och välj typen "range". Sätt "min" till 1 och "max" till "4". Vad händer när man ändrar på slidern?

### Eulers formel

Du kanske har hört talas om [Eulers formel](https://sv.wikipedia.org/wiki/Eulers_formel), e<sup>ix</sup>. Hur ser den egentligen ut? Du kan testa genom att skriva funktionen

```
e  
i  
x  
*  
^
```

I detta läge kan det också vara bra att öka funktionens definitionsmängd i båda riktningarna, t.ex. till -10 och 10\. Kolla på den reella respektiva imaginära delen. Vilka funktioner ser det ut som?