import React from "react"
import {connect} from "react-redux"
import QuizAnswer from "./QuizAnswer"
import QuizResult from "./QuizResult"
import QuizQuestion from "./QuizQuestion"

class Quiz extends React.Component {

  state = {
    currentView: 'Question',
    currentQuestion: 0,
    correctAnswers: 0,
  }

  showAnswer = () => {
    this.setState((oldState) => ({
      ...oldState,
      showAnswer: true,
      currentView: 'Answer'
    }))
  }

  markAsCorrect = () => {
    this.setState((oldState) => ({
      ...oldState,
      correctAnswers: oldState.correctAnswers + 1,
      showAnswer: false,
      currentQuestion: oldState.currentQuestion === this.props.cards.length - 1 ? oldState.currentQuestion : oldState.currentQuestion + 1,
      currentView: oldState.currentQuestion === this.props.cards.length - 1 ? 'Result' : 'Question',
    }))
  }

  markAsIncorrect = () => {
    this.setState((oldState) => ({
      ...oldState,
      showAnswer: false,
      currentQuestion: oldState.currentQuestion === this.props.cards.length - 1 ? oldState.currentQuestion : oldState.currentQuestion + 1,
      currentView: oldState.currentQuestion === this.props.cards.length - 1 ? 'Result' : 'Question',
    }))
  }

  reset = () => {
    this.setState({
      currentView: 'Question',
      currentQuestion: 0,
      correctAnswers: 0,
    })
  }

  goToDeck = () => {
    this.props.navigation.navigate(
            'Deck Details',
            {
              deckId: this.props.deckId,
            }
    )
  }

  render() {
    const currentCard = this.props.cards[this.state.currentQuestion]

    if (this.state.currentView === 'Answer') {
      return <QuizAnswer deckName={this.props.deckName} answer={currentCard.answer} handleClickCorrect={this.markAsCorrect} handleClickIncorrect={this.markAsIncorrect}/>
    } else if (this.state.currentView === 'Question') {
      return <QuizQuestion deckName={this.props.deckName} question={currentCard.question} handleClickShowAnswer={this.showAnswer}/>
    } else {
      return <QuizResult correctAnswers={this.state.correctAnswers} handleClickRestartQuit={this.reset} handleClickGoToDeck={this.goToDeck}/>
    }
  }

}

function mapStateToProps(state, {route}) {
  const {deckId} = route.params

  return {
    deckId,
    deckName: state[deckId].deckName,
    cards: state[deckId].cards,
  }
}

export default connect(mapStateToProps)(Quiz)
