import { CONSTANTS } from "../actions";
let listId = 2;
let cardId = 6;

const initialState = [
  {
    title: "Todo: Create List",
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        text: "Todo: Create first Card"
      },
      {
        id: `card-${1}`,
        text: "Todo: Create second Card"
      }
    ]
  },
  {
    title: "Todo: Create Second List",
    id: `list-${1}`,
    cards: [ 
      {
        id: `card-${2}`,
        text: "Todo: Add reducer"
      },
      {
        id: `card-${3}`,
        text: "Todo: fix Bugs"
      },
      {
        id: `card-${5}`,
        text: "Todo: add CSS"
      }
    ]
  }
]

const ListsReducer = (state = initialState, action) => {
  switch(action.type){
    case  CONSTANTS.ADD_LIST:
      const newList  = {
        title: action.payload,
        cards: [],
        id: `list-${listId}`,
      };
      listId += 1;
      return [...state, newList];
      
      case CONSTANTS.ADD_CARD: {
        const newCard  = {
          text: action.payload.text,
          // cards: [],
          id: `card-${cardId}`,
        };
        cardId += 1;
        
        const newState = state.map(list => {
          if(list.id === action.payload.listId){
            return {
              ...list, 
              cards:  [...list.cards, newCard]
            }
          } else {
            return list;
          }
        })
        return newState; 
      }

      case CONSTANTS.DRAG_HAPPENED:
        const { droppableIdStart,
          droppableIdEnd,
          droppableIndexStart,
          droppableIndexEnd,
          droppableId,
          type
        } = action.payload;

        const newState = [...state];

        if (type  === "list"){
          const list = newState.splice(droppableIndexStart, 1);
          newState.splice(droppableIndexEnd, 0,   ...list);
          return newState;
        }
        // dropping at the same list
        if (droppableIdStart === droppableIdEnd){
          const list = state.find(list => droppableIdEnd === list.id)
          const card = list.cards.splice(droppableIndexStart, 1)
          list.cards.splice(droppableIndexEnd, 0, ...card)
        } 

        //other list 
        if (droppableIdStart !== droppableIdEnd){
          //list -> where drag happened
          const listStart = state.find(list => droppableIdStart === list.id)
          // pull card
          const card = listStart.cards.splice(droppableIndexStart, 1);
          //list -> where drag ended
          const listEnd = state.find(list => droppableIdEnd === list.id)
          //put card
          listEnd.cards.splice(droppableIndexEnd, 0, ...card)

        }  
        return newState; 

    default: 
      return state;
  }
}

export default ListsReducer;