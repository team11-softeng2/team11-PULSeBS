FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y cron
RUN apt-get install -y curl

# Copy hello-cron file to the cron.d directory
COPY mail.mail /etc/cron.d/mail
# Give execution rights on the cron job
RUN chmod 0744 /etc/cron.d/mail
# Apply cron job
RUN crontab /etc/cron.d/mail
# Run the command on container startup
CMD ["cron", "-f"]