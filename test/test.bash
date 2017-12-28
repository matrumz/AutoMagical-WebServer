#!/bin/bash

amwebs-setup
cp ./test/controllers/test.1.controller.js ~/controllers/
amwebs &
sleep 5
RES=$(curl http://localhost:3000/test_1_controller)
killall node
echo "Test controller root received: $RES"
if [ "$RES" != "root pass" ]; then
    echo "Test controller root FAILED"
    exit 1;
fi
echo "Test controller root passed"