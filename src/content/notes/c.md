---
title: "The C Programming Language"
author: "Brian Kernighan and Dennis Ritchie"
color: ["#D5BCA1", "#D5BCA1"]
textColor: "#3E4270"
---

# Apuntes C

> Nota: C89 o ANSI C (1983), C90 o ISO (1990), C99 (1999 muchas 
> funcionalidades y retro-compatibilidad), C11, C18 (solo correcciones).

> Nota: El tamaño máximo de un stack de la función main es de 8 MiB; esto se 
> puede ver con el comando limit en linux.
> Se puede establecer el tamaño del stack con > limit stacksize  x (esto en 
> KiB).
> Ademas cada hilo tiene un tamaño predeterminado de stack en aplicaciones de
> 32 bits es de 4 MiB y el el 64 bits de 8 MiB. Esto se puede modificar 
> mediante: > setenv STACKSIZE X (representado en KiB).

-------------------------------------------------------------------------------

Los archivos son creados con la extensión `.c` y se ejecutan ya sea usando *cc*
(el viejo compilador) o *gcc* (perteneciente a la colección de compiladores
GNU).  Sobre cc no hay mucha información, pero se menciona que es, tras
bambalinas, un enlace al compilador gcc. Hola mundo en C:

```c
#include <stdio.h>

main() {
    printf("Hola, mundo!\n");
}
```

La primera línea le dice al compilador que incluya funciones desde la librería
estándar de entrada/salida, esa función es `printf()` y nos permite imprimir
texto en pantalla.

Los caracteres `\n` significan *newline character*. Estos son secuencias de
escape (*escape sequence*) que proveen un mecanismo para representar caracteres
invisibles tales como `\t` (tab), `\b` (backspace), `\"` (comillas dentro de
comillas), etc.


Para empezar, compilaremos con **cc**  que nos generará un código objeto
`a.out`, si es que no se especifica ningun nombre:

```c
cc hello.c
```
Para ejecutarlo, lo siguiente:

```
./a.out
```

Ahora otro ejemplo, imprimir grados Fahrenheit y su valor en Celsius:

```c
#include <stdio.h>
 
main() {

    int fahr, celsius;
    int lower, upper, step;

    lower = 0;
    upper = 300;
    step = 20;      /*step size*/

    fahr = lower;

    while(fahr <= upper) {
        celsius = 5 * (fahr - 32) / 9;
        printf("%d\\t%d\\n", fahr, celsius);
        fahr += step;
    }
}
```

La fórmula para convertir de Farenheit a Celsius es: `C = (5 / 9) (F - 32)`, 
la razón de porque, en este caso, se ha multiplicado por separado el 5 y el 9 
es, que una división entre enteros descarta la parte decimal del 
resultado, por lo que nuestros valores en Celsius sería siempre cero.

> `printf()` no es parte del lenguaje C como tal, sino más bien una función
> perteneciente a la Librería Estándar al cual pueden acceder los programas C.
> Cuando se tiene un integer y un float en una operación, el primero será
> transformado en punto flotante antes de realizar la operación. La expresión
> `%d` indica que será sustituido por el primero, segundo, tercer... argumento
> entero de la función, de tal manera que estos coincidan en el orden y tipo
> de valor. Existen otros como `%o` para octal, `%x` para hexadecimal, `%c` 
> para caracter, `%s` para string y `%%` para si mismo.

Dado que se tiene conocimiento previos de otros lenguajes como Java o incluso 
C++, solo se mencionarán datos de relevancia o propios del lenguaje C.

## 1.4 Constantes simbólicas

Son aquellos valores que serán usados muchas veces en el programa sin cambiar 
su valor en la ejecución; fuera de ser declarados como constantes, también 
pueden ser declarados como constantes simbólicas con nombres significativos 
para que las desarrolladores puedan entenderlo posteriormente.

```c
#include <stdio.h>
#define LOWER 0
#define UPPER 300
#define STEP 20

main() {

    int fahr;

    for(fahr = LOWER; fahr <= UPPER; fahr += STEP)
        printf("%3d %6.1f\\n", fahr, (5.0/9.0) * (fahr - 32));
}
```
Por convención, las constantes simbólicas se escriben en mayúsculas; no forman 
parte de las declaraciones ni terminan en punto y coma.

