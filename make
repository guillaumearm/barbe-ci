#!/bin/bash

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
IMAGE_NAME="barbe-ci"

docker build --rm=true --force-rm=true -t $IMAGE_NAME $SCRIPTPATH
