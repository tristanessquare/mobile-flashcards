import React from "react"
import {Text, View} from "react-native"
import {connect} from "react-redux"

class DeckDetails extends React.Component {

  render() {
    return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>{'Deckname: ' + this.props.deck.deckName}</Text>
            </View>
    )
  }

}

function mapStateToProps(state, {route}) {
  const {deckId} = route.params

  return {
    deck: state[deckId]
  }
}

export default connect(mapStateToProps)(DeckDetails)
