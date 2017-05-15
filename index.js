'use strict';

/**
 * Helper client to simplify access to SNS
 */
module.exports = class SNSClient {

	constructor(sns) {
		this.sns = sns;
	}

	/**
	 * Creates a topic in SNS and return the ARN. This method returns the ARN of any existing topic with the same name.
	 * 
	 * @param {String} topic Name of the topic that should be created
	 * @return {Promise<String>} ARN of the new topic
	 */
	createTopic(topic) {
		return this.sns.createTopic({ Name: topic }).promise()
			.then(res => res.TopicArn);
	}

	/**
	 * Publishes a message to SNS
	 * 
	 * @param {String} topicArn	ARN of the topic to whicht message should be published 
	 * @param {Object} msg
	 * @returns 
	 */
	publish(topicArn, msg) {
		const params = {
			Message: JSON.stringify({
				default: JSON.stringify(msg)
			}),
			MessageStructure: 'json',
			TopicArn: topicArn,
		};

		return this.sns.publish(params).promise();
	}

}
