#!/bin/bash
[ -z "$DBHOST" ] && DBHOST="localhost" || echo "DBHOST: $DBHOST"

rm -rf ./tests-log/*

mongo --host=$DBHOST <<EOF
use sdio
db.apps.remove({_id: ObjectId('5e4ae9df63ecd889ff12986e')})
db.apps.remove({appId: ObjectId('5e4ae9df63ecd889ff12986e')})
db.users.remove({appId: ObjectId('5e4ae9df63ecd889ff12986e')})
db.dynamicconfig.remove({appId: ObjectId('5e4ae9df63ecd889ff12986e')})

EOF