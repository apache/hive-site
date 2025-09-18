---
title: "Apache Hive : Hive Operators"
date: 2024-12-12
---

# Apache Hive : Hive Operators

### Operators Precedences

| **Example** | **Operators** | **Description** |
| --- | --- | --- |
| A[B] , A.identifier | bracket_op([]), dot(.) | element selector, dot |
| -A | unary(+), unary(-), unary(~) | unary prefix operators |
| A IS [NOT] (NULL|TRUE|FALSE) | IS NULL,IS NOT NULL, ... | unary suffix |
| A ^ B | bitwise xor(^) | bitwise xor |
| A * B | star(*), divide(/), mod(%), div(DIV) | multiplicative operators |
| A + B | plus(+), minus(-) | additive operators |
| A || B | string concatenate(||) | string concatenate |
| A & B | bitwise and(&) | bitwise and |
| A | B | bitwise or(|) | bitwise or |

### Relational Operators

The following operators compare the passed operands and generate a TRUE or FALSE value depending on whether the comparison between the operands holds.

| **Operator** | **Operand types** | **Description** |
| --- | --- | --- |
| A = B | All primitive types | TRUE if expression A is equal to expression B otherwise FALSE. |
| A == B | All primitive types | Synonym for the = operator. |
| A <=> B | All primitive types | Returns same result with EQUAL(=) operator for non-null operands, but returns TRUE if both are NULL, FALSE if one of them is NULL.  |
| A <> B | All primitive types | NULL if A or B is NULL, TRUE if expression A is NOT equal to expression B, otherwise FALSE. |
| A != B | All primitive types | Synonym for the <> operator. |
| A < B | All primitive types | NULL if A or B is NULL, TRUE if expression A is less than expression B, otherwise FALSE. |
| A <= B | All primitive types | NULL if A or B is NULL, TRUE if expression A is less than or equal to expression B, otherwise FALSE. |
| A > B | All primitive types | NULL if A or B is NULL, TRUE if expression A is greater than expression B, otherwise FALSE. |
| A >= B | All primitive types | NULL if A or B is NULL, TRUE if expression A is greater than or equal to expression B, otherwise FALSE. |
| A [NOT] BETWEEN B AND C | All primitive types | NULL if A, B, or C is NULL, TRUE if A is greater than or equal to B AND A less than or equal to C, otherwise FALSE. This can be inverted by using the NOT keyword.  |
| A IS NULL | All types | TRUE if expression A evaluates to NULL, otherwise FALSE. |
| A IS NOT NULL | All types | FALSE if expression A evaluates to NULL, otherwise TRUE. |
| A IS [NOT] (TRUE|FALSE) | Boolean types | Evaluate to TRUE only if A meets the condition. Note: NULL is UNKNOWN, and because of that (UNKNOWN IS TRUE) and (UNKNOWN IS FALSE) both evaluate to FALSE. |
| A [NOT] LIKE B | strings | NULL if A or B is NULL, TRUE if string A matches the SQL simple regular expression B, otherwise FALSE. The comparison is done character by character. The _ character in B matches any character in A (similar to . in POSIX regular expressions) while the % character in B matches an arbitrary number of characters in A (similar to .* in posix regular expressions). For example, 'foobar' like 'foo' evaluates to FALSE whereas 'foobar' like 'foo_ _ _' evaluates to TRUE and so does 'foobar' like 'foo%'. |
| A RLIKE B | strings | NULL if A or B is NULL, TRUE if any (possibly empty) substring of A matches the Java regular expression B, otherwise FALSE. For example, 'foobar' RLIKE 'foo' evaluates to TRUE and so does 'foobar' RLIKE '^f.*r$'. |
| A REGEXP B | strings | Same as RLIKE. |

### Arithmetic Operators

The following operators support various common arithmetic operations on the operands. All return number types; if any of the operands are NULL, then the result is also NULL.

| **Operator** | **Operand types** | **Description** |
| --- | --- | --- |
| A + B | All number types | Gives the result of adding A and B. The type of the result is the same as the common parent(in the type hierarchy) of the types of the operands. For example, since every integer is a float, therefore float is a containing type of integer so the + operator on a float and an int will result in a float. |
| A - B | All number types | Gives the result of subtracting B from A. The type of the result is the same as the common parent(in the type hierarchy) of the types of the operands. |
| A * B | All number types | Gives the result of multiplying A and B. The type of the result is the same as the common parent(in the type hierarchy) of the types of the operands. Note that if the multiplication causes overflow, you will have to cast one of the operators to a type higher in the type hierarchy. |
| A / B | All number types | Gives the result of dividing A by B. The result is a double type in most cases. When A and B are both integers, the result is a double type except when the [hive.compat](https://hive.apache.org/docs/latest/user/configuration-properties#hivecompat) configuration parameter is set to "0.13" or "latest" in which case the result is a decimal type. |
| A DIV B | Integer types | Gives the integer part resulting from dividing A by B. E.g 17 div 3 results in 5. |
| A % B | All number types | Gives the remainder resulting from dividing A by B. The type of the result is the same as the common parent(in the type hierarchy) of the types of the operands. |
| A & B | All number types | Gives the result of bitwise AND of A and B. The type of the result is the same as the common parent(in the type hierarchy) of the types of the operands. |
| A | B | All number types | Gives the result of bitwise OR of A and B. The type of the result is the same as the common parent(in the type hierarchy) of the types of the operands. |
| A ^ B | All number types | Gives the result of bitwise XOR of A and B. The type of the result is the same as the common parent(in the type hierarchy) of the types of the operands. |
| ~A | All number types | Gives the result of bitwise NOT of A. The type of the result is the same as the type of A. |

### Logical Operators

The following operators provide support for creating logical expressions. All of them return a boolean TRUE, FALSE, or NULL depending upon the boolean values of the operands. NULL behaves as an "unknown" flag, so if the result depends on the state of an unknown, the result itself is unknown.

| **Operator** | **Operand types** | **Description** |
| --- | --- | --- |
| A AND B | boolean | TRUE if both A and B are TRUE, otherwise FALSE. NULL if A or B is NULL. |
| A OR B | boolean | TRUE if either A or B or both are TRUE, FALSE OR NULL is NULL, otherwise FALSE. |
| NOT A | boolean | TRUE if A is FALSE or NULL if A is NULL. Otherwise FALSE. |
| ! A | boolean | Same as NOT A. |
| A IN (val1, val2, ...) | boolean | TRUE if A is equal to any of the values. |
| A NOT IN (val1, val2, ...) | boolean | TRUE if A is not equal to any of the values.  |
| [NOT] EXISTS (subquery) | boolean | TRUE if the subquery returns at least one row. |

### String Operator

| **Operator** | **Operand types** | **Description** |
| --- | --- | --- |
| A || B | strings  | Concatenates the operands - shorthand for `concat(A,B`. |

### Complex Type Constructors

The following functions construct instances of complex types.

| Constructor Function | Operands | Description |
| --- | --- | --- |
| map | (key1, value1, key2, value2, ...) | Creates a map with the given key/value pairs. |
| struct | (val1, val2, val3, ...) | Creates a struct with the given field values. Struct field names will be col1, col2, etc |
| named_struct | (name1, val1, name2, val2, ...) | Creates a struct with the given field names and values. |
| array | (val1, val2, ...) | Creates an array with the given elements. |
| create_union | (tag, val1, val2, ...) | Creates a union type with the value that is being pointed to by the tag parameter. |

### Operators on Complex Types

The following operators provide mechanisms to access elements in Complex Types.

| **Operator** | **Operand types** | **Description** |
| --- | --- | --- |
| A[n] | A is an Array and n is an int | Returns the nth element in the array A. The first element has index 0. For example, if A is an array comprising of ['foo', 'bar'] then A[0] returns 'foo' and A[1] returns 'bar'. |
| M[key] | M is a Map<K, V> and key has type K | Returns the value corresponding to the key in the map. For example, if M is a map comprising of {'f' -> 'foo', 'b' -> 'bar', 'all' -> 'foobar'} then M['all'] returns 'foobar'. |
| S.x | S is a struct | Returns the x field of S. For example for the struct foobar {int foo, int bar}, foobar.foo returns the integer stored in the foo field of the struct. |

 

 

