## Composer lato server

### installare php

```bash
sudo apt install php
```

### installare composer

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'c31c1e292ad7be5f49291169c0ac8f683499edddcfd4e42232982d0fd193004208a58ff6f353fde0012d35fdd72bc394') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

#### composer come variabile globale

    mv composer.phar /usr/local/bin/composer

### configurazione composer.json e phpunit.xml

- vai sulla cartella server
- composer require phpunit/phpunit
- aprire il file appena creato nella cartella server
- incollare questo:

```JSON
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
```

- creare un file phpunit.xml dentro la cartella server
- incollare questo

```XML
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
```

- infine andare nella console e digitare questo

```bash
composer dump-autoload -o
```

## comandi utili

#### phpunit

##### running test

###### server

    alias testphp=./vendor/bin/phpunit
    testphp

###### client

```bash
npm run test
```

##### report coverage server

nella cartella server:

```bash
testphp --coverage-clover reports/coverage/coverage.xml
```

##### report coverage client

inside client folder:

```bash
npm run test -- --coverage --coverageReporters=lcov  --coverageDirectory=reports/coverage
```

##### report test

###### client

dentro client installa prima questo:

```bash
npm i -D jest-sonar-reporter
```

comando per generare i reports dei test:

```bash
npm run test -- --testResultsProcessor=jest-sonar-reporter
```

###### server

```bash
testphp --log-junit reports/tests/phpunit.report.xml
```

#### docker

```bash
cd /serverBuild/ && sudo docker image build -t server .
docker run -d -p 80:80 --name server server
cd /serverBuild/server/mailer/ && sudo docker image build -t mailer .
sudo docker run -d --name mailer mailer
cd /clientBuild/ && sudo docker image build -t client .
sudo docker run -itd -p 3000:3000 --name client client
(sudo docker exec -it my-apache-php-app bash)

OPPURE

cd / && docker-compose up
```

##### comandi per sonarCloud

```bash
solo calogero source /etc/environment
sonar-scanner
```
