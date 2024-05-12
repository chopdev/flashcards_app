# API Gateway proxy integration with Lambda

This sample application is a Lambda function that processes events from an API Gateway REST API. The API provides a public endpoint that you can access with a web browser or other HTTP client. When you send a request to the endpoint, the API serializes the request and sends it to the function. The function calls the Lambda API to get utilization data and returns it to the API in the required format.

:warning: The application creates a public API endpoint that is accessible over the internet.

![Architecture](/images/sample-apig.png)

The project source includes function code and supporting resources:

- `function` - Python3 function.
- `template.yml` - An AWS CloudFormation template that creates an application.
- `1-create-bucket.sh`, `2-deploy.sh`, etc. - Shell scripts that use the AWS CLI to deploy and manage the application.