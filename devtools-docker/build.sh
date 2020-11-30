# Rebuild the custom image from selenium/standalone-chrome-debug
docker image rm local/standalone-chrome-debug-devtools:1.0
docker build -t local/standalone-chrome-debug-devtools:1.0 .
