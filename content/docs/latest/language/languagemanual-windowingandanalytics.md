---
title: "Apache Hive : Language Manual Windowing And Analytics"
date: 2025-09-18
---

## Introduction to Windowing and Analytics in Hive

Window functions, represent a significant enhancement to HiveQL, transforming it from a powerful batch aggregation tool into a sophisticated platform for advanced data analysis. These functions perform calculations across a set of table rows that are related to the current row. This set of rows is known as a "window" or "frame," and it is defined by the `OVER` clause.

Unlike standard aggregate functions (such as `SUM()` or `COUNT()` with a `GROUP BY` clause), which collapse multiple rows into a single output row, window functions return a value for *each* row based on the calculation over its corresponding window. This capability allows analysts to blend aggregated context with individual row data seamlessly, enabling complex analytical tasks like calculating running totals, moving averages, and period-over-period comparisons within a single, efficient query pass.

This evolution marks a fundamental shift in Hive's capabilities. Before the introduction of window functions, such analyses often required complex and inefficient self-joins or multiple query stages. By providing these SQL-standard analytical features, Hive empowers users to ask more nuanced questions of their data directly, making it a more competitive and feature-rich analytical database for massive datasets.

The foundational work for these features is detailed in the Hive project's JIRA tickets, primarily "(https://issues.apache.org/jira/secure/attachment/12575830/WindowingSpecification.pdf)" (attached to [HIVE-4197](https://issues.apache.org/jira/browse/HIVE-4197)) and [HIVE-896](https://issues.apache.org/jira/browse/HIVE-896), which provide further historical context and examples. All windowing and analytical functions in Hive operate in accordance with the SQL standard.

## The Anatomy of a Window Function: The OVER Clause

The `OVER` clause is the syntactic cornerstone of all window functions; its presence is what distinguishes a window function from a standard aggregate or scalar function. The `OVER` clause defines the window—the specific set of rows over which the function will be computed. It has three primary components that can be used in combination to precisely control the window's definition: `PARTITION BY`, `ORDER BY`, and the window frame clause (`ROWS` or `RANGE`)

```
window_function(expression) OVER ([partition_by] [order by] [frame_clause])

````

### Partitioning Data with PARTITION BY

The `PARTITION BY` clause logically divides a result set into independent groups, or partitions, based on the values of one or more specified columns. The window function is then applied to each partition separately, and its calculation is reset at the boundary of each new partition.

While this is conceptually similar to how `GROUP BY` creates groups, `PARTITION BY` does not collapse the original rows. Each row from the input set is preserved in the output, now augmented with the result of the window function computed over its partition.

**Example: Counting Employees per Department**

Consider a table `employees` with columns `emp_name`, `department`, and `salary`. To count the number of employees in each department and display that count alongside each employee's record, the query would be:

```sql
SELECT
  emp_name,
  department,
  salary,
  COUNT(emp_name) OVER (PARTITION BY department) AS dept_employee_count
FROM employees;
````

In this query, the `PARTITION BY department` clause instructs the `COUNT` function to operate on partitions defined by unique `department` values. For every row belonging to the 'Sales' department, the function will count all employees in the 'Sales' partition. The same process occurs independently for the 'Engineering' department, and so on. The result is that every employee record will have a `dept_employee_count` column showing the total number of employees in their respective department.

### Ordering Rows with ORDER BY

Within the `OVER` clause, `ORDER BY` specifies the logical sequence of rows *inside each partition*. This ordering is crucial for functions that are sequence-dependent, such as ranking functions (`RANK()`, `ROW_NUMBER()`) and positional functions (`LEAD()`, `LAG()`). It is also essential for calculations like running totals, where the order of accumulation is significant.

The `ORDER BY` clause inside `OVER()` is distinct from and applied before the final `ORDER BY` clause of the entire `SELECT` statement, which sorts the final result set for display.

**Example: Calculating a Running Salary Total**

To calculate a cumulative sum of salaries within each department, ordered by employee name, the query would be:

