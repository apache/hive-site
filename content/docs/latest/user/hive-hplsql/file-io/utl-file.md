---
title: "Apache Hive : UTL_FILE Package - PL/HQL Reference"
date: 2026-08-12
---

# Apache Hive : UTL_FILE Package - PL/HQL Reference

UTL_FILE package allows you to read and write HDFS files:

**Example:**

```
DECLARE
  f UTL_FILE.FILE_TYPE;
BEGIN
  f := UTL_FILE.FOPEN('/user/dm', 'hello.txt', 'w');
  UTL_FILE.PUT_LINE(f, 'Hello, world!');
  UTL_FILE.FCLOSE(f);
END;
```

In this example we create */user/dm/hello.txt* in HDFS, write a single line and close the file. 

## UTL_FILE.FILE_TYPE Type

Before you can work with a file using UTL_FILE package you have to declare a variable of UTL_FILE.FILE_TYPE. You assign a value to this variable using UTL_FILE.FOPEN function and then use it in all other functions as an argument. 

Declaring UTL_FILE.FILE_TYPE variables:

```
DECLARE
  f UTL_FILE.FILE_TYPE;
  f2 UTL_FILE.FILE_TYPE;
```

## FOPEN Function

FOPEN function opens a file. 

**Syntax:**

```
file_handle: = FOPEN(directory, file, mode);
```

**Parameters:**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| directory | VARCHAR | Directory name | 
| file | VARCHAR | File name | 
| mode | VARCHAR | Open mode: 'w' | 

**File Open Modes:**

- 'r' - Open file for reading. 
- 'w' - Open file for writing. If the file does not exist it is created. If the file already exists its content is overwritten. 

**Return Value:**

FOPEN returns UTL_FILE.FILE_TYPE file handle that you have to pass to all other functions operating on the file.

**Example:**

```
DECLARE
  f UTL_FILE.FILE_TYPE;
BEGIN
  f := UTL_FILE.FOPEN('/user/dm', 'hello.txt', 'w');
END;
```

## GET_LINE Function

GET_LINE function reads a text string from an open file. The function reads until a new line (not included to the output string), end of file or the specified maximum length. 

**Syntax:**

```
UTL_FILE.GET_LINE(file_handle, var [, len]);
```

**Parameters:**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| file_handle | UTL_FILE.FILE_TYPE | Open file handle | 
| var | VARCHAR | Variable to store the line | 
| len | INT | Maximum line length, optional | 

**Return Value:**

No.

**Example:**

```
DECLARE
  f UTL_FILE.FILE_TYPE;
  s VARCHAR(100);
BEGIN
  f := UTL_FILE.FOPEN('/user/dm', 'hello.txt', 'r');
  UTL_FILE.GET_LINE(f, s, 100);
END;
```

## PUT_LINE Function

PUT_LINE function writes a text string to the file. The function appends a line terminator. 

**Syntax:**

```
UTL_FILE.PUT_LINE(file_handle, text);
```

**Parameters:**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| file_handle | UTL_FILE.FILE_TYPE | Open file handle | 
| text | VARCHAR | Text string to write | 

**Return Value:**

No.

**Example:**

```
DECLARE
  f UTL_FILE.FILE_TYPE;
BEGIN
  f := UTL_FILE.FOPEN('/user/dm', 'hello.txt', 'w');
  UTL_FILE.PUT_LINE(f, 'Hello, world!');
END;
```
## PUT Function

PUT_LINE function writes a text string to the file. Unlike PUT_LINE this function **does not** append a line terminator. 

**Syntax:**

```
UTL_FILE.PUT(file_handle, text);
```

**Parameters:**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| file_handle | UTL_FILE.FILE_TYPE | Open file handle | 
| text | VARCHAR | Text string to write | 

**Return Value:**

No.

**Example:**

```
DECLARE
  f UTL_FILE.FILE_TYPE;
BEGIN
  f := UTL_FILE.FOPEN('/user/dm', 'hello.txt', 'w');
  UTL_FILE.PUT(f, 'Hello, world!');
END;
```

## FCLOSE Function

FCLOSE function closes an open file identified by a file handle. 

**Syntax:**

```
UTL_FILE.FCLOSE(file_handle);
```

**Parameters:**

| **Parameter** | **Type** | **Description** |
| --- | --- | --- |
| file_handle | UTL_FILE.FILE_TYPE | Open file handle | 

**Return Value:**

No.

**Example:**

```
DECLARE
  f UTL_FILE.FILE_TYPE;
BEGIN
  f := UTL_FILE.FOPEN('/user/dm', 'hello.txt', 'w');
  UTL_FILE.FCLOSE(f);
END;
```
