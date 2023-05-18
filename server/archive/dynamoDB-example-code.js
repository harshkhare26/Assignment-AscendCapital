// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com",
});

const docClient = new AWS.DynamoDB.DocumentClient();

var table = "UserBoards";

var userID = "uuid4";

var params = {
  TableName: table,
  Item: {
    userID: userID,
    userBoards: [
      {
        boardID: "board-uuid",
        boardName: "K-Board",
        boardData: [
          {
            title: "First List",
            id: "list-ed36c6d0-1a0a-45ba-ad66-e1dc60e05aee",
            cards: [
              {
                id: "card-e35dbcb9-3a50-4fb4-a7a4-e4f7bf20640b",
                text: "We created a static list and a static card",
              },
              {
                id: "card-deda46a0-fc7e-4836-a9d8-430f14ea404b",
                text: "Card 2 text here",
              },
            ],
          },
          {
            title: "Second list",
            id: "list-045ecfa1-b33b-4b08-9074-82712278035e",
            cards: [
              {
                id: "card-8818344b-6d0a-4a12-8fe3-d1d63a72c88a",
                text: "Card 1 text here",
              },
              {
                id: "card-f36332d0-0a26-4dc3-bfa1-589f5d4947d4",
                text: "Card 2 text here",
              },
            ],
          },
        ],
      },
    ],
  },
};

console.log("Adding a new item...");
// docClient.put(params, function (err, data) {
//   if (err) {
//     console.error(
//       "Unable to add item. Error JSON:",
//       JSON.stringify(err, null, 2)
//     );
//   } else {
//     console.log("Added item:", JSON.stringify(data, null, 2));
//   }
// });

const targetUserID = "uuid4";
const targetBoardID = "board-uuid";

params = {
  TableName: "UserBoards",
  Key: {
    userID: targetUserID,
  },
};

docClient.get(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to read item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    const { Item } = data;

    for (let i = 0; i < Item.userBoards.length; i++) {
      if (Item.userBoards[i].boardID === targetBoardID) {
        console.log("Found", Item.userBoards[i]);
      }
    }
  }
});