```sql
SELECT
  emp_name,
  department,
  salary,
  SUM(salary) OVER (PARTITION BY department ORDER BY emp_name) AS running_salary_total
FROM employees;
```

Here, the data is first partitioned by `department`. Then, within each department, rows are sorted by `emp_name`. The `SUM(salary)` function then accumulates the salary values according to this order. The `running_salary_total` for the first employee (alphabetically) in a department will be their own salary. For the second employee, it will be the sum of the first and second employees' salaries, and so on, with the calculation resetting for each new department.

### Defining the Window Frame (ROWS vs. RANGE)

The window frame clause provides the most granular level of control, specifying the precise, sliding subset of rows within a partition that the function considers for each row's calculation. The frame is defined relative to the current row being processed. Hive supports two ways to define this frame: `ROWS` and `RANGE`.

The general syntax for the frame clause is:

```sql
(ROWS | RANGE) BETWEEN <frame_start> AND <frame_end>
```

Where `<frame_start>` and `<frame_end>` can be one of the following:

  * `UNBOUNDED PRECEDING`: The frame starts at the first row of the partition.
  * `n PRECEDING`: The frame starts `n` rows before the current row.
  * `CURRENT ROW`: The frame starts or ends at the current row.
  * `n FOLLOWING`: The frame ends `n` rows after the current row.
  * `UNBOUNDED FOLLOWING`: The frame ends at the last row of the partition.

#### Default Window Frame Behavior

Understanding the default frame is critical, as it is a common source of unexpected query behavior:

  * **When `ORDER BY` is specified without a window frame clause**, the default is `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`.
  * **When both `ORDER BY` and the window frame clause are absent**, the default is `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` (i.e., the entire partition).

#### The ROWS Clause: Physical Offsets

The `ROWS` clause defines the window frame based on a fixed number of physical rows preceding or following the current row. It is straightforward and treats each row as a distinct entity, even if they have identical values in the `ORDER BY` columns (i.e., they are peers).

**Example: 3-Day Moving Average of Sales**

To calculate a moving average of sales over a 3-day window (the current day and the two preceding days), `ROWS` is the appropriate choice.

```sql
SELECT
  sale_date,
  daily_sales,
  AVG(daily_sales) OVER (ORDER BY sale_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg_3day
FROM daily_sales_summary;
```

For each row, this query will average the `daily_sales` value of the current row and the two rows that physically precede it in the sorted partition.

#### The RANGE Clause: Logical Value Offsets

The `RANGE` clause defines the window frame based on a logical range of *values* relative to the current row's value in the `ORDER BY` column. A key characteristic of `RANGE` is that all rows with the same value in the `ORDER BY` column (peers) are processed together as a group.

**Example: Cumulative Sales by Date**

Consider calculating the cumulative sales up to the current date. If multiple sales occurred on the same date, you might want the running total to reflect the complete sum for that date for all of its sales records.

```sql
SELECT
  sale_date,
  sale_amount,
  SUM(sale_amount) OVER (ORDER BY sale_date RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_sales_by_date
FROM sales_transactions;
```

If there are three sales on '2024-10-26', the `cumulative_sales_by_date` value will be the same for all three of those rows. This value will be the sum of all sales up to and *including* all sales from '2024-10-26'. This differs from `ROWS`, which would have produced three distinct, sequentially increasing totals for those three rows.

#### `RANGE` vs. `ROWS`: A Critical Distinction

The choice between `ROWS` and `RANGE` is not merely syntactic; it has profound implications for query logic and performance. The default to `RANGE` when `ORDER BY` is used is a common trap that can lead to both incorrect results and severe performance degradation.

For instance, a user intending to calculate a simple row-by-row running total might write `SUM(col) OVER (ORDER BY date_col)`. Because this defaults to `RANGE`, if there are multiple rows with the same `date_col`, the running total will appear to "jump" and will be identical for all those peer rows, which is often not the desired behavior. The `ROWS` clause would have produced the intended sequential accumulation.

