#!/bin/bash

DEPLOY_PATH="../deploy/streams"

rm -rf $DEPLOY_PATH/public 
rm -rf $DEPLOY_PATH/src
rm -f $DEPLOY_PATH/.gitignore $DEPLOY_PATH/package.json $DEPLOY_PATH/README.md $DEPLOY_PATH/yarn.lock

cp -r ./public $DEPLOY_PATH
cp -r ./src $DEPLOY_PATH
cp -r ./package.json $DEPLOY_PATH
cp -r ./README.md $DEPLOY_PATH
cp -r ./yarn.lock $DEPLOY_PATH

git add .
git commit -m "deploy"
git push heroku master
