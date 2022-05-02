FROM node:18 as NODE
ENV LAST_UPDATED 20220430T204600

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
 
# runs npm global bin without specifying path
ENV PATH=$PATH:/home/node/.npm-global/bin

USER node

# Install dependencies
RUN npm install -g -s --no-progress npm && \
    npm install -g -s --no-progress yarn

# Change working directory
COPY / /client
WORKDIR /client

USER root

# Install client dependencies and build client


RUN yarn
RUN yarn build

# Expose Container Port
EXPOSE 3000

FROM nginx:1.21-alpine-perl

RUN apk add --no-cache nginx-mod-http-perl

COPY --from=NODE /client/build/ /usr/share/nginx/html

ENV API_URL="http://localhost:4000"

# copy local NGINX config to NGINX server
COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf