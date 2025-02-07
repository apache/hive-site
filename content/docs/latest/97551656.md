---
title: "Apache Hive : Supported Features:  Apache Hive 3.1"
date: 2024-12-12
---

# Apache Hive : Supported Features: Apache Hive 3.1

This table covers all mandatory features from [SQL:2016](https://en.wikipedia.org/wiki/SQL:2016) as well as optional features that Hive implements.

| **Feature ID** | **Feature Name** | **Implemented** | **Mandatory** | **Comments** |
| --- | --- | --- | --- | --- |
| E011 | Numeric data types | Yes | Mandatory |  |
| E011-01 | INTEGER and SMALLINT data types (including all spellings) | Yes | Mandatory |  |
| E011-02 | REAL, DOUBLE PRECISON, and FLOAT data types | Yes | Mandatory |  |
| E011-03 | DECIMAL and NUMERIC data types | Yes | Mandatory |  |
| E011-04 | Arithmetic operators | Yes | Mandatory |  |
| E011-05 | Numeric comparison | Yes | Mandatory |  |
| E011-06 | Implicit casting among the numeric data types | Yes | Mandatory |  |
| E021 | Character string types | Yes | Mandatory |  |
| E021-01 | CHARACTER data type (including all its spellings) | Partial | Mandatory | Only support CHAR, not CHARACTER |
| E021-02 | CHARACTER VARYING data type (including all its spellings) | Partial | Mandatory | Only support VARCHAR, not CHARACTER VARYING or CHAR VARYING |
| E021-03 | Character literals | Yes | Mandatory |  |
| E021-04 | CHARACTER_LENGTH function | Yes | Mandatory |  |
| E021-05 | OCTET_LENGTH function | Yes | Mandatory |  |
| E021-06 | SUBSTRING function | Partial | Mandatory | Standard: SUBSTRING(*val* FROM *startpos* [FOR *len*]). Hive: SUBSTRING(*val*, *startpos* [, *len*]) |
| E021-07 | Character concatenation | Yes | Mandatory |  |
| E021-08 | UPPER and LOWER functions | Yes | Mandatory |  |
| E021-09 | TRIM function | Yes | Mandatory |  |
| E021-10 | Implicit casting among the fixed-length and variable-length character string types | Yes | Mandatory |  |
| E021-11 | POSITION function | No | Mandatory |  |
| E021-12 | Character comparison | Yes | Mandatory |  |
| E031 | Identifiers | Partial | Mandatory | Unquoted identifiers use C syntax ([A-Za-z][A-Za-z0-9_]*). Quoted identifiers can have any character. |
| E031-01 | Delimited identifiers | Partial | Mandatory | Quoting done with ` rather than ", only supported for columns, not tables, views, etc. |
| E031-02 | Lower case identifiers | Yes | Mandatory |  |
| E031-03 | Trailing underscore | Yes | Mandatory |  |
| E051 | Basic query specification | Yes | Mandatory |  |
| E051-01 | SELECT DISTINCT | Yes | Mandatory |  |
| E051-02 | GROUP BY clause | Yes | Mandatory |  |
| E051-04 | GROUP BY can contain columns not in <select list> | Yes | Mandatory |  |
| E051-05 | Select list items can be renamed | Yes | Mandatory |  |
| E051-06 | HAVING clause | Yes | Mandatory |  |
| E051-07 | Qualified * in select list | Yes | Mandatory |  |
| E051-08 | Correlation names in the FROM clause | Yes | Mandatory |  |
| E051-09 | Rename columns in the FROM clause | Yes | Mandatory |  |
| E061 | Basic predicates and search conditions | Yes | Mandatory |  |
| E061-01 | Comparison predicate | Yes | Mandatory |  |
| E061-02 | BETWEEN predicate | Yes | Mandatory |  |
| E061-03 | IN predicate with list of values | Yes | Mandatory |  |
| E061-04 | LIKE predicate | Yes | Mandatory |  |
| E061-05 | LIKE predicate: ESCAPE clause | Yes | Mandatory |  |
| E061-06 | NULL predicate | Yes | Mandatory |  |
| E061-07 | Quantified comparison predicate | No | Mandatory |  |
| E061-08 | EXISTS predicate | Yes | Mandatory |  |
| E061-09 | Subqueries in comparison predicate | No | Mandatory |  |
| E061-11 | Subqueries in IN predicate | Yes | Mandatory |  |
| E061-12 | Subqueries in quantified comparison predicate | No | Mandatory |  |
| E061-13 | Correlated subqueries | Yes | Mandatory |  |
| E061-14 | Search condition | Yes | Mandatory |  |
| E071 | Basic query expressions | Yes | Mandatory |  |
| E071-01 | UNION DISTINCT table operator | Yes | Mandatory |  |
| E071-02 | UNION ALL table operator | Yes | Mandatory |  |
| E071-03 | EXCEPT DISTINCT table operator | Yes | Mandatory |  |
| E071-05 | Columns combined via table operators need not have exactly the same data type. | Yes | Mandatory |  |
| E071-06 | Table operators in subqueries | Yes | Mandatory |  |
| E081 | Basic Privileges | Yes | Mandatory |  |
| E081-01 | SELECT privilege at the table level | Yes | Mandatory |  |
| E081-02 | DELETE privilege | Yes | Mandatory |  |
| E081-03 | INSERT privilege at the table level | Yes | Mandatory |  |
| E081-04 | UPDATE privilege at the table level | Yes | Mandatory |  |
| E081-05 | UPDATE privilege at the column level | Yes | Mandatory |  |
| E081-06 | REFERENCES privilege at the table level | No | Mandatory |  |
| E081-07 | REFERENCES privilege at the column level | No | Mandatory |  |
| E081-08 | WITH GRANT OPTION | Yes | Mandatory |  |
| E081-09 | USAGE privilege | No | Mandatory |  |
| E081-10 | EXECUTE privilege | No | Mandatory |  |
| E091 | Set functions | Yes | Mandatory |  |
| E091-01 | AVG | Yes | Mandatory |  |
| E091-02 | COUNT | Yes | Mandatory |  |
| E091-03 | MAX | Yes | Mandatory |  |
| E091-04 | MIN | Yes | Mandatory |  |
| E091-05 | SUM | Yes | Mandatory |  |
| E091-06 | ALL quantifier | Yes | Mandatory |  |
| E091-07 | DISTINCT quantifier | Yes | Mandatory |  |
| E101 | Basic data manipulation | Yes | Mandatory |  |
| E101-01 | INSERT statement | Yes | Mandatory |  |
| E101-03 | Searched UPDATE statement | Yes | Mandatory |  |
| E101-04 | Searched DELETE statement | Yes | Mandatory |  |
| E111 | Single row SELECT statement | No | Mandatory |  |
| E121 | Basic cursor support | No | Mandatory |  |
| E121-01 | DECLARE CURSOR | No | Mandatory |  |
| E121-02 | ORDER BY columns need not be in select list | No | Mandatory |  |
| E121-03 | Value expressions in ORDER BY clause | No | Mandatory |  |
| E121-04 | OPEN statement | No | Mandatory |  |
| E121-06 | Positioned UPDATE statement | No | Mandatory |  |
| E121-07 | Positioned DELETE statement | No | Mandatory |  |
| E121-08 | CLOSE statement | No | Mandatory |  |
| E121-10 | FETCH statement: implicit NEXT | No | Mandatory |  |
| E121-17 | WITH HOLD cursors | No | Mandatory |  |
| E131 | Null value support (nulls in lieu of values) | Yes | Mandatory |  |
| E141 | Basic integrity constraints | Partial | Mandatory | Don't support UNIQUE (VALUE) constraints, don't support UNIQUE over a list of columns. Unique constraints not enforced.Don't support referencing periods, MATCH, or triggered actions in foreign key.Don't support CHECK constraints. |
| E141-01 | NOT NULL constraints | Yes | Mandatory |  |
| E141-02 | UNIQUE constraints of NOT NULL columns | Partial | Mandatory | UNIQUE constraints not enforced |
| E141-03 | PRIMARY KEY constraints | Partial | Mandatory | Primary keys not enforced |
| E141-04 | Basic FOREIGN KEY constraint with the NO ACTION default for both referential delete action and referential update action. | Partial | Mandatory | Don't support referencing periods, MATCH, or triggered actions. Foreign keys not enforced. |
| E141-06 | CHECK constraints | Yes | Mandatory |  |
| E141-07 | Column defaults | Yes | Mandatory |  |
| E141-08 | NOT NULL inferred on PRIMARY KEY | No | Mandatory | No need to declare NOT NULL with PRIMARY KEY or UNIQUE, but non-nullness not enforced. |
| E141-10 | Names in a foreign key can be specified in any order | No | Mandatory |  |
| E151 | Transaction support | No | Mandatory |  |
| E151-01 | COMMIT statement | No | Mandatory |  |
| E151-02 | ROLLBACK statement | No | Mandatory |  |
| E152 | Basic SET TRANSACTION statement | No | Mandatory |  |
| E152-01 | SET TRANSACTION state- ment: ISOLATION LEVEL SERIALIZABLE clause | No | Mandatory |  |
| E152-02 | SET TRANSACTION state- ment: READ ONLY and READ WRITE clauses | No | Mandatory |  |
| E153 | Updatable queries with subqueries | No | Mandatory |  |
| E161 | SQL comments using leading double minus | Yes | Mandatory |  |
| E171 | SQLSTATE support | No | Mandatory |  |
| F031 | Basic schema manipulation | Yes | Mandatory |  |
| F031-01 | CREATE TABLE statement to create persistent base tables | Yes | Mandatory |  |
| F031-02 | CREATE VIEW statement | Yes | Mandatory |  |
| F031-03 | GRANT statement | Yes | Mandatory |  |
| F031-04 | ALTER TABLE statement: ADD COLUMN clause | Yes | Mandatory |  |
| F031-13 | DROP TABLE statement: RESTRICT clause | Yes | Mandatory |  |
| F031-16 | DROP VIEW statement: RESTRICT clause | Yes | Mandatory |  |
| F031-19 | REVOKE statement: RESTRICT clause | No | Mandatory |  |
| F032 | CASCADE drop behavior | Yes | Optional |  |
| F034 | Extended REVOKE statement | Yes | Optional |  |
| F034-01 | REVOKE statement performed by other than the owner of a schema object | Yes | Optional |  |
| F034-02 | REVOKE statement: GRANT OPTION FOR clause | Yes | Optional |  |
| F034-03 | REVOKE statement to revoke a privilege that the grantee has WITH GRANT OPTION | Yes | Optional |  |
| F041 | Basic joined table | Yes | Mandatory |  |
| F041-01 | Inner join (but not necessarily the INNER keyword) | Yes | Mandatory |  |
| F041-02 | INNER keyword | Yes | Mandatory |  |
| F041-03 | LEFT OUTER JOIN | Yes | Mandatory |  |
| F041-04 | RIGHT OUTER JOIN | Yes | Mandatory |  |
| F041-05 | Outer joins can be nested | Yes | Mandatory |  |
| F041-07 | The inner table in a left or right outer join can also be used in an inner join | Yes | Mandatory |  |
| F041-08 | All comparison operators are supported (rather than just =) | Yes | Mandatory |  |
| F051 | Basic date and time | Partial | Mandatory | No support for WITH/OUT TIMEZONE.No support for precision in TIMESTAMP.No support for TIME type. |
| F051-01 | DATE data type (including support of DATE literal) | Partial | Mandatory | Intervals don't match spec syntax |
| F051-02 | TIME data type (including support of TIME literal) with fractional seconds precision of at least 0. | No | Mandatory |  |
| F051-03 | TIMESTAMP data type (including support of TIMESTAMP literal) with fractional seconds precision of at least 0 and 6. | Partial | Mandatory | No support for WITH/OUT TIMEZONE.No support for precision.Intervals don't match spec syntax. |
| F051-04 | Comparison predicate on DATE, TIME, and TIMESTAMP data types | Partial | Mandatory | No support for TIME |
| F051-05 | Explicit CAST between date-time types and character string types | Partial | Mandatory | No support for TIME |
| F051-06 | CURRENT_DATE | Yes | Mandatory |  |
| F051-07 | LOCALTIME | No | Mandatory |  |
| F051-08 | LOCALTIMESTAMP | Partial | Mandatory | CURRENT_TIMESTAMP supported, doesn't take precision argumentLOCALTIMESTAMP not supported  |
| F052 | Intervals and datetime arithmetic | Partial | Optional | Interval not supported as column type, only as expression type in queries.Interval syntax differs from standard. |
| F054 | TIMESTAMP in DATE type precedence list | Yes | Optional |  |
| F081 | UNION and EXCEPT in views | Yes | Mandatory |  |
| F131 | Grouped operations | Yes | Mandatory |  |
| F131-01 | WHERE, GROUP BY, and HAVING clauses supported in queries with grouped views | Yes | Mandatory |  |
| F131-02 | Multiple tables supported in queries with grouped views | Yes | Mandatory |  |
| F131-03 | Set functions supported in queries with grouped views | Yes | Mandatory |  |
| F131-04 | Subqueries with GROUP BY and HAVING clauses and grouped views | Yes | Mandatory |  |
| F131-05 | Single row SELECT with GROUP BY and HAVING clauses and grouped views | Yes | Mandatory |  |
| F171 | Multiple schemas per user | Yes | Optional |  |
| F200 | TRUNCATE TABLE statement | Yes | Optional |  |
| F181 | Multiple module support | No | Mandatory |  |
| F201 | CAST function | Yes | Mandatory |  |
| F221 | Explicit defaults | Yes | Mandatory |  |
| F261 | CASE expression | Yes | Mandatory |  |
| F261-01 | Simple CASE | Yes | Mandatory |  |
| F261-02 | Searched CASE | Yes | Mandatory |  |
| F261-03 | NULLIF | Yes | Mandatory |  |
| F261-04 | COALESCE | Yes | Mandatory |  |
| F302 | INTERSECT table operator | Yes | Optional |  |
| F302-01 | INTERSECT DISTINCT table operator | Yes | Optional |  |
| F302-02 | INTERSECT ALL table operator | Yes | Optional |  |
| F304 | EXCEPT ALL table operator | Yes | Optional |  |
| F311 | Schema definition statement | Yes | Mandatory |  |
| F311-01 | CREATE SCHEMA | Yes | Mandatory |  |
| F311-02 | CREATE TABLE for persistent base tables | Partial | Mandatory | Does not create schema element creation as part of schema creation, must be done in separate statement |
| F311-03 | CREATE VIEW | Partial | Mandatory | Does not create schema element creation as part of schema creation, must be done in separate statement |
| F311-04 | CREATE VIEW: WITH CHECK OPTION | No | Mandatory |  |
| F311-05 | GRANT statement | Partial | Mandatory | Does not create schema element creation as part of schema creation, must be done in separate statement |
| F312 | MERGE statement | Yes | Optional |  |
| F313 | Enhanced MERGE statement | Yes | Optional |  |
| F314 | MERGE statement with DELETE branch | Yes | Optional |  |
| F321 | User authorization | Partial | Optional | Support for CURRENT_USER function, none of the rest |
| F381 | Extended schema manipulation | Partial | Optional | No support for scope.No support for ALTER routine. |
| F381-01 | ALTER TABLE statement: ALTER COLUMN clause | Partial | Optional | Syntax non-standard.No support for scope.No support for identities.No support for column generation. |
| F381-02 | ALTER TABLE statement: ADD CONSTRAINT clause | Partial | Optional | Same limitations as creating constraints above |
| F381-03 | ALTER TABLE statement: DROP CONSTRAINT clause | Partial | Optional | Same limitations as creating constraints above |
| F382 | Alter column data type | Partial | Optional | Syntax non-standard |
| F383 | Set column not null clause | Partial | Optional | Syntax non-standard |
| F391 | Long identifiers | Yes | Optional |  |
| F401 | Extended joined table | Partial | Optional | NATURAL joins not supported |
| F401-02 | FULL OUTER JOIN | Yes | Optional |  |
| F401-04 | CROSS JOIN | Yes | Optional |  |
| F471 | Scalar subquery values | Yes | Mandatory |  |
| F481 | Expanded NULL predicate | Yes | Mandatory |  |
| F531 | Temporary tabels | Partial | Optional | GLOBAL/LOCAL scope not supported.DECLARE TEMPORARY TABLE not supported. |
| F555 | Enhanced seconds precision | Yes | Optional |  |
| F763 | CURRENT_SCHEMA | Partial | Optional | CURRENT_DATABASE, which is equivalent |
| F812 | Basic flagging | No | Mandatory |  |
| F841 | LIKE_REGEX predicate | Partial | Optional | use RLIKE instead |
| F847 | Nonconstant regular expressions | Yes | Optional |  |
| F850 | Top level <order by clause> in <query expression> | Yes | Optional |  |
| F851 | <order by clause> in subqueries | Yes | Optional |  |
| F852 | Top-level <order by clause> in views | Yes | Optional |  |
| F855 | Nested <order by clause> in <query expression> | Yes | Optional |  |
| F856 | Nested <fetch first clause> in <query expression> | Yes | Optional |  |
| F857 | Top-level <fetch first clause> in <query expression> | Yes | Optional |  |
| F858 | <fetch first clause> in subqueries | Yes | Optional |  |
| F859 | Top-level <fetch first clause> in views | Yes | Optional |  |
| S011 | Distinct data types | No | Mandatory |  |
| S091 | Basic array support | Partial | Optional | Syntax non-standard.No option to declare max cardinality.SIZE instead of CARDINALITY. |
| S091-01 | Arrays of built-in data types | Partial | Optional | Syntax non-standard |
| S091-03 | Array expressions | Partial | Optional | Support array element reference and cardinality (though syntax non-standard)No support for array concatenation, trimming, or max-cardinality |
| T021 | BINARY and VARBINARY types | Partial | Optional | BINARY only, though it acts like VARBINARY, no length parameter accepted.No support for overlay, trim, position, or LIKE. |
| T031 | BOOLEAN data type | Yes | Optional |  |
| T041 | Basic LOB data type support | Partial | Optional | BINARY acts as BLOB (no size restrictions)STRING acts as CLOBNon-standard syntax |
| T041-01 | BLOB data type | Partial | Optional | BINARY acts as BLOB, non-standard syntax |
| T041-02 | CLOB data type | Partial | Optional | STRING acts as CLOB, non-standard syntax |
| T041-03 | POSITION, LENGTH, LOWER, TRIM, UPPER, SUBSTRING for LOB data types | Partial | Optional | No POSITIONLOWER, UPPER only applicable to STRING |
| T041-04 | Concatenation of LOB types | Yes | Optional |  |
| T042 | Extended LOB data type support | Partial | Optional | Cast for BINARY and STRING supported.LIKE for STRING supported.All other advanced options not supported. |
| T051 | Row types | Partial | Optional | Called STRUCT rather than ROW |
| T071 | BIGINT data type | Yes | Optional |  |
| T121 | WITH (excluding RECURSIVE) in query expression | Yes | Optional |  |
| T321 | Basic SQL-invoked routines | No | Mandatory |  |
| T321-01 | User-defined functions with no overloading | No | Mandatory |  |
| T321-02 | User-defined stored procedures with no overloading | No | Mandatory |  |
| T321-03 | Function invocation | No | Mandatory |  |
| T321-04 | CALL statement | No | Mandatory |  |
| T321-05 | RETURN statement | No | Mandatory |  |
| T331 | Basic roles | Yes | Optional |  |
| T351 | Bracketed comments | Yes | Optional |  |
| T431 | Extended grouping capabilities | Yes | Optional |  |
| T433 | Multiargument GROUPING function | Yes | Optional |  |
| T441 | ABS and MOD functions | Yes | Optional |  |
| T501 | Enhanced EXISTS predicate | Yes | Optional |  |
| T581 | Regular expression substring function | Yes | Optional |  |
| T591 | UNIQUE constraints of possibly null columns | Yes | Optional |  |
| T611 | Elementary OLAP operations | Yes | Optional |  |
| T612 | Advanced OLAP operations | Partial | Optional |  |
| T613 | Sampling | Yes | Optional |  |
| T614 | NTILE function | Yes | Optional |  |
| T615 | LEAD and LAG functions | Yes | Optional |  |
| T617 | FIRST_VALUE and LAST_VALUE functions | Yes | Optional |  |
| T621 | Enhanced numeric functions | Yes | Optional |  |
| T622 | Trigonometric functions | Partial | Optional | No sinh, cosh, tanh |
| T623 | General logarithm functions | Yes | Optional |  |
| T624 | Common logarithm functions | Yes | Optional |  |
| T631 | IN predicate with one list element | Yes | Mandatory |

## Comments:

|  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| 
[Alan Gates](https://cwiki.apache.org/confluence/display/~alangates) Following features are supported in 3.1:

| E061-09 | Subqueries in comparison predicate |

| E141-06 | CHECK constraints | No | Mandatory |

 Posted by vgarg at Nov 29, 2018 19:18
  |
| 
*No need to declare NOT NULL with PRIMARY KEY or UNIQUE* - I think this is not true. NOT NULL is not inferred on UNIQUE and needs to be explicitly declared.

 Posted by vgarg at Nov 29, 2018 19:20
  |
| 

| E121-02 | ORDER BY columns need not be in select list | No | Mandatory |

 Looks like this feature is partially supported. Hive allows this if there is not aggregate.

 Posted by vgarg at Nov 29, 2018 19:26
  |
| 
IIUC the requirement isn't that you don't need to declare not null and it is inferred, but rather that it can support unique/pk indices with nulls in them.  

 Posted by alangates at Nov 29, 2018 20:57
  |
| 
Agreed, I missed this one.  Feel free to edit it.  I'll be circling back on this and a few others shortly to fix it.

 Posted by alangates at Nov 29, 2018 20:57
  |

 

 

