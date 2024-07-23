# Cloud Resume Project

This project is a serverless application that serves a static website from an S3 bucket and uses a DynamoDB table to track the number of visitors to the site. The project is designed to work with AWS and LocalStack.

---

![](./architecture.svg)

## Directory Structure

The project has the following directory structure:

- `frontend/`: Contains the static files for the website.
- `backend/`: Contains the AWS Lambda functions.
  - `getVisitor/`: Contains the code for the `getVisitor` function.
    - `index.js`: The main file for the `getVisitor` function.
    - `package.json`: Lists the dependencies for the `getVisitor` function.
  - `putVisitor/`: Contains the code for the `putVisitor` function.
    - `index.js`: The main file for the `putVisitor` function.
    - `package.json`: Lists the dependencies for the `putVisitor` function.
- `deploy-frontend-local.sh`: A shell script that automates the process of syncing the frontend files with the S3 bucket and other deployment tasks.

## AWS Resources

The AWS resources used in this project are defined in the AWS SAM template. Here's a brief overview:

- `ResumeVisitrosTable`: A DynamoDB table that stores the visitor count.
- `StaticSiteBucket`: An S3 bucket that hosts the static website.
- `BucketPolicy`: The policy for the S3 bucket that allows public read access.
- `getVisitorFunction`: An AWS Lambda function that returns the visitor count.
- `putVisitorFunction`: An AWS Lambda function that increments the visitor count.

## Outputs

The AWS SAM template also defines several outputs:

- `WebsiteURL`: The URL of the static website.
- `LocalStackWebEndpoint`: The endpoint URL for the API Gateway in Localstack.
- `WebEndpoint`: The endpoint URL for the API Gateway in AWS.
- `S3BucketName`: The name of the S3 bucket.

## Deployment

To deploy this project, you can use the AWS SAM CLI. Please refer to the official AWS SAM documentation for more information. For local testing and development, you can use LocalStack. The `deploy-frontend-local.sh` script can be used to automate the deployment of the frontend files to the S3 bucket.
