const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dbClient = require("./dynamoDB");
const { v4: uuidv4 } = require("uuid");
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World! The server is up and running!");
});

// Returns a list of boards given a userID
app.get("/boards", async (req, res) => {
  const { userID } = req.query;

  // Return error code if no userID was provided
  if (!userID) {
    return res.sendStatus(400);
  }

  // Get list of board names
  const listOfBoardNames = await dbClient.getListOfBoardNames(userID);
  if (!listOfBoardNames) {
    return res.status(404).send(`User id ${userID} does not have any boards`);
  }

  return res.status(200).send({ listOfBoardNames });
});

app.post("/board", async (req, res) => {
  const { userID, boardName } = req.body;

  if (!userID || !boardName) {
    return res.sendStatus(400);
  }
  const boardID = uuidv4();

  const response = await dbClient.createBoard(userID, boardID, boardName);
  if (response === "error") {
    return res
      .status(404)
      .send(
        `Could not create a new board under user id: ${userID} with boardName: ${boardName}`
      );
  }

  return res.status(201).send({ boardID: boardID, boardName: boardName });
});

// Saves a board given the userID, boardID, and new data
app.put("/board", async (req, res) => {
  const { userID, boardID, data } = req.body;

  // If any of them are undefined
  if (!userID || !boardID || !data) {
    return res.sendStatus(400);
  }

  const response = await dbClient.updateBoardData(userID, boardID, data);
  if (response === "error") {
    return res
      .status(404)
      .send(
        `Could not update data for board id: ${boardID} and user id: ${userID}`
      );
  }

  // If succeeded, return 200
  return res.sendStatus(200);
});

// Returns 1 board given the userID and boardID
app.get("/board", async (req, res) => {
  const { userID, boardID } = req.query;

  // Return error code if userID or boardID wasn't provided
  if (!userID || !boardID) {
    return res.sendStatus(400);
  }

  const board = await dbClient.getBoard(userID, boardID);
  if (!board) {
    return res
      .status(404)
      .send(`Board with id ${boardID} and user id ${userID} DNE`);
  }

  return res.send(board);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
