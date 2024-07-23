#!/bin/bash

readonly STACK_NAME="cloud-resume-challenge"

cd frontend

S3_BUCKET=$(awslocal cloudformation describe-stacks --stack-name $STACK_NAME --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' --output text)

# Fetch the WebEndpoint URL and write it to constant.js
ENDPOINT_URL=$(awslocal cloudformation describe-stacks --stack-name $STACK_NAME --query 'Stacks[0].Outputs[?OutputKey==`WebEndpoint`].OutputValue' --output text)

echo "const API_ENDPOINT = '$ENDPOINT_URL';" > constant.js

# Upload your frontend files to the S3 bucket
awslocal s3 sync . s3://$S3_BUCKET/

echo 'Deployed'
echo $(awslocal cloudformation describe-stacks --stack-name $STACK_NAME --query 'Stacks[].Outputs')


