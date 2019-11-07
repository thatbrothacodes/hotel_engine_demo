FROM node:13-alpine as NODE
ENV LAST_UPDATED 20191107T204600

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

FROM nginx:1.17-alpine

COPY --from=NODE /client/build/ /usr/share/nginx/html

# copy local NGINX config to NGINX server
COPY nginx.config /etc/nginx/conf.d/default.conf