From a performance perspective, `RANGE` can be significantly slower because for each row, the execution engine must scan for all other rows whose values fall within the specified logical range. In contrast, `ROWS` simply counts a fixed number of rows from its current position in the sorted partition, which is a much less computationally intensive operation. Therefore, it is crucial to explicitly specify `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` when a standard running total is needed.

The following table provides a clear comparison:

| Criterion | `ROWS` | `RANGE` |
| :--- | :--- | :--- |
| **Definition** | Defines the window frame by a physical number of rows relative to the current row. | Defines the window frame by a logical range of values relative to the current row's value in the `ORDER BY` column. |
| **Behavior with Ties** | Treats rows with identical `ORDER BY` values (peers) as distinct, individual rows. | Groups all peer rows together. The frame includes all rows that have the same value as the current row. |
| **Performance** | Generally faster and more efficient, as it involves simple row counting. | Can be significantly slower, as it requires scanning for values within a range for each row. |
| **Common Use Case** | Calculating running totals, moving averages, or any sequence-based metric where each row must be treated individually. | Calculating metrics over a logical range, such as "total sales on this date" or "count of events within 5 minutes of the current event." |

## Data Organization: `PARTITION BY` vs. `DISTRIBUTE BY` and `ORDER BY` vs. `SORT BY`

A common point of confusion for users of HiveQL is the distinction between clauses that control the physical execution of a query across a distributed cluster (`DISTRIBUTE BY`, `SORT BY`) and the clauses used within a window function's `OVER()` clause (`PARTITION BY`, `ORDER BY`). These pairs of clauses have similar names but serve fundamentally different purposes.

The core difference is that `DISTRIBUTE BY` and `SORT BY` are directives for the underlying execution engine (like MapReduce or Tez) on **how to physically arrange and shuffle data between nodes**. In contrast, `PARTITION BY` and `ORDER BY` are directives for the window function on **how to logically interpret the data it receives** after the physical arrangement is complete.

### `DISTRIBUTE BY` vs. `PARTITION BY`

  * **`DISTRIBUTE BY`**: This clause controls how data is partitioned across reducers during the shuffle phase of a distributed job. It guarantees that all rows with the same key in the `DISTRIBUTE BY` clause will be sent to the same reducer process. Its primary purpose is to manage data distribution for subsequent processing, such as ensuring that all data for a specific user ID is handled by a single machine. It does not, by itself, imply any sorting.
  * **`PARTITION BY`**: As described previously, this clause logically groups data *within the context of a window function*. This logical grouping occurs on the data that has already been delivered to a reducer. It defines the scope of the window function's calculation and has no direct influence on how data is shuffled across the cluster.

### `ORDER BY` vs. `SORT BY`

  * **`ORDER BY` (Global)**: When used as the final clause of a `SELECT` statement, `ORDER BY` guarantees a total, global ordering of the entire final output. To achieve this, Hive must send all data to a single reducer, which sorts the complete dataset. This process is extremely resource-intensive and often becomes a severe performance bottleneck on large datasets. In Hive's strict mode, using `ORDER BY` without a `LIMIT` clause is prohibited to prevent accidental performance issues.
  * **`SORT BY`**: This clause provides a more scalable alternative to `ORDER BY`. It guarantees that the data is sorted only *within the output of each individual reducer*. This results in multiple sorted output files, but the data is not globally sorted across all files. For example, the maximum value from one reducer's output could be lower than the minimum value from another's. `SORT BY` is highly efficient because the sorting happens in parallel on each reducer.
  * **`ORDER BY` (in `OVER` clause)**: This clause, as discussed, defines the logical order of rows *within a window partition*. It dictates the sequence for the window function's calculation on the data present at a given worker node.

### `CLUSTER BY`

The `CLUSTER BY` clause is a convenient shorthand for using the same column(s) for both `DISTRIBUTE BY` and `SORT BY`. Using `CLUSTER BY x` is equivalent to `DISTRIBUTE BY x SORT BY x`. It ensures that rows with the same key are sent to the same reducer and are also sorted by that key within the reducer's output.

The following table summarizes these crucial distinctions:

