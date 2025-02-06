import type { Handler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: Handler = async (event) => {
  const { roomId, userId, message } = JSON.parse(event.body);

  const params = {
    TableName: 'Messages',
    Item: {
      messageId: `msg-${Date.now()}`,
      roomId,
      sender: userId,
      message,
      createdAt: new Date().toISOString(),
    },
  };

  await dynamoDb.put(params).promise();
  return { statusCode: 200, body: JSON.stringify({ message: "Message sent!" }) };
};
