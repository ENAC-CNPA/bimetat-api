#!/bin/bash
[ -z "$DBHOST" ] && DBHOST="localhost" || echo "DBHOST: $DBHOST"

rm -rf ./tests-log/*

mongo --host=$DBHOST <<EOF
use sdio
db.users.remove({appId: ObjectId('5de64685e355b01bf41ebd2a')})
db.dynamicconfig.remove({relatedToAppId: ObjectId('5de64685e355b01bf41ebd2a')})
db.three_site.remove({appId: ObjectId('5de64685e355b01bf41ebd2a')})
db.three_object.remove({appId: ObjectId('5de64685e355b01bf41ebd2a')})
db.three_geometry.remove({appId: ObjectId('5de64685e355b01bf41ebd2a')})
db.three_material.remove({appId: ObjectId('5de64685e355b01bf41ebd2a')})
db.three_theme.remove({appId: ObjectId('5de64685e355b01bf41ebd2a')})
db.three_style.remove({appId: ObjectId('5de64685e355b01bf41ebd2a')})
db.dynamicconfig.remove({relatedToAppId: ObjectId('5de64685e355b01bf41ebd2a')})
db.dyn_5de64685e355b01bf41ebd2a.drop()
db.bcf_project.remove({appId: ObjectId('5de64685e355b01bf41ebd2a')})
db.bcf_topic.remove({appId: ObjectId('5de64685e355b01bf41ebd2a')})
db.bcf_comment.remove({appId: ObjectId('5de64685e355b01bf41ebd2a')})
db.bcf_viewpoint.remove({appId: ObjectId('5de64685e355b01bf41ebd2a')})
EOF