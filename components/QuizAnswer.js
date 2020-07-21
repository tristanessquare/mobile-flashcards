import React from "react"
import {StyleSheet, Text, View} from "react-native"
import Button from "./Button"

export default class QuizAnswer extends React.Component {

  render() {
    return (
            <View style={styles.container}>
              <Text style={[{marginBottom: 20}, styles.headerText]}>{this.props.answer}</Text>
              <Button onPress={this.props.handleClickCorrect} text="I was correct"/>
              <Button onPress={this.props.handleClickIncorrect} text="I failed"/>
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
