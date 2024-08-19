FROM debian:latest
WORKDIR FROM openresty/docker-lua:latest/usr/src/app
RUN apt-get update && apt-get install -y lua5.3
COPY . .
CMD ["lua","helloasl.lua"]
