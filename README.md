comandi per il server e test lato server

1. [Composer lato server](#Composer-lato-server)
2. [API](#API-SERVER)


## Composer lato server
### installare php
sudo apt install php

### installare composer

php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'c31c1e292ad7be5f49291169c0ac8f683499edddcfd4e42232982d0fd193004208a58ff6f353fde0012d35fdd72bc394') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"

#### composer come variabile globale

mv composer.phar /usr/local/bin/composer

### configurazione composer.json e phpunit.xml
- vai sulla cartella server
- composer require phpunit/phpunit
- aprire il file appena creato nella cartella server
- incollare questo:
{
    "require": {
        "phpunit/phpunit": "^9.4"
    },
    "autoload": {
        "psr-4": {
            "Server\\": "src"
        }
    }
}
- creare un file phpunit.xml dentro la cartella server
- incollare questo
<?xml version="1.0" encoding="UTF-8"?>
<phpunit bootstrap="vendor/autoload.php"
        colors="true"
        verbose="true"
        stopOnFailure="false">
    <testsuites>
        <testsuite name="Test suite">
            <directory>tests</directory>
        </testsuite>
    </testsuites>
    <coverage>
        <include><directory suffix=".php">src</directory></include>
        <exclude>
            <file>src/api/Server.php</file>
            <file>src/api/Login.php</file>
        </exclude>
    </coverage>
</phpunit>
- infine andare nella console e digitare questo
composer dump-autoload -o

## comandi utili
#### phpunit
##### running test
dentro server:
 alias testphp=./vendor/bin/phpunit
 testphp
##### report coverage
dentro server:
testphp --coverage-clover reports/coverage/coverage.xml
testphp --log-junit reports/tests/phpunit.report.xml
dentro client:
npm run test -- --coverage --coverageReporters=lcov  --coverageDirectory=src/reports/coverage
##### report test
dentro client:
devi installare prima questo: npm i -D jest-sonar-reporter
comando per generare:
npm run test -- --testResultsProcessor=jest-sonar-reporter
#### docker 
sudo docker build -t testbuild1 .
docker run -d -p 80:80 --name my-apache-php-app testbuild1
sudo docker exec -it my-apache-php-app bash

##### comandi per sonarCloud
solo calogero source /etc/environment 
sonar-scanner
