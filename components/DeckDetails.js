import React from "react"
import {Text, TouchableOpacity, View} from "react-native"
import {connect} from "react-redux"
import {removeDeck} from "../utils/api"
import {deleteDeck} from "../actions"

class DeckDetails extends React.Component {

  goToAddCard = () => {
    this.props.navigation.navigate(
            'Add Card',
            {deckId: this.props.deck.deckId}
    )
  }

  goToQuiz = () => {
    this.props.navigation.navigate(
            'Quiz',
            {deckId: this.props.deck.deckId}
    )
  }

  deleteDeck = () => {
    const deckId = this.props.deck.deckId
    removeDeck(this.props.deck.deckId)
            .then(() => this.props.dispatch(deleteDeck(deckId)))
            .then(() => this.props.navigation.navigate('Decks'))
  }

  render() {
    const numOfCards = this.props.deck.cards ? this.props.deck.cards.length : 0
    return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>{this.props.deck.deckName}</Text>
              <Text>{numOfCards + ' cards'}</Text>

              <TouchableOpacity onPress={this.goToAddCard}>
                <Text>Add Card</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.goToQuiz} disabled={numOfCards === 0}>
                <Text>Start Quiz</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.deleteDeck}>
                <Text>Delete Deck</Text>
              </TouchableOpacity>
            </View>
    )
  }

}

function mapStateToProps(state, {route}) {
  const {deckId} = route.params

  return {
    deck: {...state[deckId], deckId}
  }
}

export default connect(mapStateToProps)(DeckDetails)
