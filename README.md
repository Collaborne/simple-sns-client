# simple-sns-client

[![Greenkeeper badge](https://badges.greenkeeper.io/Collaborne/simple-sns-client.svg)](https://greenkeeper.io/)
Helper client to simplify access to AWS SNS (NodeJS)

## Usage

```javascript
const AWS = require('aws-sdk');

const sns = new AWS.SNS();
const snsClient = new SNSClient(sns);

snsClient
	.getTopicArn('my-topic')
	.then(topicArn => snsClient.publish(topicArn, 'Hello world!'));
```
