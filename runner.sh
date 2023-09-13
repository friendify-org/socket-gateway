#!/bin/bash
# Run production mode if $NODE_ENV is production

if [ $NODE_ENV == "production" ]; then
    yarn start
else
    yarn start:dev
fi