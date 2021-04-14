#!/bin/bash
[ -z "$DBHOST" ] && DBHOST="localhost" || echo "DBHOST: $DBHOST"

rm -rf ./tests-log/*

mongo --host=$DBHOST <<EOF
use sdio
db.apps.insert({
  "_id": ObjectId("5e4ae9df63ecd889ff12986e"),
  "name" : "Test Application", 
  "publicKeys" : [ { "key" : "pub-test-key", "name" : "API Public Key", "active" : true } ], 
  "privateKeys" : [ { "key" : "pri-test-key", "name" : "API Private Key", "active" : true } ], 
  "_updatedAt" : ISODate("2018-07-23T14:02:26.314Z"), 
  "_createdAt" : ISODate("2018-07-23T14:02:26.314Z"), 
  "requireDoubleAuth" : false, 
  "doubleAuthMethod" : "auto",
  "openUserRegistration": true,
  "createAccountValidation" : "emailOrMobile",
  "smtpConfigHost": "localhost",
  "smtpConfigPort": 1025,
  "smtpConfigUser": "notif@localhost",
  "smtpConfigPassword": "newpasstodef",
  "smtpConfigFromName": "BIMetat",
  "smtpConfigFromEmail": "notif@localhost"
});
EOF