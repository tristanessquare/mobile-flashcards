import React from "react"
import {StyleSheet, Text, View} from "react-native"
import Button from "./Button"

export default class QuizResult extends React.Component {

  render() {
    return (
            <View style={styles.container}>
              <Text style={styles.headerText}>Quiz Result</Text>
              <Text style={{marginBottom: 20}}>{'Correct answers: ' + this.props.correctAnswers}</Text>

              <Button onPress={this.props.handleClickRestartQuit} text="Restart Quiz"/>
              <Button onPress={this.props.handleClickGoToDeck} text="Go to Deck"/>
            </View>
    )
  }

}

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
