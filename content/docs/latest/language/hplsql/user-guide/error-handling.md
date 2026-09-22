---
title: "Apache Hive : HPL/SQL - Error Handling"
date: 2026-08-12
---

# Apache Hive : HPL/SQL - Error Handling

HPL/SQL allows you to use exceptions, condition handlers and error code to handle errors. The [hplsql.onerror]({{< ref "configuration#hplsqlonerror" >}})  configuration option defines how HPL/SQL handles errors. It accepts the following values:

- **Exception** (default)

In this case when an error occurs, HPL/SQL raises an exception. If there is an exception or condition handler for this error, it is executed. 

- **Seterror** 

When Seterror is specified, HPL/SQL sets the error code to SQLCODE variables and continues execution.

- **Stop**

HPL/SQL stops executing the script and exits.

Note that you can dynamically change [hplsql.onerror]({{< ref "configuration#hplsqlonerror" >}}) option by executing the SET statement in the script:

```
SET hplsql.onerror = exception | seterror | stop;
```

**See also:**
- [DECLARE CONDITION]({{< ref "declare-condition" >}})
- [DECLARE HANDLER]({{< ref "declare-handler" >}})
- [SQLCODE]({{< ref "sqlcode" >}})
- [SQLSTATE]({{< ref "sqlstate" >}})
- [GET DIAGNOSTICS]({{< ref "get-diagnostics" >}})
- [SIGNAL]({{< ref "signal" >}})
- [RESIGNAL]({{< ref "resignal" >}})
