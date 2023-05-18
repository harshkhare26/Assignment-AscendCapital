import { CONSTANTS } from "../actions";
import { v4 as uuidv4 } from "uuid";

const listsReducer = (state = [], action) => {
  switch (action.type) {
    case CONSTANTS.SET_LIST_STATE:
      return action.payload.boardData;

    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload.title,
        cards: [],
        id: `list-${uuidv4()}`,
      };
      state.push(newList);
      return [...state];
    case CONSTANTS.ADD_CARD:
      const newCard = {
        text: action.payload.text,
        id: `card-${uuidv4()}`,
      };

      for (let list of state) {
        if (list.id === action.payload.listID) {
          list.cards.push(newCard);
          break;
        }
      }

      return [...state];

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
      } = action.payload;

      const newState2 = [...state];

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }
      // in another list
      else {
        // find the list where drag happened
        const listStart = state.find((list) => droppableIdStart === list.id);

        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);

        // find thelist where the drad ended
        const listEnd = state.find((list) => droppableIdEnd === list.id);

        // put the card int the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState2;
    case CONSTANTS.DELETE_LIST:
      const targetListID = action.payload.listID;

      let targetIndex;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === targetListID) {
          targetIndex = i;
          break;
        }
      }

      state.splice(targetIndex, 1);

      return [...state];
    default:
      return state;
  }
};

export default listsReducer;
