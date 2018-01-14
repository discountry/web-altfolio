#!/bin/sh

cd ~/project
cp -r build/ ../build
git config --global user.email "$GH_EMAIL" > /dev/null 2>&1
git config --global user.name "$GH_NAME" > /dev/null 2>&1
git checkout gh-pages
rm -rf *
cp -r ../build/* ./
git add -A
git commit -m "update app at $(date)"
git push -u origin gh-pages
rm -rf ../build

echo "Finished Deployment!"