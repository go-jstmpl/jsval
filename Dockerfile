FROM node:8.1.4

# WORKDIR /
# RUN \
#       mkdir .npm .config && \
#       chmod 777 .npm .config

WORKDIR /jsval
COPY . .

CMD npm run lint && npm run build && npm test
