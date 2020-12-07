#!/bin/bash
project_path=$(dirname $0)
executable=$(basename $0)

if [ "$#" -eq 0 ]; then
    array[0]="client"
    array[1]="server"
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
    end=1
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

if [ $end ]; then
    exit 0
else
    #SonarCloud 
    echo Do you want to update SonarCloud as well?S/N
    read updateSonar
    if [ "$updateSonar" == "S" ]; then 
        cd $project_path
        echo Are you Calogero?S/N
        read Calogero
        if [ "$Calogero" == "S" ]; then
            source /etc/environment
            sonar-scanner
        else
            sonar-scanner
        fi
    fi
    exit 0
fi
