#!/bin/bash
[ -z "$DBHOST" ] && DBHOST="localhost" || echo "DBHOST: $DBHOST"

mongo --host=$DBHOST <<EOF
use sdio
db.test_decorators.drop()

EOF