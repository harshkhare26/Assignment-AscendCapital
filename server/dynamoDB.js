const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "https://dynamodb.us-west-2.amazonaws.com",
});

const docClient = new AWS.DynamoDB.DocumentClient();

async function getBoard(userID, boardID) {
  const params = {
    TableName: "UserBoards",
    Key: {
      userID: userID,
    },
  };

  try {
    // Query the "UserBoards" table to get user data
    const data = await docClient.get(params).promise();
    const { Item } = data;
    const list = Item.userBoards;

    // Iterate through the user's board list and find the
    // target board
    let curr;
    for (let i = 0; i < list.length; i++) {
      curr = list[i];
      if (curr.boardID === boardID) {
        return curr;
      }
    }

    return undefined;
  } catch (error) {
    console.log(
      "Unable to read item. Error JSON:",
      JSON.stringify(error, null, 2)
    );
    return undefined;
  }
}

async function getListOfBoardNames(userID) {
  const params = {
    TableName: "UserBoards",
    Key: {
      userID: userID,
    },
  };

  try {
    // Query the "UserBoards" table to get user data
    const data = await docClient.get(params).promise();
    const { Item } = data;
    const userBoards = Item.userBoards;

    const listOfBoardNames = userBoards.map((board) => ({
      boardID: board.boardID,
      boardName: board.boardName,
    }));

    return listOfBoardNames;
  } catch (error) {
    console.log(
      "Unable to read item. Error JSON:",
      JSON.stringify(error, null, 2)
    );
    return undefined;
  }
}

async function createBoard(userID, boardID, boardName) {
  const newBoardTemplate = {
    boardID: boardID,
    boardName: boardName,
    boardData: [],
  };

  let params = {
    TableName: "UserBoards",
    Key: {
      userID: userID,
    },
  };

  try {
    // Query the "UserBoards" table to get user data
    const data = await docClient.get(params).promise();
    const { Item } = data;
    const userBoards = Item.userBoards;
    userBoards.push(newBoardTemplate);

    params = {
      TableName: "UserBoards",
      Item: Item,
    };
    const response = await docClient.put(params).promise();

    return "success";
  } catch (error) {
    console.log(
      "Unable to read item. Error JSON:",
      JSON.stringify(error, null, 2)
    );
    return "error";
  }
}

async function updateBoardData(userID, boardID, newData) {
  let params = {
    TableName: "UserBoards",
    Key: {
      userID: userID,
    },
  };

  try {
    // Query the "UserBoards" table to get user data
    const data = await docClient.get(params).promise();
    const { Item } = data;
    const userBoards = Item.userBoards;

    // Iterate through the user's board list and find the
    // target board
    let curr;
    for (let i = 0; i < userBoards.length; i++) {
      curr = userBoards[i];
      if (curr.boardID === boardID) {
        curr.boardData = newData;
        break;
      } else if (i === userBoards.length - 1) {
        return "error";
      }
    }

    params = {
      TableName: "UserBoards",
      Item: Item,
    };
    const response = await docClient.put(params).promise();

    return "success";
  } catch (error) {
    console.log(
      "Unable to read item. Error JSON:",
      JSON.stringify(error, null, 2)
    );
    return "error";
  }
}

module.exports = {
  getBoard,
  getListOfBoardNames,
  updateBoardData,
  createBoard,
};
