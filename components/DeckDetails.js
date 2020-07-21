import React from "react"
import {StyleSheet, Text, View} from "react-native"
import {connect} from "react-redux"
import {removeDeck} from "../utils/api"
import {deleteDeck} from "../actions"
import Button from "./Button"

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
            <View style={styles.container}>
              <Text style={styles.headerText}>{this.props.deck.deckName}</Text>
              <Text style={{marginBottom: 20}}>{numOfCards + ' cards'}</Text>

              <Button onPress={this.goToAddCard} text="Add Card"/>
              <Button onPress={this.goToQuiz} disabled={numOfCards === 0} text="Start Quiz"/>
              <Button onPress={this.deleteDeck} text="Delete Deck"/>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 15
  }
});
