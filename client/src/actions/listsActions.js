import { CONSTANTS } from "../actions";

export const setListState = (boardData) => {
  return {
    type: CONSTANTS.SET_LIST_STATE,
    payload: { boardData },
  };
};

export const addList = (title) => {
  return {
    type: CONSTANTS.ADD_LIST,
    payload: { title },
  };
};

export const deleteList = (listID) => {
  return {
    type: CONSTANTS.DELETE_LIST,
    payload: { listID },
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId
) => {
  return {
    type: CONSTANTS.DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
    },
  };
};