| Comparison | Physical Execution Clauses | Logical Window Clauses |
| :--- | :--- | :--- |
| **Grouping** | **`DISTRIBUTE BY`** | **`PARTITION BY`** |
| **Scope** | Physical (Cluster-wide) | Logical (Within a window function) |
| **Purpose** | Controls how data is shuffled to reducers. | Defines calculation groups for a window function. |
| **Impact** | Affects shuffle performance, data skew, and parallelism. | Affects the result of the window function calculation. |
| **Sorting** | **`SORT BY`** / **`ORDER BY` (Global)** | **`ORDER BY` (in `OVER`)** |
| **Scope** | Physical (Per-reducer for `SORT BY`; Single reducer for `ORDER BY`) | Logical (Within a window partition) |
| **Purpose** | Sorts the output files. | Defines the sequence for a window function's calculation. |
| **Impact** | `SORT BY` is scalable; `ORDER BY` (Global) is a bottleneck. | Determines the result of sequence-dependent functions. |

## Window Function Reference

Hive supports a rich set of ranking, positional, and distributional functions that can be used with the `OVER` clause.

### Ranking Functions

Ranking functions assign a numerical rank to each row within a partition based on the `ORDER BY` specification.

#### `ROW_NUMBER()`

Assigns a unique, sequential integer to each row within its partition, starting from 1. Even if rows have identical values in the `ORDER BY` clause (ties), each will receive a distinct number. No two rows within a partition will have the same row number.

**Example:**

```sql
SELECT
  emp_name,
  department,
  salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num
FROM employees;
```

This query assigns a unique number to each employee within their department, based on descending salary.

#### `RANK()`

Assigns a rank to each row within a partition. Rows with the same value in the `ORDER BY` clause receive the same rank. However, `RANK()` will skip the subsequent rank number(s) after a tie. For example, if two rows tie for rank 1, the next rank assigned will be 3.

**Example:**

```sql
SELECT
  emp_name,
  department,
  salary,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_num
FROM employees;
```

If two employees in the 'Sales' department have the highest salary, they will both get `rank_num` 1. The employee with the next highest salary will get `rank_num` 3.

#### `DENSE_RANK()`

Assigns a rank to each row within a partition, similar to `RANK()`. However, `DENSE_RANK()` does not skip ranks after a tie. If two rows tie for rank 1, the next rank assigned will be 2, ensuring a consecutive sequence of ranks.

**Example:**

```sql
SELECT
  emp_name,
  department,
  salary,
  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank_num
FROM employees;
```

In the same scenario as above, the two employees tied for the highest salary will both get `dense_rank_num` 1, and the next employee will get `dense_rank_num` 2.

#### `NTILE(n)`

Divides the ordered rows in a partition into a specified number of (`n`) approximately equal groups, or buckets. It then assigns a bucket number (from 1 to `n`) to each row. If the number of rows is not perfectly divisible by `n`, the extra rows will be distributed among the first few buckets, making them slightly larger. This is useful for creating quartiles (`NTILE(4)`), deciles (`NTILE(10)`), etc.

**Example:**

```sql
SELECT
  emp_name,
  salary,
  NTILE(4) OVER (ORDER BY salary DESC) AS salary_quartile
FROM employees;
```

This query divides all employees into four quartiles based on their salary, with the highest-paid employees in quartile 1 and the lowest-paid in quartile 4.

### Positional Value Functions

These functions access data from other rows relative to the current row's position within the partition.

#### `LAG(col, offset, default)`

Provides access to the value of `col` from a previous row in the partition without requiring a self-join.

  * `col`: The column to retrieve the value from.
  * `offset`: (Optional) The number of rows to look back. Defaults to 1.
  * `default`: (Optional) The value to return if the offset goes beyond the start of the partition. Defaults to `NULL`.

**Example:**

```sql
SELECT
  sale_date,
  daily_sales,
  LAG(daily_sales, 1, 0) OVER (ORDER BY sale_date) AS previous_day_sales
FROM daily_sales_summary;
```

