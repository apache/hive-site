---
title: "Apache Hive : Write Ordering"
date: 2025-10-31
---

# Apache Hive : Write Ordering

## Overview

Write ordering controls the physical layout of data within table files. Unlike `SORT BY` which orders data during query execution, write ordering is applied at write time and persists in the stored files.

Write ordering is supported for Iceberg tables and can be specified during table creation.

Hive supports two write ordering strategies:
* **Type-Native Ordering**: Sort by one or more columns in a specified order
* **Z-Ordering**: Multi-dimensional clustering using space-filling curves

---

## Type-Native Column Ordering

### Version

Introduced in Hive version [4.1.0](https://issues.apache.org/jira/browse/HIVE-28586)

### Syntax

```sql
CREATE TABLE table_name (column_definitions)
WRITE [LOCALLY] ORDERED BY column_name [ASC | DESC] [NULLS FIRST | NULLS LAST]
  [, column_name [ASC | DESC] [NULLS FIRST | NULLS LAST] ]*
STORED BY ICEBERG
[STORED AS file_format];
```

### Options

* Sort Order
  * `ASC`: Ascending order (default)
  * `DESC`: Descending order
* Null Order
  * `NULLS FIRST`: Null values sorted before non-null values
  * `NULLS LAST`: Null values sorted after non-null values

### Examples

Single column:

```sql
CREATE TABLE events (
  event_id BIGINT,
  event_date DATE,
  event_type STRING
)
WRITE LOCALLY ORDERED BY event_date DESC
STORED BY ICEBERG
STORED AS ORC;
```

Multiple columns with null handling:

```sql
CREATE TABLE orders (
  order_id BIGINT,
  order_date DATE,
  customer_id INT,
  amount DECIMAL(10,2)
)
WRITE ORDERED BY order_date DESC NULLS FIRST, order_id ASC
STORED BY ICEBERG;
```

### Use Cases

Type-Native ordering is most effective for:

* Time-series data with temporal access patterns
* Range queries on sorted columns
* Queries with consistent ORDER BY clauses
* Single-dimensional access patterns

---

## Z-Ordering

### Version

Introduced in Hive version [4.2.0](https://issues.apache.org/jira/browse/HIVE-29133)

### Overview

Z-order applies a multi-dimensional clustering technique based on space-filling curves. This approach interleaves column values to co-locate related records across multiple dimensions, enabling efficient filtering on various column combinations.

### Syntax

```sql
CREATE TABLE table_name (column_definitions)
WRITE [LOCALLY] ORDERED BY ZORDER(column_name [, column_name ]*)
STORED BY ICEBERG
[STORED AS file_format];
```

### Example

```sql
CREATE TABLE user_events (
  user_id INT,
  event_date DATE,
  event_type STRING,
  value DOUBLE
)
WRITE LOCALLY ORDERED BY ZORDER(user_id, event_date)
STORED BY ICEBERG
STORED AS ORC;
```

### Table Properties Method

Z-ordering can alternatively be specified using table properties.

```sql
CREATE TABLE table_name (column_definitions)
STORED BY ICEBERG
TBLPROPERTIES (
  'sort.order' = 'zorder',
  'sort.columns' = 'column1,column2'
);
```

### Use Cases

Z-order is most effective for:

* Multi-dimensional analytical queries
* Ad-hoc queries with varying filter patterns
* Queries filtering on different column combinations
---

## Comparison with SORT BY

| Feature | WRITE ORDERED BY | SORT BY |
|---------|------------------|---------|
| Application | Write time | Query time |
| Persistence | Permanent in files | Query result only |
| Scope | Physical file layout | Query execution |
| Table Support | Iceberg tables | All table types |

---

## Limitations and Considerations

* Write ordering only applies to Iceberg tables
* Write operations incur ordering overhead:
    * Type-Native ordering: Sort cost
    * Z-order: Sort cost plus z-value computation
* Column selection should be based on query workload analysis
