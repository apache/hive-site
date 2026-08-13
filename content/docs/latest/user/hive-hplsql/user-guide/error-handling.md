---
title: "Apache Hive : Error Handling in PL/HQL"
date: 2026-08-12
---

# Apache Hive : Error Handling in PL/HQL

PL/HQL allows you to use exceptions, condition handlers and error code to handle errors. The [plhql.onerror]({{< ref "configuration#plhqlonerror" >}}) configuration option defines how PL/HQL handles errors. It accepts the following values:

- **Exception** (default)

In this case when an error occurs, PL/HQL raises an exception. If there is an exception or condition handler for this error, it is executed. 

- **Seterror** 

When Seterror is specified, PL/HQL sets the error code to SQLCODE or HOSTCODE variables and continues execution.

- **Stop**

PL/HQL stops executing the script and exits.

Note that you can dynamically change [plhql.onerror]({{< ref "configuration#plhqlonerror" >}}) option by executing the SET statement in the script:

```
SET plhql.onerror = exception | seterror | stop;
```

**See also:**
- [DECLARE CONDITION]({{< ref "declare-condition" >}})
- [DECLARE HANDLER]({{< ref "declare-handler" >}})
- [SQLCODE]({{< ref "sqlcode" >}})
- [SQLSTATE]({{< ref "sqlstate" >}})
- [GET DIAGNOSTICS]({{< ref "get-diagnostics" >}})
- [SIGNAL]({{< ref "signal" >}})
- [RESIGNAL]({{< ref "resignal" >}})
