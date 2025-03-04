# Capture Lineage Information In Hive Hooks

## Background

In Hive, lineage information is captured in the form of `LineageInfo` object. This object is created in the `SemanticAnalyzer` and is passed to the `HookContext` object. Users can use the following existing Hooks or implement their own custom hooks to capture this information and utilize it.

##### Existing Hooks

- org.apache.hadoop.hive.ql.hooks.PostExecutePrinter
- org.apache.hadoop.hive.ql.hooks.LineageLogger
- org.apache.atlas.hive.hook.HiveHook

To facilitate the capture of lineage information in a custom hook or in a use case where the [existing hooks]({{< ref "#existing-hooks" >}}) are not set in `hive.exec.post.hooks`, a new configuration `hive.lineage.hook.info.enabled` was introduced in [HIVE-24051](https://issues.apache.org/jira/browse/HIVE-24051). This configuration is set to `false` by default.

To provide filtering capability on query type in the lineage information, a new configuration `hive.lineage.hook.info.query.type` was introduced in [HIVE-28409](https://issues.apache.org/jira/browse/HIVE-28409), with default value as "_ALL_". Users can tune the configuration accordingly to capture lineage information only for the required query types. In [HIVE-28409](https://issues.apache.org/jira/browse/HIVE-28409), the previously introduced configuration `hive.lineage.hook.info.enabled` was marked as deprecated.

**NOTE: HIVE-28409, will be available in Hive-4.1.0 release.**

Usage example:

````
hive.lineage.hook.info.query.type=ALL                                -- will capture lineage info for all the queries.
hive.lineage.hook.info.query.type=CREATE_VIEW,CREATE_TABLE_AS_SELECT -- will capture lineage info related to these 2 particulare query types only.
hive.lineage.hook.info.query.type=NONE                               -- will not capture lineage info for any query.
````

Previously, to capture lineage information, users has 2 ways:
1. Set any of the above mentioned [existing hooks]({{< ref "#existing-hooks" >}}) in `hive.exec.post.hooks` configuration.
2. Set `hive.lineage.hook.info.enabled` as true in cluster and restart HiveServer2 service. (Valid since Hive-4.0.0 release).

**NOTE**: Just by enabling `hive.lineage.hook.info.enabled`, lineage information for "Create View" query type won't be captured, user has to set the [existing hooks]({{< ref "#existing-hooks" >}}) in `hive.exec.post.hooks` along with their custom hook class name.

## Changes done in [HIVE-28768](https://issues.apache.org/jira/browse/HIVE-28768)

The hardcoded values of the [existing hooks]({{< ref "#existing-hooks" >}}) that capture lineage information in `SemanticAnalyzer` and `Optimizer` code has been removed and to determine, whether lineage information should be captured or not, the value of `hive.lineage.hook.info.query.type` configuration is checked. **The default value of `hive.lineage.hook.info.query.type` has been set to "_NONE_".**

## Implications of [HIVE-28768](https://issues.apache.org/jira/browse/HIVE-28768) on users

1. Users migrating directly from Hive-3.x to HIVE-4.1.0 **will observe breaking changes** in the way lineage information is captured. Setting `hive.exec.post.hooks` to any of the [existing hooks]({{< ref "#existing-hooks" >}}) will not capture lineage information anymore. Users will have to make use of `hive.lineage.hook.info.query.type` configuration to capture lineage information.
2. Users migrating from Hive-4.0.x to Hive-4.1.0 who don't have `hive.lineage.hook.info.enabled` set to true, **will also observe breaking changes** in the way lineage information is captured.

***
**NOTE: Recommended way to capture lineage information is though `hive.lineage.hook.info.query.type` configuration as  `hive.lineage.hook.info.enabled` is marked as deprecated and is subjected to be removed in future release**
***
