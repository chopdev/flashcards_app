#!/bin/bash
set -eo pipefail

REGION="us-east-1"
# Ensure bucket name is read correctly
ARTIFACT_BUCKET=$(cat bucket-name.txt)

# Build the SAM application using Docker to match Lambda's environment
#sam build --use-container

# Package the application
sam package \
    --output-template-file packaged.yml \
    --s3-bucket $ARTIFACT_BUCKET \
    --region $REGION

# Deploy the application
sam deploy \
    --template-file packaged.yml \
    --stack-name translation-service \
    --capabilities CAPABILITY_IAM \
    --region $REGION