This query retrieves the sales amount from the previous day for each record. For the very first date in the dataset, it will return 0.

#### `LEAD(col, offset, default)`

Provides access to the value of `col` from a subsequent row in the partition. Its parameters are identical to `LAG`.

**Example:**

```sql
SELECT
  sale_date,
  daily_sales,
  LEAD(daily_sales, 1, 0) OVER (ORDER BY sale_date) AS next_day_sales
FROM daily_sales_summary;
```

This query retrieves the sales amount for the following day. For the last date in the dataset, it will return 0.

#### `FIRST_VALUE(col)`

Returns the value of `col` from the first row of the current window frame.

**Example:**

```sql
SELECT
  emp_name,
  department,
  hire_date,
  FIRST_VALUE(emp_name) OVER (PARTITION BY department ORDER BY hire_date) AS first_hire_in_dept
FROM employees;
```

This query identifies the first person hired in each department and displays their name on every employee's record within that same department.

#### `LAST_VALUE(col)`

Returns the value of `col` from the last row of the current window frame.

**The `LAST_VALUE` Default Frame Pitfall:**
A common error when using `LAST_VALUE` is expecting it to return the last value of the entire partition, but instead receiving the value of the current row. This occurs because the default window frame (when `ORDER BY` is present) is `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. For any given row, the "last value" in this frame is simply the value of the current row itself.

To get the true last value of the entire partition, one must explicitly define a frame that includes all rows.

**Example (Corrected):**

```sql
SELECT
  emp_name,
  department,
  hire_date,
  LAST_VALUE(emp_name) OVER (
    PARTITION BY department
    ORDER BY hire_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS last_hire_in_dept
FROM employees;
```

By specifying `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`, the window frame for every row becomes the entire partition, ensuring `LAST_VALUE` correctly returns the name of the most recently hired person in the department.

### Distributional and Percentile Functions

These functions provide statistical information about the distribution of values within a partition.

#### `CUME_DIST()`

Calculates the cumulative distribution of a value within a partition. It is defined as the number of rows with values less than or equal to the current row's value, divided by the total number of rows in the partition. The result is a value greater than 0 and less than or equal to 1.

**Example:**

```sql
SELECT
  emp_name,
  salary,
  CUME_DIST() OVER (ORDER BY salary) AS salary_cume_dist
FROM employees;
```

This query shows the relative position of each employee's salary within the company. An employee with a `salary_cume_dist` of 0.9 is in the 90th percentile of earners.

#### `PERCENT_RANK()`

Calculates the relative rank of a row as a percentage, with values ranging from 0 to 1, inclusive. The formula is $ (\\text{rank} - 1) / (\\text{total rows in partition} - 1) $. The first row in any partition always has a `PERCENT_RANK` of 0.

**Example:**

```sql
SELECT
  emp_name,
  salary,
  PERCENT_RANK() OVER (ORDER BY salary) AS salary_percent_rank
FROM employees;
```

This function is similar to `CUME_DIST` but provides a rank based on the percentage of values strictly less than the current value.

#### `PERCENTILE_CONT()` and `PERCENTILE_DISC()`

While standard SQL defines `PERCENTILE_CONT` (continuous distribution, may interpolate a value) and `PERCENTILE_DISC` (discrete distribution, returns an existing value), Hive's implementation addresses percentile calculation through two distinct functions that reflect the trade-offs required in large-scale distributed systems.

The design choice to separate exact, integer-only calculations from approximate, float-friendly ones is a deliberate engineering decision for performance at scale. Calculating an exact percentile requires sorting all data points, which is computationally expensive for high-cardinality floating-point data. Distributed systems often use approximation algorithms (like Quantile Digests) to provide high-quality estimates with bounded error while using manageable memory, which is the role of `percentile_approx`.

  * **`percentile(BIGINT col, p)`**: This function calculates the **exact** p-th percentile of a column. It is highly precise but has a significant limitation: it only operates on columns of type `BIGINT`. The percentile `p` must be between 0 and 1.

  * **`percentile_approx(DOUBLE col, p)`**: This function calculates an **approximate** p-th percentile and works with numeric types, including `DOUBLE`. The optional `B` parameter controls the approximation accuracy at the cost of memory; higher values yield better approximations, with a default of 10,000. If the number of distinct values in the column is less than `B`, the result will be exact.

**Example:**

```sql
-- To find the exact median (50th percentile) of an integer column
SELECT percentile(page_views, 0.5) FROM web_logs;

-- To find the approximate 95th percentile of a floating-point column
SELECT percentile_approx(transaction_amount, 0.95) FROM sales;
```

### Aggregate Functions as Window Functions

Standard aggregate functions like `SUM`, `COUNT`, `AVG`, `MIN`, and `MAX` can be used as window functions by adding an `OVER` clause. This allows them to compute an aggregate value over a window while retaining the individual rows.

#### `SUM()`

When used as a window function, `SUM()` is one of the most versatile tools for analysis.

**Example 1: Group Totals**
To calculate the total sales for each region and display it next to each individual sale:

```sql
SELECT
  sale_id,
  region,
  sale_amount,
  SUM(sale_amount) OVER (PARTITION BY region) AS total_region_sales
FROM sales;
```

**Example 2: Running Total**
To calculate a cumulative sum of sales over time:

```sql
SELECT
  sale_date,
  sale_amount,
  SUM(sale_amount) OVER (ORDER BY sale_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total_sales
FROM sales;
```

## Advanced Usage and Examples

Hive provides additional syntax to enhance the power and readability of windowing queries.

### Multiple `OVER` Clauses in a Single Query

A single query can contain multiple window functions, each with its own, independent `OVER` clause. This allows for complex, multi-faceted analysis in one step.

**Example:**

```sql
SELECT
  emp_name,
  department,
  salary,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept,
  SUM(salary) OVER (PARTITION BY department) AS total_dept_salary
FROM employees;
```

This query calculates each employee's salary rank within their department and the total salary expenditure for that department simultaneously.

### Named Windows with the `WINDOW` Clause

For queries that use the same window specification for multiple functions, the `WINDOW` clause can be used to define a named window. This improves query readability and reduces redundancy.

**Example:**

```sql
SELECT
  emp_name,
  department,
  salary,
  RANK() OVER w AS rank_in_dept,
  SUM(salary) OVER w AS total_dept_salary
FROM employees
WINDOW w AS (PARTITION BY department ORDER BY salary DESC);
```

Here, the window specification `w` is defined once and then referenced by both the `RANK()` and `SUM()` functions.

### `DISTINCT` with Aggregate Window Functions

Starting with Hive 2.1.0 ([HIVE-9534](https://issues.apache.org/jira/browse/HIVE-9534)), `DISTINCT` is supported for aggregate window functions like `COUNT`, `SUM`, and `AVG`. This allows for calculations over the unique values within each partition. In Hive 2.2.0 ([HIVE-13453](https://issues.apache.org/jira/browse/HIVE-13453)), this support was extended to include `ORDER BY` and window frame clauses.

**Example: Counting Distinct Customers per Region**

```sql
SELECT
  sale_date,
  region,
  COUNT(DISTINCT customer_id) OVER (PARTITION BY region ORDER BY sale_date ROWS BETWEEN 30 PRECEDING AND CURRENT ROW) AS distinct_customers_30day_window
FROM sales;
```

### Aggregates in the `ORDER BY` Clause

In a more advanced use case, introduced in Hive 2.1.0 ([HIVE-13475](https://issues.apache.org/jira/browse/HIVE-13475)), aggregate functions can be referenced within the `OVER` clause itself. This typically requires a `GROUP BY` clause in the main query.

**Example: Ranking Departments by Total Sales**

```sql
SELECT
  department,
  SUM(sales) as total_sales,
  RANK() OVER (ORDER BY SUM(sales) DESC) as sales_rank
FROM department_sales
GROUP BY department;
```

This query first calculates the total sales for each department using `GROUP BY`, and then uses a window function to rank the departments based on that aggregated sum.
