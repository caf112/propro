import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource';
import { data } from './data/resource'
import { myDynamoDBFunction } from './functions/dynamodb-function/resource';
import { Policy, PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { StartingPosition, EventSourceMapping } from "aws-cdk-lib/aws-lambda";
import { Stack } from "aws-cdk-lib";


export const backend = defineBackend({
    auth,
    data,
    myDynamoDBFunction,
});

const roomTable = backend.data.resources.tables["Room"];
const policy = new Policy(
  Stack.of(roomTable),
  "MyDynamoDBFunctionStreamingPolicy",
  {
    statements: [
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          "dynamodb:DescribeStream",
          "dynamodb:GetRecords",
          "dynamodb:GetShardIterator",
          "dynamodb:ListStreams",
        ],
        resources: ["*"],
      }),
    ],
  }
);
backend.myDynamoDBFunction.resources.lambda.role?.attachInlinePolicy(policy);

const mapping = new EventSourceMapping(
  Stack.of(roomTable),
  "MyDynamoDBFunctionRoomEventStreamMapping",
  {
    target: backend.myDynamoDBFunction.resources.lambda,
    eventSourceArn: roomTable.tableStreamArn,
    startingPosition: StartingPosition.LATEST,
  }
);

mapping.node.addDependency(policy);