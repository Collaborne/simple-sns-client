# simple-sns-client [![Build Status](https://travis-ci.org/Collaborne/simple-sns-client.svg?branch=master)](https://travis-ci.org/Collaborne/simple-sns-client)

Helper client to simplify access to AWS SNS (NodeJS)

## Usage

```javascript
const AWS = require('aws-sdk');
const SNSClient = require('simple-sns-client');

const sns = new AWS.SNS();
const snsClient = new SNSClient(sns);

snsClient
	.getTopicArn('my-topic')
	.then(topicArn => snsClient.publish(topicArn, 'Hello world!'));
```
