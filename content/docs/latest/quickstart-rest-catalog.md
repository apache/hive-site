---
title: "Hive 4.2.0 - REST Catalog Integration"
date: 2025-10-31
draft: false
---

# REST Catalog Integration

## Table of Contents
- [Hive + Gravitino + Keycloak](#hive--gravitino--keycloak)
  - [Architecture Overview](#architecture-overview)
  - [Prerequisites](#prerequisites)
  - [Quickstart](#quickstart)
  - [Configuration](#configuration)
    - [Keyclock](#keycloak)
    - [Gravitino](#gravitino)
    - [Hive](#hive)
  - [Networking Notes](#networking-notes)
- [Hive + Polaris](#hive--polaris)
  - [Architecture Overview](#architecture-overview-1)
  - [Prerequisites](#prerequisites-1)
  - [Quickstart](#quickstart-1)
  - [Configuration](#configuration-1)
      - [Polaris](#polaris)
      - [Hive](#hive-1)
  - [Networking Notes](#networking-notes-1)

## Hive + Gravitino + Keycloak

- The code for this setup is located in the Hive repository in `packaging/src/docker/thirdparties/gravitino` folder.
- It contains a docker-compose-based setup integrating Apache Hive, Gravitino Iceberg REST server, and Keycloak for OAuth2 authentication. It allows Hive to use an Iceberg REST catalog secured via Keycloak.

### Architecture Overview
This diagram illustrates the key docker-compose components and their interactions in this setup:

```
                                  oAuth2 (REST API)
         +-------------------------------------------------------------------+
         |                                                                   |
         |                                                                   v
+--------+----------+               +-------------------+            +-----------------+
|                   |  RESTCatalog  |                   |   oauth2   |                 |
|     Hive          |   (REST API)  |      Gravitino    | (REST API) |    Keycloak     |
|  (HiveServer2)    +-------------->|    Iceberg REST   +----------->|  OAuth2 Auth    |
|                   |               |       Server      |            |     Server      |
+--------+----------+               +---------+---------+            +-----------------+
         |                                    |                    
  data   |          metadata files            |                    
  files  +------------------------------------+                    
         |                                                 
         v                                                 
+-------------------+               +-------------------+     
|                   |  creates dir  |                   |     
|     /warehouse    |<--------------+       init        |
|  (Docker volume)  |     sets      |     container     |
|                   |  permissions  |                   |
+-------------------+               +-------------------+
```

- Hive:
    - Runs HiveServer2, connects to Gravitino via Iceberg REST catalog.
    - Write Iceberg data files to the shared warehouse volume.
- Gravitino:
    - Exposes REST API for Iceberg catalog.
    - Writes Iceberg metadata files to shared warehouse volume (.metadata.json).
    - Doesn't supports serving as oauth2 provider, so this example uses an external OAuth2 provider (Keyclock).
- Keycloak:
    - OAuth2 server providing authentication and token issuance for Hive/Gravitino.
- /warehouse:
    - Shared Docker volume for Iceberg table data and metadata.
- Init container:
    - Creates shared /warehouse folder and sets filesystem permissions as a one time initialization step.

### Prerequisites
- Hive version 4.2.0+
- Docker & Docker Compose
- Java (for local Hive beeline client)
- ```$HIVE_HOME``` environment variable pointing to Hive installation (for connecting to Beeline)

### Quickstart

#### STEP 1: Export the Hive version
```shell
export HIVE_VERSION=4.2.0
```

#### STEP 2: Start services
```shell
docker-compose up -d
```

#### STEP 3: Connect to beeline
```shell
"${HIVE_HOME}/bin/beeline" -u "jdbc:hive2://localhost:10001/default" -n hive -p hive
```

#### STEP 4: Stop services:
```shell
docker-compose down -v
```

### Configuration

#### Keycloak

- Realm: hive
- Client: iceberg-client
    - Secret: iceberg-client-secret
    - Protocol: OpenID Connect
    - Audience: hive-iceberg
- Imported via `realm-export.json` in Keycloak container.
- Port: 8080

#### Gravitino

- HTTP port: 9001
- Catalog backend: JDBC H2 (/tmp/gravitino_h2_db)
- Warehouse: /warehouse (shared with Hive)
- Iceberg REST Catalog Backend config:
    ```
    # Backend type for the catalog. Here we use JDBC (H2 database) as the metadata store.
    gravitino.iceberg-rest.catalog-backend = jdbc
    
    # JDBC connection URI for the H2 database storing catalog metadata.
    gravitino.iceberg-rest.uri = jdbc:h2:file:/tmp/gravitino_h2_db;AUTO_SERVER=TRUE
    
    # JDBC driver class used to connect to the metadata database.
    gravitino.iceberg-rest.jdbc-driver = org.h2.Driver
    
    # Database username for connecting to the metadata store.
    gravitino.iceberg-rest.jdbc-user = sa
    
    # Database password for connecting to the metadata store (empty here).
    gravitino.iceberg-rest.jdbc-password = ""
    
    # Whether to initialize the catalog schema on startup.
    gravitino.iceberg-rest.jdbc-initialize = true
    
    # --- Warehouse Location (shared folder) ---
    
    # Path to the Iceberg warehouse directory shared with Hive.
    gravitino.iceberg-rest.warehouse = file:///warehouse
    ```
- OAuth2 config pointing to Keycloak:
    ```
    # Enables OAuth2 as the authentication mechanism for Gravitino.
    gravitino.authenticators = oauth
    
    # URL of the Keycloak realm to request tokens from.
    gravitino.authenticator.oauth.serverUri = http://keycloak:8080/realms/hive
    
    # Path to the OAuth2 token endpoint on Keycloak.
    gravitino.authenticator.oauth.tokenPath = /protocol/openid-connect/token
    
    # OAuth2 scopes requested when obtaining a token. Includes "openid" and the custom "catalog" scope.
    gravitino.authenticator.oauth.scope = openid catalog
    
    # OAuth2 client ID registered in Keycloak.
    gravitino.authenticator.oauth.clientId = iceberg-client
    
    # OAuth2 client secret associated with the client ID.
    gravitino.authenticator.oauth.clientSecret = iceberg-client-secret
    
    # Java class used to validate incoming JWT tokens using the JWKS endpoint.
    gravitino.authenticator.oauth.tokenValidatorClass = org.apache.gravitino.server.authentication.JwksTokenValidator
    
    # URL to fetch JSON Web Key Set (JWKS) for verifying token signatures.
    gravitino.authenticator.oauth.jwksUri = http://keycloak:8080/realms/hive/protocol/openid-connect/certs
    
    # Identifier for the OAuth2 provider configuration in Gravitino.
    gravitino.authenticator.oauth.provider = default
    
    # JWT claim field(s) to extract as the principal/username (here, 'sub' claim).
    gravitino.authenticator.oauth.principalFields = sub
    
    # Acceptable clock skew (in seconds) when validating token expiration times.
    gravitino.authenticator.oauth.allowSkewSecs = 60
    
    # Expected audience claim in the token to ensure it is intended for this service.
    gravitino.authenticator.oauth.serviceAudience = hive-iceberg
    ```

#### Hive

- Uses ```HiveRESTCatalogClient``` for connecting to Iceberg REST catalog (Gravitino).
- Catalog configuration in ```hive-site.xml```:
    ```
    <property>
      <name>metastore.catalog.default</name>
      <value>ice01</value>
      <description>Sets the default Iceberg catalog for Hive. Here, "ice01" is used.</description>
    </property>
    
    <property>
      <name>metastore.client.impl</name>
      <value>org.apache.iceberg.hive.client.HiveRESTCatalogClient</value>
      <description>Specifies the client implementation to use for accessing Iceberg via REST.</description>
    </property>
    
    <property>
      <name>iceberg.catalog.ice01.uri</name>
      <value>http://gravitino:9001/iceberg</value>
      <description>URI of the Iceberg REST server (Gravitino). Hive will send catalog requests here.</description>
    </property>
    
    <property>
      <name>iceberg.catalog.ice01.type</name>
      <value>rest</value>
      <description>Defines the catalog type as "rest", indicating it uses a REST API backend.</description>
    </property>
    
    <!-- Iceberg REST Catalog: OAuth2 authentication -->
    
    <property>
      <name>iceberg.catalog.ice01.rest.auth.type</name>
      <value>oauth2</value>
      <description>Configures Hive to use OAuth2 for authenticating requests to the REST catalog.</description>
    </property>
    
    <property>
      <name>iceberg.catalog.ice01.oauth2-server-uri</name>
      <value>http://keycloak:8080/realms/hive/protocol/openid-connect/token</value>
      <description>URL of the Keycloak OAuth2 token endpoint used to request access tokens.</description>
    </property>
    
    <property>
      <name>iceberg.catalog.ice01.credential</name>
      <value>iceberg-client:iceberg-client-secret</value>
      <description>Client credentials (ID and secret) used to authenticate with Keycloak.</description>
    </property>
    ```
- HiveServer2 port: 10000 (mapped to 10001 in Docker Compose)

### Networking Notes

- All containers share a custom bridge network ```hive-net```.
- Services communicate via container names: hive, gravitino, keycloak.
- Ports mapped for host access:
    - Keycloak → 8080
    - Gravitino → 9001
    - HiveServer2 → 10001

## Hive + Polaris

- The code for this setup is located in the Hive repository in `packaging/src/docker/thirdparties/polaris` folder.
- It contains contains a docker-compose-based setup integrating Apache Hive and Polaris.
- It allows Hive to use an Iceberg REST catalog secured with oAuth2 provided by Polaris.

### Architecture Overview
This diagram illustrates the key docker-compose components and their interactions in this setup:
```
+-------------------+               +-------------------+
|                   |  RESTCatalog  |                   |
|     Hive          |   (REST API)  |      Polaris      |<-------+
|  (HiveServer2)    +-------------->|      Server       |        |
|                   |    oAuth2     |                   |        |  
+--------+----------+  (REST API)   +---------+---------+        | creates:
         |                                    |                  |     catalog,
  data   |           metadata files           |                  |     principal,
  files  +------------------------------------+                  |     roles,
         |                                                       |     grants (REST API)
         v                                                       |
+-------------------+               +-------------------+        |
|                   |  creates dir  |                   |        |
|     /warehouse    |<--------------+    Polaris-init   +--------+
|  (Docker volume)  |     syncs     |      container    |
|                   |  permissions  |                   |
+-------------------+               +-------------------+
```

- Hive:
    - Runs HiveServer2, connects to Polaris via Iceberg REST catalog.
    - Write Iceberg data files to shared warehouse volume.
- Polaris:
    - Exposes REST API for Iceberg catalog and provides oauth2 for authentication.
    - Supports serving as oauth2 provider, so this example doesn't need an external OAuth2 component.
    - Writes Iceberg metadata files to shared warehouse volume (.metadata.json).
- /warehouse:
    - Shared Docker volume for Iceberg table data and metadata.
- Polaris-init
    - Bootstraps Polaris for Hive-Iceberg.
    - Creates and configures Polaris resources via REST API.
    - Continuously synchronizes filesystem permissions for the shared /warehouse/* folders.
        - required because Polaris and Hive run as different users in their respective containers.

### Prerequisites
- Hive version 4.2.0+
- Docker & Docker Compose
- Java (for local Hive beeline client)
- ```$HIVE_HOME``` environment variable pointing to Hive installation (for connecting to Beeline)

### Quickstart

#### STEP 1: Export the Hive version
```shell
export HIVE_VERSION=4.2.0
```

#### STEP 2: Start services
```shell
docker-compose up -d
```

#### STEP 3: Connect to beeline
```shell
"${HIVE_HOME}/bin/beeline" -u "jdbc:hive2://localhost:10001/default" -n hive -p hive
```

#### STEP 4: Stop services:
```shell
docker-compose down -v
```

### Configuration

#### Polaris

- HTTP port: 8181
- Warehouse: /warehouse (shared with Hive)
- Key Polaris configs (defined via env variables in docker-compose.yml) :
     ```
      # A realm provides logical isolation for different Polaris environments.
      polaris.realm-context.realms: POLARIS
  
      # Initial bootstrap credentials for the Polaris server.
      # The format is: <realm-name>,<client-id>,<client-secret>
      POLARIS_BOOTSTRAP_CREDENTIALS: POLARIS,iceberg-client,iceberg-client-secret`
    ```

#### Hive

- Uses ```HiveRESTCatalogClient``` for connecting to Iceberg REST catalog (Polaris).
- Catalog configuration in ```hive-site.xml```:
    ```
    <property>
      <name>metastore.catalog.default</name>
      <value>ice01</value>
      <description>Sets the default Iceberg catalog for Hive. Here, "ice01" is used.</description>
    </property>
    
    <property>
      <name>metastore.client.impl</name>
      <value>org.apache.iceberg.hive.client.HiveRESTCatalogClient</value>
      <description>Specifies the client implementation to use for accessing Iceberg via REST.</description>
    </property>
    
    <property>
      <name>iceberg.catalog.ice01.uri</name>
      <value>http://polaris:8181/api/catalog</value>
      <description>URI of the Iceberg REST server (Polaris). Hive will send catalog requests here.</description>
    </property>
    
    <property>
      <name>iceberg.catalog.ice01.type</name>
      <value>rest</value>
      <description>Defines the catalog type as "rest", indicating it uses a REST API backend.</description>
    </property>
  
    <property>
      <name>hive.metastore.warehouse.dir</name>
      <value>file:///warehouse</value>
      <description>Defines the warehouse location, required for Polaris</description>
    </property>
    
    <!-- Iceberg REST Catalog: OAuth2 authentication -->
    
    <property>
      <name>iceberg.catalog.ice01.rest.auth.type</name>
      <value>oauth2</value>
      <description>Configures Hive to use OAuth2 for authenticating requests to the REST catalog.</description>
    </property>
    
    <property>
      <name>iceberg.catalog.ice01.oauth2-server-uri</name>
      <value>http://polaris:8181/api/catalog/v1/oauth/tokens</value>
      <description>URL of the Polaris OAuth2 token endpoint used to request access tokens.</description>
    </property>
    
    <property>
      <name>iceberg.catalog.ice01.credential</name>
      <value>iceberg-client:iceberg-client-secret</value>
      <description>Client credentials (ID and secret) used to authenticate with Keycloak.</description>
    </property>
  
    <property>
      <name>iceberg.catalog.ice01.scope</name>
      <value>PRINCIPAL_ROLE:ALL</value>
      <description>oAuth2 scope tied to the principal role defined in Polaris</description>
    </property>
    ```
- HiveServer2 port: 10000 (mapped to 10001 in Docker Compose)

### Networking Notes

- All containers share a custom bridge network ```hive-net```.
- Services communicate via container names: hive and polaris
- Ports mapped for host access:
    - Polaris → 8181
    - HiveServer2 → 10001
