#!/bin/bash

amwebs-setup
# node ./genTestControllers.js
amwebs &
sleep 5
RES=$(curl http://localhost:3000/test_1_controller)
killall node
if [ "$RES" != "root pass" ]; then
    echo "Test controller root FAILED"
    exit 1;
fi
echo "Test controller root passed"