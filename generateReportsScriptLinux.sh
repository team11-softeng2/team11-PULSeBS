#!/bin/bash

server=$(ls | grep serverBuild)
client=$(ls | grep clientbuild)

if [ "$server" != 'serverBuild' ] || [ "$client" != 'clientbuild' ]
then
    echo wrong initial directory 
    exit
fi

#generate client reports------------------------------------------------------------------

cd ./clientbuild/client

#test reports
npm run test -- --testResultsProcessor=jest-sonar-reporter --watchAll=false


#coverage reports
npm run test -- --coverage --coverageReporters=lcov  --coverageDirectory=reports/coverage --watchAll=false
#------------------------------------------------------------------------------------------


#generate server reports-------------------------------------------------------------------

cd ../../serverBuild/server

#test reports
./vendor/bin/phpunit --log-junit reports/tests/phpunit.report.xml

#coverager reports
./vendor/bin/phpunit --coverage-clover reports/coverage/coverage.xml

#---------------------------------------------------

#SonarCloud 
echo Do you want to update SonarCloud as well?S/N
read updateSonar
updateSonar=${updateSonar^^}
if [ "$updateSonar" == "S" ]
then 
    cd ../../
    echo Are you Calogero?S/N
    read Calogero
    Calogero=${Calogero^^}
    if [ "$Calogero" == "S" ] 
    then
        source /etc/environment
        sonar-scanner
    else
        sonar-scanner
    fi
fi
