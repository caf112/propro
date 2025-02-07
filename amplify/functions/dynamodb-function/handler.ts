import type { DynamoDBStreamHandler } from "aws-lambda";
import { Logger } from "@aws-lambda-powertools/logger";

const logger = new Logger({
  logLevel: "INFO",
  serviceName: "dynamodb-stream-handler",
});

export const handler: DynamoDBStreamHandler = async (event) => {
  for (const record of event.Records) {
    logger.info(`Processing record: ${record.eventID}`);
    logger.info(`Event Type: ${record.eventName}`);

    if (record.eventName === "INSERT") {
      const newData = record.dynamodb?.NewImage;
      logger.info(`New Room Data: ${JSON.stringify(newData)}`);

      // API Gateway にデータを送信
      await sendDataToAPI(newData);
    }
  }

  logger.info(`Successfully processed ${event.Records.length} records.`);

  return {
    batchItemFailures: [],
  };
};

// DynamoDB のストリームデータを API Gateway 経由でフロントエンドに送信
const sendDataToAPI = async (data: any) => {
  const apiUrl = process.env.API_ENDPOINT!;
  try {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    logger.info("Successfully sent data to API");
  } catch (error) {
    logger.error("Failed to send data to API", error);
  }
};
