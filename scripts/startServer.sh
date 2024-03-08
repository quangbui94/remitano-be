#!bin/bash

echo 'Start server'

set -e

sudo apt update
sudo apt -y install docker-compose
sudo chmod 666 /var/run/docker.sock

rm -rf /home/ubuntu/youtube-be

git clone -b master git@gitlab.com:buiphuquang2412/youtube-be.git

cd /home/ubuntu/youtube-be

docker-compose up -d