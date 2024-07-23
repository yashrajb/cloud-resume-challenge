const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

exports.handler = async function () {
  try {
    const host = process.env.LOCALSTACK_HOSTNAME;
    const port = process.env.EDGE_PORT;
    const endpoint = `http://${host}:${port}`;
    const client = new DynamoDBClient({
      endpoint,
    });
    const docClient = DynamoDBDocumentClient.from(client);

    const command = new ScanCommand({
      TableName: "resumeVisitors",
    });

    let visitors = await docClient.send(command);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.FRONTEND_URL,
      },
      body: JSON.stringify(visitors),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.FRONTEND_URL,
      },
      body: `Error - ${e}`,
    };
  }
};
