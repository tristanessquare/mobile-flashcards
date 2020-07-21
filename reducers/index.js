import {ADD_CARD, ADD_DECK, DELETE_DECK, RECEIVE_DECKS} from '../actions'

function entries(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deckId]: {
          deckName: action.deckName,
          cards: [],
        }
      }
    case ADD_CARD :
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          cards: [...state[action.deckId].cards, action.card],
        },
      }
    case DELETE_DECK :
      const newState = Object.assign({}, state)
      newState[action.deckId] = undefined
      delete newState[action.deckId]
      return newState
    default :
      return state
  }
}

export default entries
