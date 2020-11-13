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

## API SERVER


### login
api: http://localhost/server/src/api/Login.php

body : {"username":"calogero","password":"test"}

### lezioni prenotabili dallo studente 
GET
api: http://localhost/serverBuild/server/bookableLessons/id
esempi di ritorno: 
1. [{"name":"Algebra","date":"2020-11-15","beginTime":"11:00:00","endTime":"13:00:00"}]
2. [{"name":"Algebra","date":"2020-11-15","beginTime":"11:00:00","endTime":"13:00:00"},{"name":"Sistemi Operativi","date":"2020-11-20","beginTime":"14","endTime":"16:00:00"}]
3. [{"name":"Algebra","date":"2020-11-15","beginTime":"11:00:00","endTime":"13:00:00"},{"name":"Geometria","date":"2020-11-17","beginTime":"14:00:00","endTime":"16:00:00"},{"name":"Geometria","date":"2020-11-18","beginTime":"14:00:00","endTime":"16:00:00"}]

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
##### report test
testphp --log
#### docker 
sudo docker build -t testbuild1 .
docker run -d -p 80:80 --name my-apache-php-app testbuild1
sudo docker exec -it my-apache-php-app bash

