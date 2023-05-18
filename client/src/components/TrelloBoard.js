import React, { Component } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext } from "react-beautiful-dnd";
import { sort } from "../actions";

class TrelloBoard extends Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    const { saveStateOnDB, dispatch } = this.props;

    // If destination ended up at a non-droppable location
    if (!destination) {
      return;
    }

    dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );

    saveStateOnDB();
  };

  render() {
    const { lists, title, saveStateOnDB } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div style={{ marginTop: "60px" }}>
          <h1 style={styles.boardTitle}>{title}</h1>
          <div style={styles.listContainer}>
            {lists.map((list) => (
              <TrelloList
                listID={list.id}
                key={list.id}
                title={list.title}
                cards={list.cards}
                saveStateOnDB={saveStateOnDB}
              />
            ))}
            <TrelloActionButton list saveStateOnDB={saveStateOnDB} />
          </div>
        </div>
      </DragDropContext>
    );
  }
}

const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: 8,
  },
  boardTitle: {},
};

const mapStateToProps = (state) => ({
  lists: state.lists,
  auth: state.auth,
});

export default connect(mapStateToProps)(TrelloBoard);
