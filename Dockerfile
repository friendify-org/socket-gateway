FROM node:16

WORKDIR /usr/app

COPY package*.json .
COPY yarn* .

# Install all Nodejs dependency
RUN yarn

COPY . .

# Build source
RUN yarn build 

# ENTRYPOINT [ "/usr/app/runner.sh" ]
CMD [ "/usr/app/runner.sh" ]

# port for nodejs server
EXPOSE 3000

# port for socket io
EXPOSE 4000