#!/bin/bash

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

docker build --rm -t sdp-e2e -f $SCRIPTPATH/e2e.Dockerfile .
