---
title: "Apache Hive : Iceberg REST Catalog API backed by Hive Metastore"
date: 2025-11-14
---

# Apache Hive : Iceberg REST Catalog API backed by Hive Metastore

{{< toc >}}

## Introduction

![](../images/hive-iceberg-rest-integration.png)

Hive Metastore offers [Iceberg REST API](https://iceberg.apache.org/rest-catalog-spec/) endpoints for clients native to Apache Iceberg. Consequently, Iceberg users can access Iceberg tables via either Hive Metastore Thrift API (using HiveCatalog) or Iceberg REST Catalog API.

## Basic configurations

You must configure the following parameters.

| Key | Required? | Default | Value |
|-|-|-|-|
| metastore.catalog.servlet.port | Yes | -1 | The port number to which Iceberg REST API listens |

## Authentication

Hive Metastore's Iceberg REST API supports four authentication methods.

### OAuth 2

OAuth 2 is the industry standard for authenticating Iceberg client usernames. You can integrate Hive Metastore with your Authorization Server, e.g., Keycloak, to protect Iceberg resources. See [Apache Hive : Setting Up OAuth 2]({{< relref "oauth2/_index.md" >}}) for further details.

### JWT

You can configure Hive Metastore so that its Iceberg REST API accepts a JSON Web Token (JWT) as a bearer token in the Authorization header. This is the default authentication mechanism because the default value of `metastore.catalog.servlet.auth` is `jwt`. The JSON Web Key Set (JWKS) locations must be configured using the `metastore.authentication.jwt.jwks.url` property. Hive Metastore derives the username from the `sub` claim of a properly-signed JWT.

### Simple

When `metastore.catalog.servlet.auth=simple`, Hive Metastore assumes that the value of the `x-actor-username` HTTP header is the authenticated username. You may use it to test authorized access, but this mode is not recommend in a production environment.

### None

When `metastore.catalog.servlet.auth=none`, Hive Metastore does not enforce any authentication. This mode may be used for testing only.

## Authorization

You can apply database-level or table-level authorization in Hive Metastore. See also: [Apache Hive : LanguageManual Authorization]({{< relref "../language/languagemanual-authorization.md" >}}).

For example, you can secure Iceberg REST API using Apache Ranger.

```xml
<property>
  <name>hive.security.authorization.manager</name>
  <value>org.apache.ranger.authorization.hive.authorizer.RangerHiveAuthorizerFactory</value>
</property>
<property>
  <name>metastore.pre.event.listeners</name>
  <value>org.apache.hadoop.hive.ql.security.authorization.plugin.metastore.HiveMetaStoreAuthorizer</value>
</property>
```

## Example: Minimal Setup with Docker

The official Docker images expose the REST API endpoints on the 9001 port with `metastore.catalog.servlet.auth=none`. A single command lets you try Iceberg REST Catalog.

```sh
$ docker run --rm -p 9001:9001 apache/hive:standalone-metastore-{Hive version}
```

```sh
$ curl http://localhost:9001/iceberg/v1/config
{"defaults":{},"overrides":{},"endpoints":["GET v1/config","GET /v1/{prefix}/namespaces","POST /v1/{prefix}/namespaces","HEAD /v1/{prefix}/namespaces/{namespace}","GET /v1/{prefix}/namespaces/{namespace}","DELETE /v1/{prefix}/namespaces/{namespace}","POST /v1/{prefix}/namespaces/{namespace}/properties","GET /v1/{prefix}/namespaces/{namespace}/tables","POST /v1/{prefix}/namespaces/{namespace}/tables","HEAD /v1/{prefix}/namespaces/{namespace}/tables/{table}","GET /v1/{prefix}/namespaces/{namespace}/tables/{table}","POST /v1/{prefix}/namespaces/{namespace}/register","POST /v1/{prefix}/namespaces/{namespace}/tables/{table}","DELETE /v1/{prefix}/namespaces/{namespace}/tables/{table}","POST /v1/{prefix}/tables/rename","POST /v1/{prefix}/namespaces/{namespace}/tables/{table}/metrics","POST /v1/{prefix}/transactions/commit","GET /v1/{prefix}/namespaces/{namespace}/views","HEAD /v1/{prefix}/namespaces/{namespace}/views/{view}","GET /v1/{prefix}/namespaces/{namespace}/views/{view}","POST /v1/{prefix}/namespaces/{namespace}/views","POST /v1/{prefix}/namespaces/{namespace}/views/{view}","POST /v1/{prefix}/views/rename","DELETE /v1/{prefix}/namespaces/{namespace}/views/{view}"]}

$ curl -X POST \
  http://localhost:9001/iceberg/v1/namespaces/default/tables \
  -H "Content-Type: application/json" \
  -d '{
    "name": "test",
    "schema": {
      "type": "struct",
      "fields": [
        {"id": 1, "name": "id", "type": "long", "required": true}
      ]
    },
    "write-disposition": "create"
  }'
{"metadata-location":"file:/opt/hive/data/warehouse/test/metadata/00000-f1a3fec1-f0b6-499b-b635-d6a408458390.metadata.json","metadata":{"format-version":2,"table-uuid":"47ca342c-b65b-4e51-a09d-1b470f20298a","location":"file:/opt/hive/data/warehouse/test","last-sequence-number":0,"last-updated-ms":1763188388952,"last-column-id":1,"current-schema-id":0,"schemas":[{"type":"struct","schema-id":0,"fields":[{"id":1,"name":"id","required":true,"type":"long"}]}],"default-spec-id":0,"partition-specs":[{"spec-id":0,"fields":[]}],"last-partition-id":999,"default-sort-order-id":0,"sort-orders":[{"order-id":0,"fields":[]}],"properties":{"write.parquet.compression-codec":"zstd"},"current-snapshot-id":-1,"refs":{},"snapshots":[],"statistics":[],"partition-statistics":[],"snapshot-log":[],"metadata-log":[]}}

$ curl http://localhost:9001/iceberg/v1/namespaces/default/tables/test
{"metadata-location":"file:/opt/hive/data/warehouse/test/metadata/00000-f1a3fec1-f0b6-499b-b635-d6a408458390.metadata.json","metadata":{"format-version":2,"table-uuid":"47ca342c-b65b-4e51-a09d-1b470f20298a","location":"file:/opt/hive/data/warehouse/test","last-sequence-number":0,"last-updated-ms":1763188388952,"last-column-id":1,"current-schema-id":0,"schemas":[{"type":"struct","schema-id":0,"fields":[{"id":1,"name":"id","required":true,"type":"long"}]}],"default-spec-id":0,"partition-specs":[{"spec-id":0,"fields":[]}],"last-partition-id":999,"default-sort-order-id":0,"sort-orders":[{"order-id":0,"fields":[]}],"properties":{"write.parquet.compression-codec":"zstd"},"current-snapshot-id":-1,"refs":{},"snapshots":[],"statistics":[],"partition-statistics":[],"snapshot-log":[],"metadata-log":[]}}
```
