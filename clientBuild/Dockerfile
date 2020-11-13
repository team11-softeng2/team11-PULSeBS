FROM node:10
RUN apt-get update
COPY ./client /var/www/html/client
RUN cd client ; npm install
CMD npm start
