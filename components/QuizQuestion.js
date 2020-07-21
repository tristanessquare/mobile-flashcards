import React from "react"
import {StyleSheet, Text, View} from "react-native"
import Button from "./Button"

export default class QuizQuestion extends React.Component {

  render() {
    return (
            <View style={styles.container}>
              <Text style={styles.headerText}>{this.props.question}</Text>
              <Button onPress={this.props.handleClickShowAnswer} text="Show Answer"/>
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