## 1.5 Entrada y salida de caracteres

Una de las funciones proporcionadas por la *std library* es `getchar` y
`putchar`, encargadas de manipular flujo caracteres; la primera lee el caracter
de entrada como la del teclado, y la otra lo muestra en pantalla. (putchar
puede ser alternada con printf).

```c
#include <stdio.h>   

int main() {

    int c;

    while(c = getchar() != EOF) /*End Of File*/
        putchar(c);
}
```

La razón por la que, aparentemente, una variable de tipo int puede almacenar 
diferentes tipos de datos es que, en realidad, solo almacena los valores 
decimales que representan a los caracteres, tal como lo requiere el parámetro 
de putchar; y la impresión de que la variable `c` pueda almacenar datos más 
allá de sus límites, se debe a que los almacena uno por uno, como si todo lo
que se escribiese fuese un flujo de caracteres encolados y analizados de a por
uno; esto es más apreciable utilizando el depurador.

> `EOF` es una constante simbólica que permite diferenciar el fin de la
> entrada de datos, de los ingresados: su valor es -1.
>
> EOF en los sistemas Linux, está representado por Ctrl D: es un indicador 
> de que ya no se ingresaran más datos en casos de stream o que se ha llegado
> al final del fichero, en casos de estos.

Contador de palabras:
```c
#include <stdio.h>
#define IN 1        /* inside a word */
#define OUT 0       /* outside a word */

main() {

int c, nl, nw, nc, state;
    state = OUT;
    nl = nw = nc = 0;
    
    while((c = getchar()) != EOF) {
        ++nc;
        
        if(c == '\n')
            ++nl;
            
        if(c == ' ' || c == '\n' || c == '\t')
            state = OUT;
        else if(state == OUT) {
            state = IN;
            ++nw;
        }
    }
    
    printf("%d %d %d\\n", nl, nw, nc);
}
```

## 1.6 Arreglos

Ejemplo de un contador de ocurrencias que incluye números, espacios en blanco, 
tabuladores y saltos:

```c
#include <stdio.h>

/* count digits, white spaces, others */
main() {

    int c, i, nwhite, nother;
    int ndigit[10];

    nwhite = nother = 0;
    
    /* setting vector values to zero */
    for (i = 0; i < 10; ++i)
        ndigit[i] = 0;

    while((c = getchar()) != EOF) {
    
        if(c >= '0' && c <= '9')
            ++ndigit[c-'0'];
        else if(c == ' ' || c == '\n' || c == '\t')
            ++nwhite;
        else
            ++nother;
    }

    printf("digits =");
    for(i = 0; i < 10; ++i)
        printf(" %d", ndigit[i]);

    printf(", white space = %d, other = %d\\n", nwhite, nother);    
}
```

En la línea 18 `ndigit[c - '0']`, se utilizan representaciones decimales del 
código ASCII para poder tener el índice correcto. Esto solo es posible si los 
caracteres son consecutivos en su representación, que lo son. Es asi como se
obtiene el índice correcto, si esto no fuese así, se tendría índices que van
del 48 al 57, lo que provocaría un overflow.

## 1.7 Funciones

Parámetro es la variable dentro de los paréntesis de la función, y argumento 
el valor que se le pasa; también se puede usar argumento formal y argumento 
actual para hacer la misma distinción.

```c
#include <stdio.h>

/* other way to declare the prototype: int power(int, int); */
int power(int m, int n);

/* test power function */
main() {

    int i;

    for(i = 0; i < 10; ++i)
        printf("%d %d %d\\n", i, power(2, i), power(-3, i));

    return 0;
}

/* power: raise base to n-th power; n >= 0 */
int power(int base, int n) {
    int r;
    r = 1;

    for(int i = 0; i < n; ++i)
        r *= base;

    return r;
}
```

La declaración de la función *power* al inicio del archivo es un prototipo de 
función e indica el tipo de valor que devuelve la función y el tipo de 
parámetros que esta tiene; la definición de la función no necesariamente debe 
coincidir con el nombre de los parámetros.

