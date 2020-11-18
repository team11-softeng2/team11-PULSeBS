## Composer on the server side

### install php

```bash
sudo apt install php
```

### install composer

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
# If you want to check the hash file programmatically, be sure to use the latest on the website above
# php -r "if (hash_file('sha384', 'composer-setup.php') === 'c31c1e292ad7be5f49291169c0ac8f683499edddcfd4e42232982d0fd193004208a58ff6f353fde0012d35fdd72bc394') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

#### composer as global variable

    mv composer.phar /usr/local/bin/composer

### configure composer.json and phpunit.xml

- vai sulla cartella server
- composer require phpunit/phpunit
- aprire il file appena creato nella cartella server
- incollare questo:

```JSON
{
    "require": {
        "phpunit/phpunit": "^9.4",
        "phpmailer/phpmailer": "^6.1"
    },
    "autoload": {
        "psr-4": {
            "Server\\": "src"
        }
    }
}
```

- create a file phpunit.xml inside /serverBuild/server and paste the following

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

- open the command and execute:

```bash
composer dump-autoload -o
```

## Useful Commands

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

inside /serverBuild/server run:

```bash
testphp --coverage-clover reports/coverage/coverage.xml
```

##### report coverage client

inside /clientBuild/client run:

```bash
npm run test -- --coverage --coverageReporters=lcov  --coverageDirectory=reports/coverage
```

##### report test

###### client

inside /clientBuild/client run:

```bash
npm i -D jest-sonar-reporter
```

generate tests' reports:

```bash
npm run test -- --testResultsProcessor=jest-sonar-reporter
```

###### server

```bash
testphp --log-junit reports/tests/phpunit.report.xml
```

#### Docker

```bash
#build and run the server image
cd /serverBuild/ && sudo docker image build -t server .
docker run -d -p 80:80 --name server server
#build and run the mailer image
cd /serverBuild/server/mailer/ && sudo docker image build -t mailer .
sudo docker run -d --name mailer mailer
#build and run the client image
cd /clientBuild/ && sudo docker image build -t client .
sudo docker run -itd -p 3000:3000 --name client client
#sudo docker exec -it my-apache-php-app bash
```

OR

```bash
cd / && docker-compose up
```

##### sonarCloud commands

```bash
solo calogero source /etc/environment
sonar-scanner
```
