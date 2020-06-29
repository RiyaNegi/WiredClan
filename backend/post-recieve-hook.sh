#!/bin/bash

# Location of our bare repository.
GIT_DIR="/root/jimmy"

# Where we want to copy our code.
TARGET="/root/jimmy-master"

while read oldrev newrev ref
do

    # Neat trick to get the branch name of the reference just pushed:
    BRANCH=$(git rev-parse --symbolic --abbrev-ref $ref)

    if [[ $BRANCH == "master" ]];
    then
        # Send a nice message to the machine pushing to this remote repository.
        echo "Push received! Deploying branch: ${BRANCH}..."

        # "Deploy" the branch we just pushed to a specific directory.
        git --work-tree=$TARGET --git-dir=$GIT_DIR checkout -f $BRANCH

        # Navigate to where my master code lives. 
        cd /root/jimmy-master/backend
        echo "Running deploy.sh..."
        chmod 755 deploy.sh
        ./deploy.sh
    else 
        echo "Not master branch. Skipping."
    fi
done
