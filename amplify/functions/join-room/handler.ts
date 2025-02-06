import type { Handler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import * as crypto from 'crypto';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: Handler = async (event) => {
  const { roomId, password, userId } = JSON.parse(event.body);

  // パスワードをハッシュ化
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  const params = {
    TableName: 'ChatRooms',
    Key: { roomId },
  };

  const room = await dynamoDb.get(params).promise();

  if (!room.Item || room.Item.password !== hashedPassword) {
    return { statusCode: 401, body: JSON.stringify({ message: "Invalid password" }) };
  }

  // メンバー追加
  const memberParams = {
    TableName: 'RoomMembers',
    Item: {
      roomId,
      userId,
      joinedAt: new Date().toISOString(),
    },
  };

  await dynamoDb.put(memberParams).promise();
  return { statusCode: 200, body: JSON.stringify({ message: "Joined room!" }) };
};
