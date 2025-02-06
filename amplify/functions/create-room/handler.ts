import type { Handler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import * as crypto from 'crypto';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: Handler = async (event) => {
  const { roomId, password } = JSON.parse(event.body);

  // パスワードをハッシュ化
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  const params = {
    TableName: 'ChatRooms',
    Item: {
      roomId,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    },
  };

  await dynamoDb.put(params).promise();
  return { statusCode: 200, body: JSON.stringify({ message: "Room created!" }) };
};
