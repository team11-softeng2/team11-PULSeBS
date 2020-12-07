# Run the App

```bash
./start.sh
```

# Execute Tests

```bash
./reports.sh
```

# Other Commands

## Docker

```bash
cd / && docker-compose up
```

OR

```bash
#build and run the server image
cd serverBuild/ && sudo docker image build -t server .
docker run -d -p 80:80 --name server server
#build and run the mailer image
cd serverBuild/server/mailer/ && sudo docker image build -t mailer .
sudo docker run -d --name mailer mailer
#build and run the client image
cd clientbuild/ && sudo docker image build -t client .
sudo docker run -itd -p 3000:3000 --name client client
```

## Server Setup

### install php

```bash
sudo apt install php
```

### install composer

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
# If you want to check the hash file programmatically, be sure to use the latest one on the website above
# php -r "if (hash_file('sha384', 'composer-setup.php') === 'c31c1e292ad7be5f49291169c0ac8f683499edddcfd4e42232982d0fd193004208a58ff6f353fde0012d35fdd72bc394') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

### set composer as a global variable

    mv composer.phar /usr/local/bin/composer

### configure composer.json and phpunit.xml

- navigate to serverBuild/server and create a composer.json:

```bash
cd serverBuild/server/ && composer require phpunit/phpunit
```

- open the file composer.json and paste the following:

```JSON
{
    "require": {
        "phpunit/phpunit": "^9.4",
        "phpmailer/phpmailer": "^6.1",
        "guzzlehttp/guzzle": "^7.2"
    },
    "autoload": {
        "psr-4": {
            "Server\\": "src"
        }
    }
}
```

- create a file phpunit.xml inside serverBuild/server and paste the following:

```XML
<?xml version="1.0" encoding="UTF-8"?>
<phpunit bootstrap="vendor/autoload.php"
        colors="true"
        verbose="true"
        stopOnFailure="false">
    <testsuites>
        <testsuite name="Test Suite">
            <directory suffix=".php">tests</directory>
        </testsuite>
    </testsuites>
    <coverage>
        <include>
            <directory suffix=".php">src</directory>
        </include>
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

## Tests and Coverage

First, navigate to serverBuild/server and define an alias:

```bash
cd serverBuild/server/ && alias testphp=./vendor/bin/phpunit
```

### report coverage server

inside serverBuild/server, run:

```bash
testphp --coverage-clover reports/coverage/coverage.xml
```

### running test server

inside serverBuild/server, run:

```bash
testphp
```

### report test server

```bash
testphp --log-junit reports/tests/phpunit.report.xml
```

### report coverage client

inside clientbuild/client run:

```bash
npm run test -- --coverage --coverageReporters=lcov  --coverageDirectory=reports/coverage
```

### running test client

inside clientbuild/client run:

```bash
npm run test
```

### report test client

inside clientbuild/client run:

```bash
npm i -D jest-sonar-reporter
```

generate tests' reports:

```bash
npm run test -- --testResultsProcessor=jest-sonar-reporter
```

## sonarCloud

Follow instructions at https://sonarcloud.io/documentation/analysis/scan/sonarscanner/
