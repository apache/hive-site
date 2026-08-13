---
title: "Apache Hive : SQLSTATE - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : SQLSTATE - PL/HQL Reference

SQLSTATE built-in variable contains a 5-character return status of the last SQL statement. 

SQLSTATE status code consists of a 2-character class code followed by a 3-character subclass code. Class code 00 (SQLSTATE '00000' i.e.) means the successful completion.

**Example:**

```
SET plhql.onerror = seterror; -- Prevent raising an exception

SELECT 1 FROM abc.abc;
PRINT SQLSTATE;
```

**Compatibility:** IBM DB2.

**Version:** PL/HQL 0.03

**See also:**
- [Error Handling]({{< ref "error-handling" >}})
- [SQLCODE]({{< ref "sqlcode" >}})
- [GET DIAGNOSTICS]({{< ref "get-diagnostics" >}})
- [RESIGNAL]({{< ref "resignal" >}})
