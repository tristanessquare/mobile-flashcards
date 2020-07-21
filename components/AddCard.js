import React from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {connect} from "react-redux"
import {createCard} from "../utils/api"
import {addCard} from "../actions"
import Button from "./Button"

class AddCard extends React.Component {

  state = {
    question: '',
    answer: '',
  }

  changeTextQuestion = (text) => {
    this.setState((oldState) => ({
      ...oldState,
      question: text
    }))
  }

  changeTextAnswer = (text) => {
    this.setState((oldState) => ({
      ...oldState,
      answer: text
    }))
  }

  addCard = () => {
    const {deckId} = this.props.route.params
    const card = {question: this.state.question, answer: this.state.answer}
    createCard({deckId, card})
            .then(() => this.props.dispatch(addCard(deckId, card)))
            .then(() => this.props.navigation.navigate('Deck Details', {params: {deckId}}))
  }

  render() {
    return (
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center', padding: 20}}>
              <Text style={styles.label}>Question</Text>
              <TextInput label="Question" onChangeText={this.changeTextQuestion} value={this.state.question} style={styles.input}/>

              <Text style={styles.label}>Answer</Text>
              <TextInput label="Answer" onChangeText={this.changeTextAnswer} value={this.state.answer} style={styles.input}/>

              <Button text="Add Card" onPress={this.addCard} disabled={this.state.question === '' || this.state.answer === ''}/>
            </View>
    )
  }

}

export default connect()(AddCard)

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10
  },
  label: {
    fontSize: 12
  }
});


