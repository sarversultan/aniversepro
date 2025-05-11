#!/bin/bash

# Pull latest changes
git pull origin main

# Build and restart containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Clean up old images
docker image prune -f

# Check logs
docker-compose logs -f 