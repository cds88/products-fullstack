#!/bin/bash

docker compose -f docker-compose.yml -f  docker-compose.testing.yml run -w /app/tests/regression products-frontend-tests yarn chokidar products-frontend-tests "src/**/*.spec.ts" -c "yarn run turbo test --filter=@products/tests-regression"
