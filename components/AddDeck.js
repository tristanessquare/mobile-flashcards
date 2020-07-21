import React from "react"
import {StyleSheet, Text, TextInput, View} from "react-native"
import {connect} from "react-redux"
import {uuidv4} from "../utils/helpers"
import {createDeck} from "../utils/api"
import {addDeck} from "../actions"
import Button from "./Button"

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
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 20}}>
              <Text style={styles.label}>Deckname</Text>
              <TextInput onChangeText={this.changeText} value={this.state.deckName} style={styles.input}/>
              <Button text="Add Deck" onPress={this.addDeck} disabled={this.state.deckName === ''}/>
            </View>
    )
  }

}

export default connect()(AddDeck)

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  label: {
    fontSize: 12
  }
});
