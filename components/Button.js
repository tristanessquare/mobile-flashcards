import React from "react"
import {StyleSheet, Text, TouchableOpacity} from "react-native"

export default class Button extends React.Component {

  render() {
    return (
            <TouchableOpacity onPress={this.props.onPress} style={this.props.disabled ? styles.disabledButtonContainer : styles.buttonContainer} disabled={this.props.disabled}>
              <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    backgroundColor: "#ffb3b3"
  },
  disabledButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    backgroundColor: "#dedede"
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
