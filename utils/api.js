import {AsyncStorage} from 'react-native'
import {DECKS_STORAGE_KEY} from './helpers'

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
          .then((results) => JSON.parse(results))
}

export function createDeck({deckName, deckId}) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deckId]: {
      deckName,
      cards: []
    }
  }))
}

export function createCard({deckId, card}) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
          .then((results) => {
            const data = JSON.parse(results)
            data[deckId].cards = [...data[deckId].cards, card]
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
          })
}

export function removeDeck(deckId) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
          .then((results) => {
            const data = JSON.parse(results)
            data[deckId] = undefined
            delete data[deckId]
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
          })
}
