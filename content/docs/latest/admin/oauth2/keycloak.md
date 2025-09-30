---
title: "Apache Hive : Setting Up OAuth 2 with Keycloak"
date: 2025-09-30
---

# Apache Hive : Setting Up OAuth 2 with Keycloak

## Keycloak Settings

### 1. Register Hive Metastore as a Resource Server

Browse `Manage -> Clients -> Create client`, and create a client for HMS, as an OAuth 2 resource server. This example uses`hive-metastore` as a client ID. You can access the client secret in the `Credentials` tab.

![](../images/keycloak/resource-server-hive-metastore-1.png)

![](../images/keycloak/resource-server-hive-metastore-2.png)

### 2. Define the "catalog" scope

Iceberg REST Catalog uses "catalog" as the default scope name.

Browse `Manage -> Client scopes -> Create client scope`, and create the scope. The `Name` must be `catalog` and `Include in token scope` must be enabled.

![](../images/keycloak/scope-catalog-1.png)

Then, access the `Mappers` tab, click `Configure a new mapper`, choose `Audience`, and set up a protocol mapper to configure the `aud` claim of access tokens. The value of `Included Client Audience` must be `hive-metastore`.

![](../images/keycloak/scope-catalog-2.png)

### 3. Create Hive Metastore clients

Say that we configure Trino as a REST client.

Browse `Manage -> Clients -> Create client`, and create a client for Trino, as an OAuth 2 client. You must enable `Service accounts roles`.

![](../images/keycloak/client-trino-1.png)

![](../images/keycloak/client-trino-2.png)

Access the `Client scopes` tab, click `Add client scope`, check `catalog`, and add it as an `Optional` scope.

![](../images/keycloak/client-trino-3.png)

Optionally, you can add a custom claim, which is useful to resolve a user name. Let's add `hive-client-username` to the service account so that HMS can use it as a username later. Access `trino-dedicated` in the `Client scopes` tab, proceed with `Configure a new mapper`, choose `Hardcoded claim`, and add a protocol mapper.

![](../images/keycloak/client-trino-4.png)

Access the `Advanced` tab, and enable `Use "at+jwt" as access token header type`. Hive expects an Authorization Server to respect [RFC 9068](https://datatracker.ietf.org/doc/rfc9068/).

![](../images/keycloak/client-trino-5.png)

You can access the client secret in the `Credentials` tab.

## Application Settings

### Hive Metastore

You will add the following parameters in your `metastore-site.conf`.

| Key | Required? | Default | Value |
|-|-|-|-|
| metastore.catalog.servlet.auth | Yes | `jwt` | You have to choose `oauth2` |
| metastore.catalog.servlet.auth.oauth2.issuer | Yes | N/A | `http://{keycloak-host}:{keycloak-port}/realms/{realm name}` |
| metastore.catalog.servlet.auth.oauth2.audience | Yes | N/A | The client ID of HMS. In this example, `hive-metastore` |
| metastore.catalog.servlet.auth.oauth2.validation.method | No | `jwt` | Choose `introspection` if you prefer to use [RFC 7662 - OAuth 2.0 Token Introspection](https://datatracker.ietf.org/doc/html/rfc7662). Token Introspection can be required when you use [lightweight access token](https://www.keycloak.org/docs/latest/server_admin/#_using_lightweight_access_token) |
| metastore.catalog.servlet.auth.oauth2.principal.mapper.regex.username.field | No | `sub` | The claim name which includes a username. In this example, `hive-client-username` |
| metastore.catalog.servlet.auth.oauth2.principal.mapper.regex.username.pattern | No | `(.*)` | The pattern to extract a username from the claim. For example, you can specify `(.*)@example.com` to use the local part of an email address as a username |

You also have to configure the following parameters when you use `metastore.catalog.servlet.auth.oauth2.validation.method=introspection`.

| Key | Required? | Default | Value |
|-|-|-|-|
| metastore.catalog.servlet.auth.oauth2.client.id | Yes | N/A | You must put the client ID of HMS when you use Token Introspection. In this example, `hive-metastore` |
| metastore.catalog.servlet.auth.oauth2.client.secret | Yes | N/A | You must put the client secret of HMS when you use Token Introspection |
| metastore.catalog.servlet.auth.oauth2.introspection.cache.expiry | No | 60s | The expiry time of the Token Introspection cache. `0` if you want to disable the cache |
| metastore.catalog.servlet.auth.oauth2.introspection.cache.num | No | 1000 | The number of entries for the Token Introspection cache |

### Trino

You will configure the following parameters for [the REST catalog](https://trino.io/docs/current/object-storage/metastores.html#iceberg-rest-catalog).

| Key | Value |
|-|-|
| connector.name | `iceberg` |
| iceberg.catalog.type | `rest` |
| iceberg.rest-catalog.uri | `http://{hms-host}:{hms-rest-port}/iceberg` |
| iceberg.rest-catalog.security | `OAUTH2` |
| iceberg.rest-catalog.oauth2.server-uri | `http://{keycloak-host}:{keycloak-port}/realms/{realm name}/protocol/openid-connect/token` |
| iceberg.rest-catalog.oauth2.credential | `{client-id-of-trino}:{client-secret-of-trino}`. In this example, `trino:{Client ID in the Credential tab}` |
