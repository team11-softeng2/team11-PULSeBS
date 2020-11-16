# Dockerfile
FROM php:7-apache
RUN a2enmod rewrite
RUN a2enmod headers
RUN apt-get update
RUN apt-get install -y sqlite3
RUN apt-get install -y git

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === 'c31c1e292ad7be5f49291169c0ac8f683499edddcfd4e42232982d0fd193004208a58ff6f353fde0012d35fdd72bc394') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"

RUN mv composer.phar /usr/local/bin/composer

COPY ./server /var/www/html/server
RUN cd ./server ; composer update;
RUN chmod o+w /var/www/html/server/src
RUN chown www-data:  /var/www/html/server/src/db.db
RUN chmod o+w /var/www/html/server/tests
RUN chown www-data:  /var/www/html/server/tests/dbForTesting2.db

