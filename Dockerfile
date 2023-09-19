FROM node:16

WORKDIR /usr/app

COPY package*.json .

# Install all Nodejs dependency
RUN npm install

COPY . .

# Build source
RUN npm run build

# ENTRYPOINT [ "/usr/app/runner.sh" ]
CMD [ "/usr/app/runner.sh" ]

# port for nodejs server
EXPOSE 3000

# port for socket io
EXPOSE 4000