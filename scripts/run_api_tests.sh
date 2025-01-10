#!/bin/bash

docker compose exec products-api dotnet watch test Backend.sln --logger console;verbosity=detailed