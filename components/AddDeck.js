import React from "react"
import {Text, TextInput, TouchableOpacity, View} from "react-native"
import {connect} from "react-redux"
import {uuidv4} from "../utils/helpers"
import {createDeck} from "../utils/api"
import {addDeck} from "../actions"

class AddDeck extends React.Component {

  state = {
    deckName: ''
  }

  changeText = (text) => {
    this.setState((oldState) => ({
      deckName: text
    }))
  }

  addDeck = () => {
    const deck = {deckName: this.state.deckName, deckId: uuidv4()}
    createDeck(deck)
            .then(() => this.props.dispatch(addDeck(deck.deckName, deck.deckId)))
            .then(() => this.setState({
              deckName: ''
            }))
            .then(() => this.props.navigation.navigate('Decks', {screen: 'Deck Details', params: {deckId: deck.deckId}}))
  }

  render() {
    return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TextInput onChangeText={this.changeText} value={this.state.deckName}/>
              <TouchableOpacity onPress={this.addDeck} disabled={this.state.deckName === ''}>
                <Text>Add Deck</Text>
              </TouchableOpacity>
            </View>
    )
  }

}

export default connect()(AddDeck)
