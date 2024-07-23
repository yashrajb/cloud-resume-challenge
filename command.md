# Create Dynamodb

`awslocal dynamodb create-table --table-name resumeVisitors --attribute-definitions AttributeName=visitorId,AttributeType=N --key-schema AttributeName=visitorId,KeyType=HASH  --billing-mode PAY_PER_REQUEST `

# Change Dynamodb schema

`awslocal dynamodb put-item --table-name resumeVisitors --item '{"visitorId": {"N": "1"}, "visitorCount": {"N": "0"}}'`

# Create lambda function

`awslocal lambda create-function --function-name localstack-lambda-url-example --runtime nodejs18.x --zip-file fileb://function.zip --handler index.handler --role arn:aws:iam::000000000000:role/lambda-role`

# Create API gateway

```
awslocal apigateway create-rest-api --name 'resumeChallenge'
```

# Create Resource

`awslocal apigateway create-resource -rest-api-id "" --parent-id "" --path-part "visitor"`

# Lambda URI

`arn:aws:apigateway:ap-south-1:lambda:path/2015-03-31/functions/arn:aws:lambda:ap-south-1:000000000000:function:get-visitor/invocations`

`arn:aws:apigateway:ap-south-1:lambda:path/2015-03-31/functions/arn:aws:lambda:ap-south-1:000000000000:function:put-visitor/invocations`

# Deploy static site in s3 bucket

`awslocal s3api create-bucket --bucket resumechallenge --region us-east-1`

## Syncing

`awslocal s3 sync ./ s3://resumechallenge --exclude 'backend/*' --exclude 'bucket_policy.json' --exclude 'command.md'`

## Enabling static hosting

`awslocal s3 website s3://testwebsite/ --index-document index.html`

```
awslocal apigateway update-gateway-response --rest-api-id "your_rest_api_id" --response-type "DEFAULT_4XX" --patch-operations op="add",path="/responseParameters/gatewayresponse.header.Access-Control-Allow-Origin",value='http://resumechallenge.s3-website.localhost.localstack.cloud:4566' 
```


