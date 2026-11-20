#!/usr/bin/env bash
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to you under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Verify that Maven Central has the same org.apache.hive artifacts for a new
# release as for the previous release in the line (maintenance release check).
#
# Usage:
#   ./verify-maven-central-release.sh <previous-version> <new-version> [repo-base-url]
#
# Examples:
#   # After closing a Nexus staging repo (before Release to Central):
#   ./verify-maven-central-release.sh 4.2.0 4.2.1 \
#     https://repository.apache.org/content/repositories/orgapachehive-121/
#
#   # After artifacts have synced to Maven Central:
#   ./verify-maven-central-release.sh 4.2.0 4.2.1
#
# PREVIOUS is always checked on Maven Central. NEW is checked on repo-base-url
# (defaults to Maven Central). New modules that appear only in NEW are not
# validated yet; only artifacts present for PREVIOUS are required for NEW.
#
# Exit code 0 if every required artifact exists for NEW.
# Exit code 1 if any are missing.

set -euo pipefail

PREV="${1:?Previous GA version (e.g. 4.2.0)}"
NEW="${2:?New release version (e.g. 4.2.1)}"
NEW_REPO_BASE="${3:-https://repo1.maven.org/maven2}"

CENTRAL="https://repo1.maven.org/maven2"
GROUP="org/apache/hive"

# Trim trailing slash for consistent URL joining.
NEW_REPO_BASE="${NEW_REPO_BASE%/}"

echo "Checking org.apache.hive artifacts: ${PREV} (Maven Central) -> ${NEW} (${NEW_REPO_BASE})"
echo

artifact_ids="$(python3 - "$PREV" << 'PY'
import json
import sys
import urllib.request

prev = sys.argv[1]
arts = set()
start = 0
while True:
    url = (
        "https://search.maven.org/solrsearch/select"
        f"?q=g:org.apache.hive+AND+v:{prev}&rows=200&start={start}&wt=json"
    )
    with urllib.request.urlopen(url, timeout=60) as resp:
        data = json.load(resp)
    docs = data["response"]["docs"]
    for doc in docs:
        arts.add(doc["a"])
    start += len(docs)
    total = data["response"]["numFound"]
    if not docs or start >= total:
        break

if not arts:
    sys.stderr.write(
        f"warning: Maven Search returned no artifacts for {prev}; "
        "using built-in critical module list\n"
    )
    arts = {
        "hive-accumulo-handler",
        "hive-beeline",
        "hive-cli",
        "hive-contrib",
        "hive-druid-handler",
        "hive-hbase-handler",
        "hive-hplsql",
        "hive-iceberg-catalog",
        "hive-iceberg-handler",
        "hive-iceberg-shading",
        "hive-jdbc",
        "hive-jdbc-handler",
        "hive-kudu-handler",
        "hive-llap-ext-client",
        "hive-llap-server",
        "hive-service",
        "hive-standalone-metastore-rest-catalog",
        "hive-streaming",
        "hive-testutils",
        "kafka-handler",
        "patched-iceberg-api",
        "patched-iceberg-core",
        "hive-metastore-benchmarks",
    }

for a in sorted(arts):
    print(a)
PY
)"

artifact_present() {
  local repo_base="$1"
  local artifact="$2"
  local version="$3"
  local jar_url="${repo_base}/${GROUP}/${artifact}/${version}/${artifact}-${version}.jar"
  local pom_url="${repo_base}/${GROUP}/${artifact}/${version}/${artifact}-${version}.pom"
  local jar_code pom_code
  jar_code="$(curl -s -o /dev/null -w '%{http_code}' "$jar_url")"
  if [[ "$jar_code" == "200" ]]; then
    echo "jar"
    return 0
  fi
  pom_code="$(curl -s -o /dev/null -w '%{http_code}' "$pom_url")"
  if [[ "$pom_code" == "200" ]]; then
    echo "pom"
    return 0
  fi
  echo "missing"
  return 1
}

missing=()
present=0
total=0

while IFS= read -r artifact; do
  [[ -z "$artifact" ]] && continue
  total=$((total + 1))
  prev_kind="$(artifact_present "$CENTRAL" "$artifact" "$PREV" || true)"
  if [[ "$prev_kind" == "missing" ]]; then
    printf "  SKIP %s (not on Central for %s)\n" "$artifact" "$PREV"
    total=$((total - 1))
    continue
  fi
  # Downstream builds resolve JARs; POM-only aggregator modules are optional for this check.
  if [[ "$prev_kind" == "pom" ]]; then
    printf "  SKIP %s (POM-only in %s; not required for handler-style builds)\n" "$artifact" "$PREV"
    total=$((total - 1))
    continue
  fi
  new_kind="$(artifact_present "$NEW_REPO_BASE" "$artifact" "$NEW" || true)"
  if [[ "$new_kind" != "missing" ]]; then
    present=$((present + 1))
    printf "  OK   %s (%s -> %s)\n" "$artifact" "$prev_kind" "$new_kind"
  else
    missing+=("$artifact")
    printf "  MISS %s (had %s in %s, missing in %s)\n" "$artifact" "$prev_kind" "$PREV" "$NEW"
  fi
done <<< "$artifact_ids"

echo
echo "Summary: ${present}/${total} artifacts from ${PREV} are present for ${NEW}"

if ((${#missing[@]} > 0)); then
  echo
  echo "Missing artifacts:"
  for a in "${missing[@]}"; do
    echo "  - ${a}"
  done
  echo
  if [[ "$NEW_REPO_BASE" != "$CENTRAL" ]]; then
    echo "Fix missing artifacts in the staging repository before clicking Release in Nexus."
  else
    echo "If you just released from Nexus, allow time for sync to Maven Central."
  fi
  exit 1
fi

echo "All checked artifacts are published."
exit 0
