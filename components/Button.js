import React from "react"
import {StyleSheet, Text, TouchableOpacity} from "react-native"

export default class Button extends React.Component {

  render() {
    return (
            <TouchableOpacity onPress={this.props.onPress} style={styles.button} disabled={this.props.disabled}>
              <Text>{this.props.text}</Text>
            </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10,
  },
});