La sentencia `return` no necesariamente tiene que devolver un valor; si se 
declara la variable de retorno, es como si se indicara que allí finaliza el 
cuerpo de la función, similar a una llave de cierre.

Una declaracion de funcion anterior al ANSI C:

```c
/* function prototype */
int power();

int power (base, n) int base, n;
{
...
}
```

El antiguo estilo para la declaración del prototipo de funciones no facilitaba 
a los compiladores detectar si se estaba llamando correctamente a la función, 
tan solo indicaba el tipo de retorno de la función. Por esa misma razón, es 
recomendable utilizar el nuevo estilo, para facilitar esta detección en los 
compiladores.

> Sobre la función main, el valor de retorno es 0, esto indica que no hubo
> errores en el contexto de la llamada.

## 1.8 Argumentos - paso por valor

Los argumentos son pasados por valor; a diferencia del paso por referencia, 
esto permite crear programas más compactos que reciben una copia local y 
privada del valor original en cada función.

Un ejemplo de variables por valor, en este caso **n**, que reemplaza la 
función de **i** para decrementar sin alterar el valor original del argumento
con el que fue llamado la función *power*.

```c
int power(int base, int n) {
    int r;

    for(r = 1; n > 0; --n)
        r *= base;

    return r;
}
```

Si se quisiera alterar el valor original se usaría un apuntador a la variable; 
para el caso de los arreglos , cuando se usan como argumentos, se pasa la 
direccion del principio del arreglo, por lo que si se agregan subíndices, se 
estará modificando el valor del arreglo como tal, sin copia alguna de por 
medio.

## 1.9 Arreglo de caracteres

Dado que los caracteres son los arreglos más comunes, se ejemplifica mediante 
un arreglo:

```c
#include <stdio.h>
#define MAXLINE 1000    /* maximum input line length */

int get_line(char line[], int maxline);
void copy(char to[], char from[]);

/* print the longest input line */
main() {
     int len;
     int max;
     char line[MAXLINE];
     char longest[MAXLINE];

     max = 0;
     while((len = get_line(line, MAXLINE)) > 0)
         if(len > max) {
             max = len;
             copy(longest, line);
         }

     if(max > 0) /* there was a line */
         printf("%s", longest);
     
     return 0;
}

/* get_line: read a line into s, return length */
int get_line(char s[], int lim) {

    int c, i;

    for(i=0; i < lim-1 && (c=getchar()) != EOF && c != '\\n'; ++i)
        s[i] = c;

    if(c == '\n') {
        s[i] = c;
        ++i;
    }
    s[i] = '\0';
    
    return i;
}

/* copy: copy 'from' into 'to'; assume to is big enough */
void copy(char to[], char from[]) {
    int i;
    i = 0;

    while((to[i] = from[i]) != '\0')
        ++i;
}
```

Al igual que con EOF en los archivos, se utiliza `\0` para indicar el final de
la cadena de caracteres; tambien llamado *null character* cuyo valor es cero.
    
    .---------------------------------.
    |  h  |  o  |  l  |  a  | \n | \0 |
    `---------------------------------´

> - El formato `%s` de `printf` espera que el argumento sea de este modo. La
>   impresión con `printf` será detenida se encuentre `\0` en la cadena.
> - Normalmente la captura de las entradas del usuario que se realizan mediante
>   `scanf` necesitan el ampersand para almacenarse, pero en el caso de cadenas
>   se obvia este simbolo, incluso el uso de algun for basta con el nombre del
>   arreglo de caracteres para su almacenamiento mediante esta función.
> - Aquella cadena sin inicializar será en lo posible "inicializado", si es que
>   es inicializado, con valores nulos o valores no imprimibles, pero a pesar
>   de ellos tendrá caracteres basura dentro de algunos índices, lo mismo con
>   un arreglo de números.

## Variables externas y alcance.

Las variables declaradas dentro del alcance de una función son llamadas
*variables locales* o privadas y existen cuando se llaman a la función y
desaparacen cuando termina la llamada; por esta razón se les conoce como
*variables autómaticas*. Aquellas variables locales que conservan su valor tras
estas llamadas son conocidas como variables estáticas.


