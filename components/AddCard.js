import React from 'react'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import {connect} from "react-redux"
import {createCard} from "../utils/api"
import {addCard} from "../actions"

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
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <TextInput onChangeText={this.changeTextQuestion} value={this.state.question}/>
              <TextInput onChangeText={this.changeTextAnswer} value={this.state.answer}/>

              <TouchableOpacity onPress={this.addCard} disabled={this.state.question === '' || this.state.answer === ''}>
                <Text>Add Card</Text>
              </TouchableOpacity>
            </View>
    )
  }

}

export default connect()(AddCard)
