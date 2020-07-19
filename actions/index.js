export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck(deckId, deckName) {
  return {
    type: ADD_DECK,
    deck: {
      deckId,
      deckName
    }
  }
}

export function deleteDeck(deckId) {
  return {
    type: DELETE_DECK,
    deckId,
  }
}

export function addCard(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card,
  }
}

