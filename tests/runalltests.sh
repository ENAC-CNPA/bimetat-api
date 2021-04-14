#!/bin/bash
( bash "apps/runtests.sh" )
( bash "decorators/runtests.sh" )
( bash "dynamicdata/runtests.sh" )
( bash "policies/runtests.sh" )
( bash "three-bcf/runtests.sh" )
( bash "three-checkers/runtests.sh" )