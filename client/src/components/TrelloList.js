import React from "react";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import { Droppable } from "react-beautiful-dnd";
import Icon from "@material-ui/core/Icon";
import { connect } from "react-redux";
import { deleteList } from "../actions";

const TrelloList = (props) => {
  const { title, cards, listID, dispatch, saveStateOnDB } = props;

  const handleDelete = (listID) => {
    dispatch(deleteList(listID));
    saveStateOnDB();
  };

  return (
    <Droppable droppableId={String(listID)}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={styles.container}
        >
          <div style={styles.titleContainer}>
            <h4>{title}</h4>
            <Icon
              onClick={() => handleDelete(listID)}
              style={styles.deleteButton}
            >
              delete
            </Icon>
          </div>
          {cards.map((card, index) => (
            <TrelloCard
              key={card.id}
              text={card.text}
              id={card.id}
              index={index}
            />
          ))}
          {provided.placeholder}
          <TrelloActionButton listID={listID} saveStateOnDB={saveStateOnDB} />
        </div>
      )}
    </Droppable>
  );
};

const styles = {
  container: {
    backgroundColor: "#dfe3e6",
    borderRadius: 3,
    width: 300,
    padding: 8,
    marginRight: 8,
    height: "100%",
  },
  titleContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  deleteButton: {
    cursor: "pointer",
    opacity: "0.6",
  },
};

export default connect()(TrelloList);
