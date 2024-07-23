const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": process.env.FRONTEND_URL,
};
exports.handler = async function () {
  try {
    const host = process.env.LOCALSTACK_HOSTNAME;
    const port = process.env.EDGE_PORT;
    const endpoint = `http://${host}:${port}`;
    const client = new DynamoDBClient({
      endpoint,
    });
    const docClient = DynamoDBDocumentClient.from(client);
    const visitorId = 1; // Assuming a single visitor counter

    const params = {
      TableName: "resumeVisitors",
      Key: { visitorId: visitorId },
      UpdateExpression:
        "SET visitorCount = if_not_exists(visitorCount, :start) + :inc",
      ExpressionAttributeValues: {
        ":inc": 1,
        ":start": 0,
      },
      ReturnValues: "UPDATED_NEW",
    };
    const updateCommand = new UpdateCommand(params);
    const result = await docClient.send(updateCommand);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.FRONTEND_URL,
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.FRONTEND_URL,
      },
      body: JSON.stringify(error),
    };
  }
};
