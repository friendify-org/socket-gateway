#!/bin/bash
# Run production mode if $NODE_ENV is production

if [ $NODE_ENV == "production" ]; then
    node dist/main.js
else
    yarn start:dev
fi