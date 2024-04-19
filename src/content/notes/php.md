---
title: "PHP Language Reference"
author: "PHP Docs"
color: ["#7B86B8", "#7B86B8"]
textColor: "#EAEAEA"
---

# PHP

## Basic Syntax

+ Etiquetas de apertura y cierre:

```
1. <?php ... ?>
2. <? ... ?>
3. <?= '...' ?>
```

+ Uso de la etiqueta si el archivo contiene únicamente código PHP:

```
<?php
    ...

```

+ Mix de HTML y PHP:

```php
<p> lorem ipsum 1 </p>
<?= 'Some text' ?>
<p> lorem ipsum 2 </p>
```

```
# output

lorem ipsum 1
Some textlorem ipsum 2
```

+ Comments:

```php
// one-line comment (C++ style)

# one-line comment (shell-style)

/* Multi line
 * comment
 */

```

> - Se puede utilizar `<? ?>` por defecto y deshhabilitarlo estableciendo
>   `short_open_tag=Off` en `php.ini`. Recomendable utilizar la forma estándar
>   en archivos `XHTML` o `XML`.
> - La expresión `<?= '...' ?>` es equivalente a `<?php echo '...' ?>`.
> - No se recomienda el uso de la etiqueta de cierre en archivos con solo código
>   PHP debido al *output buffering*.
> - El código PHP embebido `<?= 'Some text' ?>` agrega implícitamente un `;` al
>   final y un *newline*, si es que existe.

## Types

```php
$x = null                       #null
$x = true                       #bool
$x = -1                         #int
$x = 2.3                        #float
$x = "text"                     #string
$x = [] | array()               #array
$x = new foo                    #object
$x = fopen(__FILE__, 'rb')      #resource
                                #callable
```

> - Para verificar el valor y tipo de una expresión se usa `var_dump()`; para el
>   tipo, `get_debug_type()` o `gettype()` (para versiones anteriores a 8.0.0).
> - También `is_type()` para verificar el tipo de cierta expresión.
> - Si se aplica una operación a tipos de datos no soportados, PHP intentará
>   convertirlos automáticamente.
> - PHP puede intentar convertir de tipo de un valor a otro automáticamente en
>   ciertos contextos ([type juggling][2]).
> - Los tipos pueden se convertidos manualmente mediante *type casting* o
>   `settype()`


## Variables
## Constants
## Expressions
## Operators
## Control Structures

```php
<?php if ($expression == true): ?>
    This will show if the expression is true.
<?php else: ?>
    Otherwise this will show.
<?php endif; ?>
```
## Functions
## Classes and Objects
## Namespaces
## Enumerations
## Errors
## Exceptions
## Fibers
## Generators
## Attributes
## References Explained
## Predefined Variables
## Predefined Exceptions
## Predefined Interfaces and Classes
## Predefined Attributes
## Context options and parameters
## Supported Protocols and Wrappers


[1]: https://www.php.net/manual/en/types.comparisons.php "tabla comparativa"
[2]: https://www.php.net/manual/en/language.types.type-juggling.php "type juggling"
