#!/bin/bash
server=$(ls | grep serverBuild)
client=$(ls | grep clientbuild)

if [ "$server" != 'serverBuild' ] || [ "$client" != 'clientbuild' ]; then
    echo Wrong initial directory! Go to project root and run me again. 
    exit
fi
echo $0
#build and run the server image
cd serverBuild/ && sudo docker image build -t roccopetruzzi/pulsebs:latest_server .
# docker run -d -p 80:80 --name server server
#build and run the mailer image
cd server/mailer/ && sudo docker image build -t roccopetruzzi/pulsebs:latest_mailer .
# sudo docker run -d --name mailer mailer
#build and run the client image
cd ../../../clientBuild/ && sudo docker image build -t roccopetruzzi/pulsebs:latest_client .
# sudo docker run -itd -p 3000:3000 --name client client

echo Do you want to run the PULSeBS as a Docker App now?S/N
read dockerContainer
if [ "$dockerContainer" == "S" ]; then 
    cd ../ && docker-compose up
else
    echo Build completed successfully!
    echo To start the App, run: docker-compose up 
fi