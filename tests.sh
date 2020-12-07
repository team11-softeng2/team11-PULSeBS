#!/bin/bash
project_path=$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )
executable=$(basename $0)
finished=0

if [ "$#" -eq 0 ]; then
    array[0]="--client"
    array[1]="--server"
elif [ "$1" == "--help" ]; then
echo $executable
    echo "Usage: $0 [--option]"
    printf "Options:
        <none>      ->  Execute ALL tests and ask to report on Sonarcloud
        --help      ->  Display the help utility
        --server    ->  Execute only server tests
        --client    ->  Execute only client tests\n"
    exit 0
else
    array[0]=$1
    array[1]=$2
    finished=1
fi

if [[ " ${array[@]} " =~ "--client" ]]; then
    #generate client reports------------------------------------------------------------------
    cd $project_path/clientbuild/client
    #test reports
    npm run test -- --testResultsProcessor=jest-sonar-reporter --watchAll=false
    #coverage reports
    npm run test -- --coverage --coverageReporters=lcov  --coverageDirectory=reports/coverage --watchAll=false
fi

if [[ " ${array[@]} " =~ "--server" ]]; then
    #generate server reports-------------------------------------------------------------------
    cd $project_path/serverBuild/server
    #test reports
    ./vendor/bin/phpunit --log-junit reports/tests/phpunit.report.xml
    #coverager reports
    ./vendor/bin/phpunit --coverage-clover reports/coverage/coverage.xml
fi

if [ $finished -eq 1 ]; then
    exit 0
else
    #SonarCloud 
    echo Do you want to update Sonarcloud as well?Y/N
    read answer
    if [ "$answer" == "Y" ] || [ "$answer" == "y" ]; then 
        cd $project_path
        echo Are you Calogero?Y/N
        read answer
        if [ "$answer" == "Y" ] || [ "$answer" == "y" ]; then
            source /etc/environment
            sonar-scanner
        else
            sonar-scanner
        fi
    fi
    exit 0
fi
