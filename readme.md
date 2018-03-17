# Config

|Var|Mean|Default|
|---|---|---|
|ES_HOST| host of ES node, can be separated by coma| |
|REGION| region to ES node|us-east-1|

# Deploy

To deploy the lambda use:

```bash
zip -ru lambda.zip *
```

to update the lambda function:

```bash
aws lambda update-function-code --function-name  LogsToElasticsearch_abg-emr --zip-file fileb://lambda.zip

```

# Dependencies

```bash
npm i 
```

# Test

```bash
ES_ENDPOINT=https://search-abg-security-logging-domain-ydvds7liemlf6cmc6vahptkfvy.us-east-1.es.amazonaws.com  mocha test
```

