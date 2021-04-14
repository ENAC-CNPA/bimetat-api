#!/bin/bash

# OUTPUT can be "pretty" or "json"
OUTPUT="json"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

runDbScript() {
  DB=$(sh "$DIR/$1")
  DATA="$DB" TYPE="DB" NAME="$2" node "$DIR/../report.js"
}

runTest() {
  OVERRIDES="{\"config\": {\"plugins\": {\"expect\": {\"outputFormat\": \"$OUTPUT\"}}}}" 
  VAL=$(artillery run -q --overrides "$OVERRIDES" "$DIR/$1")
  DATA="$VAL" TYPE="TEST" NAME="$2" node "$DIR/../report.js"
}

runDbScript "clear-test.sh" "Clear Apps Tests"
runDbScript "init-test.sh" "Init Apps Tests"

runTest "create-account-a1.yml" "Create Account A1"
runTest "create-app.yml" "Create App"
runTest "create-account-b1.yml" "Create Account B1"
runTest "create-account-b2.yml" "Create Account B2"
runTest "create-account-b3.yml" "Create Account B3"
runTest "forgot-password-b3.yml" "Forgot Password B3"
runTest "change-email-mobile-password-b3.yml" "Change email, mobile and password"
runTest "login-capital-space.yml" "Login Capital Spaces"
