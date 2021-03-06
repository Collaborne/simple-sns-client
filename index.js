/** @module simple-sns-client */

/**
 * Helper client to simplify access to SNS
 */
class SNSClient {
	/* eslint-disable-line lines-around-comment */
	/**
	 * @param {module:aws-sdk.AWS.SNS} sns AWS SNS client
	 */
	constructor(sns) {
		this.sns = sns;

		/** Caches the ARNs of known topics */
		this.topicArns = {};
	}

	/**
	 * Creates a topic in SNS and return the ARN. This method returns the ARN of any existing topic with the same name.
	 *
	 * @param {String} topic Name of the topic that should be created
	 * @return {Promise<String>} ARN of the new topic
	 */
	createTopic(topic) {
		return this.sns.createTopic({Name: topic}).promise()
			.then(res => res.TopicArn)
			.catch(e => {
				throw new Error(`Failed to publish to SNS: ${e.message}`);
			});
	}

	/**
	 * Returns the ARN of formerly created SNS topics. If the ARN is unknown, it is created in SNS.
	 *
	 * @param {String} topic SNS topic for which the ARN is requested
	 * @return {Promise<String>} ARN of the topic
	 */
	getTopicArn(topic) {
		const topicArn = this.topicArns[topic];
		return topicArn ? Promise.resolve(topicArn) : this.createTopic(topic);
	}

	/**
	 * Publishes a message to SNS
	 *
	 * @param {String} topicArn	ARN of the topic to whicht message should be published
	 * @param {Object} msg message to publish
	 * @returns {Promise<any>} result of the publish operation
	 */
	publish(topicArn, msg) {
		const params = {
			Message: JSON.stringify(msg),
			TopicArn: topicArn,
		};

		return this.sns.publish(params).promise()
			.catch(e => {
				throw new Error(`Failed to publish to SNS: ${e.message}`);
			});
	}
}

module.exports = SNSClient;
