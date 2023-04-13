#!/bin/bash

sudo docker build -t ermiry/silvertime-login:latest -f Dockerfile .

sudo docker push ermiry/silvertime-login:latest
