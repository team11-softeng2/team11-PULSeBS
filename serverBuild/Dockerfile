# Dockerfile
FROM php:7-apache
RUN a2enmod rewrite
RUN a2enmod headers
# install required packages
RUN apt-get update
RUN apt-get install -y sqlite3
RUN apt-get install -y git

# COMPOSER
# download composer installer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
# verify the installer
#RUN php -r "if (hash_file('sha384', 'composer-setup.php') === '756890a4488ce9024fc62c56153228907f1545c228516cbf63f885e036d37e9a59d27d63f46af1d4d07ee0f76181c7d3') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
# install composer
RUN php composer-setup.php
# clean up: remove the installer
RUN php -r "unlink('composer-setup.php');"
# make it executable
RUN mv composer.phar /usr/local/bin/composer

# COPY SERVER FILES from local
COPY ./server /var/www/html/server
# update composer packages
RUN cd ./server ; composer update
RUN chmod o+w /var/www/html/server/src
RUN chown www-data:  /var/www/html/server/src/db.db
RUN chmod o+w /var/www/html/server/tests
RUN chown www-data:  /var/www/html/server/tests/dbForTesting2.db

# Make port 80 available to the world outside this container
EXPOSE 80