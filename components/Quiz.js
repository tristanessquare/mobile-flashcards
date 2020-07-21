import React from "react"
import {Text, View} from "react-native"
import {connect} from "react-redux"
import {shuffle} from "../utils/helpers"

class Quiz extends React.Component {

  state = {
    currentQuestion: 0,
    correctAnswers: 0,
  }

  render() {
    return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Quiz component</Text>
              <Text>{this.props.deckName}</Text>
              <Text>{'Correct answers: ' + this.state.correctAnswers}</Text>
            </View>
    )
  }

}

function mapStateToProps(state, {route}) {
  const {deckId} = route.params

  return {
    deckId,
    deckName: state[deckId].deckName,
    shuffledCards: shuffle(state[deckId].cards),
  }
}

export default connect(mapStateToProps)(Quiz)
