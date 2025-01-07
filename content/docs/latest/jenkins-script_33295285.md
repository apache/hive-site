---

title: "Apache Hive : Jenkins Script"
date: 2024-12-12
----------------

# Apache Hive : Jenkins Script

I am a little worried about jenkins losing this script every once in a while I'll paste it here:

```
env
set -e
set -x
. ${HOME}/toolchain/toolchain.sh
export PATH=$JAVA\_HOME/bin:$MAVEN\_HOME/bin:$PATH
ROOT=$PWD
BRANCH=trunk
export JIRA\_NAME="HIVE-${ISSUE\_NUM}"
echo $JIRA\_NAME
export JIRA\_ROOT\_URL="https://issues.apache.org"
test -d hive/build/ || mkdir -p hive/build/
cd hive/build/
rm -rf ptest2
svn co http://svn.apache.org/repos/asf/hive/trunk/testutils/ptest2/ ptest2
cd ptest2
# process the jira
JIRA\_TEXT=$(mktemp)
trap "rm -f $JIRA\_TEXT" EXIT
curl -s -S --location --retry 3 "${JIRA\_ROOT\_URL}/jira/browse/${JIRA\_NAME}" > $JIRA\_TEXT
if grep -q "NO PRECOMMIT TESTS" $JIRA\_TEXT
then
  echo "Test $JIRA\_NAME has tag NO PRECOMMIT TESTS"
  exit 0
fi
# ensure the patch is actually in the correct state
if ! grep -q 'Patch Available' $JIRA\_TEXT
then
  echo "$JIRA\_NAME is not \"Patch Available\". Exiting."
  exit 1
fi
# pull attachments from JIRA (hack stolen from hadoop since rest api doesn't show attachments)
PATCH\_URL=$(grep -o '"/jira/secure/attachment/[0-9]*/[^"]*' $JIRA\_TEXT | \
  grep -v -e 'htm[l]*$' | sort | tail -1 | \
  grep -o '/jira/secure/attachment/[0-9]*/[^"]*')
if [[ -z "$PATCH\_URL" ]]
then
  echo "Unable to find attachment for $JIRA\_NAME"
  exit 1
fi
# ensure attachment has not already been tested
ATTACHMENT\_ID=$(basename $(dirname $PATCH\_URL))
if grep -q "ATTACHMENT ID: $ATTACHMENT\_ID" $JIRA\_TEXT
then
  echo "Attachment $ATTACHMENT\_ID is already tested for $JIRA\_NAME"
  exit 1
fi
# validate the patch name, parse branch if needed
shopt -s nocasematch
PATCH\_NAME=$(basename $PATCH\_URL)
# Test examples:
# HIVE-123.patch HIVE-123.1.patch HIVE-123.D123.patch HIVE-123.D123.1.patch HIVE-123-tez.patch HIVE-123.1-tez.patch
# HIVE-XXXX.patch, HIVE-XXXX.XX.patch  HIVE-XXXX.XX-branch.patch HIVE-XXXX-branch.patch
if [[ $PATCH\_NAME =~ ^HIVE-[0-9]+(\.[0-9]+)?(-[a-z0-9-]+)?\.(patch|patch.\txt)$ ]]
then
  if [[ -n "${BASH\_REMATCH[2]}" ]]
  then
    BRANCH=${BASH\_REMATCH[2]#*-}
  else
    echo "Assuming branch $BRANCH"
  fi
# HIVE-XXXX.DXXXX.patch or HIVE-XXXX.DXXXX.XX.patch
elif [[ $PATCH\_NAME =~ ^(HIVE-[0-9]+\.)?D[0-9]+(\.[0-9]+)?\.(patch|patch.\txt)$ ]]
then
  echo "Assuming branch $BRANCH"
else
  echo "Patch $PATCH\_NAME does not appear to be a patch"
  exit 1
fi
shopt -u nocasematch
# append mr1 if needed
if [[ $BRANCH =~ (mr1|mr2)$ ]]
then
  profile=$BRANCH
else
  profile=${BRANCH}-mr1
fi
# sanity check the profile
case "$profile" in
  trunk-mr1);;
  trunk-mr2);;
  maven-mr1);;
  *)
  echo "Unknown profile '$profile'"
  exit 1
esac
TEST\_OPTS=""
if grep -q "CLEAR LIBRARY CACHE" $JIRA\_TEXT
then
  echo "Clearing library cache before starting test"
  TEST\_OPTS="--clearLibraryCache"
fi
mvn clean package -DskipTests -Drat.numUnapprovedLicenses=1000 -Dmaven.repo.local=$WORKSPACE/.m2
set +e
java -cp "target/hive-ptest-1.0-classes.jar:target/lib/*" org.apache.hive.ptest.api.client.PTestClient --endpoint http://ec2-174-129-184-35.compute-1.amazonaws.com --command testStart --profile $profile --password xxx --outputDir target/ --testHandle "${BUILD\_TAG##jenkins-}" --patch "${JIRA\_ROOT\_URL}${PATCH\_URL}" --jira "$JIRA\_NAME" --clearLibraryCache
ret=$?
cd target/
if [[ -f test-results.tar.gz ]]
then
  rm -rf $ROOT/hive/build/test-results/
  tar zxf test-results.tar.gz -C $ROOT/hive/build/
fi
exit $ret

```

