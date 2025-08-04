---
title: "Apache Hive : Supported Features: Apache Hive 2.1"
date: 2024-12-12
---

# Apache Hive : Supported Features: Apache Hive 2.1

| Identifier | Description | Hive 2.1 | Comment |
| --- | --- | --- | --- |
| E011 | Numeric data types | Yes |  |
| E011-01 | INTEGER and SMALLINT data types (including all spellings) | Yes | Int instead of Integer |
| E011-02 | REAL, DOUBLE PRECISON,and FLOAT data types | Yes | Double instead of Double Precision |
| E011-03 | DECIMAL and NUMERIC data types | Yes |  |
| E011-04 | Arithmetic operators | Yes |  |
| E011-05 | Numeric comparison | Yes |  |
| E011-06 | Implicit casting among the numeric data types | Yes |  |
| E021 | Character data types | Yes |  |
| E021-01 | CHARACTER data type | Yes | Char instead of Character |
| E021-02 | CHARACTER VARYING data type | Yes | Varchar instead of Character Varying |
| E021-03 | Character literals | Yes |  |
| E021-04 | CHARACTER_LENGTH function | Partial | length UDF provided |
| E021-06 | SUBSTRING function | Yes |  |
| E021-07 | Character concatenation | Yes | concat UDF instead of standard || operator |
| E021-08 | UPPER and LOWER functions | Yes |  |
| E021-09 | TRIM function | Partial | leading / trailing / both from not supported |
| E021-10 | Implicit casting among the fixed-length and variablelength character string types | Yes |  |
| E021-12 | Character comparison | Yes |  |
| E031 | Identifiers | Yes |  |
| E031-01 | Delimited identifiers | Partial | Backtick (`) used instead of ("). Semicolon character (;) cannot be used in an identifier. Table and column names have additional restrictions |
| E031-03 | Trailing underscore | Yes |  |
| E051 | Basic query specification | Yes |  |
| E051-01 | SELECT DISTINCT | Yes |  |
| E051-02 | GROUP BY clause | Partial | Empty grouping sets not supported |
| E051-04 | GROUP BY can contain columns not in <select list> | Yes |  |
| E051-05 | Select list items can be renamed | Yes |  |
| E051-06 | HAVING clause | Yes |  |
| E051-07 | Qualified * in select list | Yes |  |
| E051-08 | Correlation names in the FROM clause | Yes |  |
| E061 | Basic predicates and search conditions | Yes |  |
| E061-01 | Comparison predicate | Yes |  |
| E061-02 | BETWEEN predicate | Yes |  |
| E061-03 | IN predicate with list of values | Yes |  |
| E061-04 | LIKE predicate | Yes |  |
| E061-06 | NULL predicate | Yes |  |
| E061-08 | EXISTS predicate | Yes |  |
| E061-11 | Subqueries in IN predicate | Yes |  |
| E061-13 | Correlated subqueries | Partial | Only correlated subqueries that can be decorrelated with rewrite rules supported |
| E071 | Basic query expressions | Yes |  |
| E071-01 | UNION DISTINCT table operator | Partial | Corresponding By syntax not supported |
| E071-02 | UNION ALL table operator | Partial | Corresponding By syntax not supported |
| E071-05 | Columns combined via table operators need not have exactly the same data type. | Yes |  |
| E071-06 | Table operators in subqueries | Yes |  |
| E081 | Basic Privileges | Yes |  |
| E081-01 | SELECT privilege | Yes |  |
| E081-03 | INSERT privilege at the table level | Yes |  |
| E081-04 | UPDATE privilege at the table level | Yes |  |
| E081-08 | WITH GRANT OPTION | Yes |  |
| E091 | Set Functions | Yes |  |
| E091-01 | AVG | Yes |  |
| E091-02 | COUNT | Yes |  |
| E091-03 | MAX | Yes |  |
| E091-04 | MIN | Yes |  |
| E091-05 | SUM | Yes |  |
| E091-07 | DISTINCT quantifier | Yes |  |
| E101 | Basic data manipulation | Yes |  |
| E101-01 | INSERT statement | Yes |  |
| E101-03 | Searched UPDATE statement | Yes |  |
| E101-04 | Searched DELETE statement | Yes |  |
| E131 | Null value support (nulls in lieu of values) | Partial | Null specification is supported |
| E141 | Basic integrity constraints | Yes |  |
| E141-03 | PRIMARY KEY constraints | Partial | Non-validated |
| E141-04 | Basic FOREIGN KEY constraint with the NO ACTION default for both referential delete action and referential update action | Partial | Non-validated |
| E141-10 | Names in a foreign key can be specified in any order | Yes |  |
| E151 | Transaction support | Partial | Autocommit transaction for INSERT/UPDATE/DELETE |
| E161 | SQL comments using leading double minus | Yes |  |
| F031 | Basic schema manipulation | Yes |  |
| F031-01 | CREATE TABLE statement to create persistent base tables | Yes |  |
| F031-02 | CREATE VIEW statement | Yes |  |
| F031-03 | GRANT statement | Yes |  |
| F031-04 | ALTER TABLE statement: ADD COLUMN clause | Yes |  |
| F031-13 | DROP TABLE statement: RESTRICT clause | Yes |  |
| F031-16 | DROP VIEW statement: RESTRICT clause | Yes |  |
| F041 | Basic joined table | Yes |  |
| F041-01 | Inner join (but not necessarily the INNER keyword) | Yes | Named columns join not supported |
| F041-02 | INNER keyword | Yes |  |
| F041-03 | LEFT OUTER JOIN | Yes |  |
| F041-04 | RIGHT OUTER JOIN | Yes |  |
| F041-05 | Outer joins can be nested | Yes |  |
| F041-07 | The inner table in a left or right outer join can also be used in an inner join | Yes |  |
| F051 | Basic date and time | Yes |  |
| F051-01 | DATE data type (including support of DATE literal) | Yes |  |
| F051-03 | TIMESTAMP data type (including support of TIMES- TAMP literal) with fractional seconds precision of at least 0 and 6. | Yes |  |
| F051-04 | Comparison predicate on DATE, TIME, and TIMES- TAMP data types | Yes |  |
| F051-05 | Explicit CAST between date- time types and character string types | Yes |  |
| F051-06 | CURRENT_DATE | Yes |  |
| F052 | Intervals and datetime arithmetic | Yes |  |
| F081 | UNION and EXCEPT in views | Partial | UNION only |
| F131 | Grouped operations | Yes |  |
| F131-01 | WHERE, GROUP BY, and HAVING clauses supported in queries with grouped views | Yes |  |
| F131-02 | Multiple tables supported in queries with grouped views | Yes |  |
| F131-03 | Set functions supported in queries with grouped views | Yes |  |
| F131-04 | Subqueries with GROUP BY and HAVING clauses and grouped views | Yes |  |
| F171 | Multiple schemas per user | Yes |  |
| F200 | TRUNCATE TABLE statement | Yes |  |
| F201 | CAST function | Yes |  |
| F261 | CASE expression | Yes |  |
| F261-01 | Simple CASE | Yes |  |
| F261-02 | Searched CASE | Yes |  |
| F261-04 | COALESCE | Yes |  |
| F311-01 | CREATE SCHEMA | Yes |  |
| F311-02 | CREATE TABLE for persistent base tables | Yes |  |
| F311-03 | CREATE VIEW | Yes |  |
| F311-05 | GRANT statement | Yes |  |
| F382 | Alter column data type | Yes | Uses nonstandard syntax |
| F391 | Long identifiers | Yes |  |
| F401 | Extended joined table | Yes |  |
| F401-01 | NATURAL JOIN | Yes |  |
| F401-02 | FULL OUTER JOIN | Yes |  |
| F401-04 | CROSS JOIN | Yes |  |
| F403 | Partitioned join tables | Yes |  |
| F531 | Temporary tables | Yes |  |
| F555 | Enhanced seconds precision | Yes |  |
| F561 | Full value expressions | Yes |  |
| F591 | Derived tables | Yes |  |
| F641 | Row and table constructors | Yes |  |
| F651 | Catalog name qualifiers | Yes |  |
| F846 | Octet support in regular expression operators | Yes |  |
| F847 | Nonconstant regular expressions | Yes |  |
| F850 | Top-level <order by clause> in <query expression> | Yes |  |
| F851 | <order by clause> in subqueries | Yes |  |
| F852 | Top-level <order by clause> in views | Yes |  |
| F855 | Nested <order by clause> in <query expression> | Yes |  |
| S023 | Basic structured types | Yes |  |
| S091 | Basic array support | Yes |  |
| S091-01 | Arrays of built-in data types | Yes |  |
| S091-02 | Arrays of distinct types | Yes |  |
| S098 | ARRAY_AGG | Partial | collect_list does the same |
| S201-01 | Array parameters | Yes |  |
| S281 | Nested collection types | Yes |  |
| T021 | BINARY and VARBINARY data types | Partial | BINARY only |
| T031 | BOOLEAN data type | Yes |  |
| T051 | Row types | Yes |  |
| T071 | BIGINT data type | Yes |  |
| T121 | WITH (excluding RECURSIVE) in query expression | Yes |  |
| T122 | WITH (excluding RECURSIVE) in subquery | Yes |  |
| T172 | AS subquery clause in table definition | Yes |  |
| T326 | Table functions | Yes |  |
| T331 | Basic roles | Yes |  |
| T431 | Extended grouping capabilities | Partial | Grouping sets need to be extracted manually from a bitmask |
| T433 | Multiargument GROUPING function | Yes |  |
| T441 | ABS and MOD functions | Partial | ABS provided, MOD provided via % operator |
| T501 | Enhanced EXISTS predicate | Yes |  |
| T581 | Regular expression substring function | Yes |  |
| T611 | Elementary OLAP operations | Yes |  |
| T612 | Advanced OLAP operations | Partial | PERCENT_RANK, CUME_DIST and ROW_NUMBER supported |
| T613 | Sampling | Yes | Nonstandard syntax via TABLESAMPLE |
| T614 | NTILE function | Yes |  |
| T615 | LEAD and LAG functions | Yes |  |
| T616 | Null treatment option for LEAD and LAG functions | Yes |  |
| T617 | FIRST_VALUE and LAST_VALUE functions | Yes |  |
| T621 | Enhanced numeric functions | Yes |  |
| T631 | IN predicate with one list element | Yes |  |

 

 

