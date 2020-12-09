#!/bin/bash
#define variables
project_path=$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )
executable=$(basename $0)
docker_compose_file="docker-compose.yml"
server_tag="roccopetruzzi/pulsebs:latest_server"
mailer_tag="roccopetruzzi/pulsebs:latest_mailer"
client_tag="roccopetruzzi/pulsebs:latest_client"
ready=0

#Try using local files, if present
serverFolderPresent=$(find $project_path -type d -maxdepth 1 -name serverBuild | wc -l | tr -d " ")
clientFolderPresent=$(find $project_path -type d -maxdepth 1 -name clientbuild | wc -l | tr -d " ")
if [ $serverFolderPresent -eq 1 ] && [ $clientFolderPresent -eq 1 ]; then
    echo "Do you want to build the Docker Images using local files (the resulting App might be unstable)?Y/N"
    read answer
    if [ "$answer" == "Y" ] || [ "$answer" == "y" ]; then 
        #build latest images locally
        cd $project_path/serverBuild/ && sudo docker image build -t $server_tag .
        cd $project_path/serverBuild/server/mailer/ && sudo docker image build -t $mailer_tag .
        cd $project_path/clientbuild/ && sudo docker image build -t $client_tag .
        message="Build completed successfully!"
        ready=1
    fi  
fi
#Otherwise try with cloud images
if [ $ready -eq 0 ]; then
    echo "Do you want to pull the lastest Docker Images from cloud (this will require time and bandwidth)?Y/N"
    read answer
    if [ "$answer" == "Y" ] || [ "$answer" == "y" ]; then 
        #pull latest images from Docker
        docker pull $server_tag
        docker pull $mailer_tag
        docker pull $client_tag
        message="Images pulled successfully!"
        ready=1
    fi
fi

#create docker-compose file
echo "server:
  image: $server_tag
  ports:
    - 80:80
client:
  image: $client_tag
  ports:
    - 3000:3000
  links:
    - server
  stdin_open: true
  environment:
    - CHOKIDAR_USEPOLLING=true
mailer:
  image: $mailer_tag
  links:
    - server" > $project_path/$docker_compose_file

#Run the App
images=$(docker images | tr -s " " | cut -d " " -f -2 | egrep "($(echo $server_tag | tr ":" " ")|$(echo $client_tag | tr ":" " ")|$(echo $mailer_tag | tr ":" " "))" | wc -l | tr -d " ")
if [ $ready -eq 1 ] && [ $images -eq 3 ]; then
    echo "Do you want to run the PULSeBS as a Docker App now?Y/N"
    read answer
    if [ "$answer" == "Y" ] || [ "$answer" == "y" ]; then 
        cd $project_path && docker-compose up
    else
        echo $message;
        echo "To start the App, run: cd $project_path && docker-compose up"
    fi
else
    echo "Sorry, looks like you have $images/3 images required to run this App. Try running the script again."
fi
exit 0