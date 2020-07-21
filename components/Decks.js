import React from "react"
import {FlatList, Text, TouchableOpacity, View} from "react-native"
import {connect} from 'react-redux'
import {fetchDecks} from "../utils/api"
import {receiveDecks} from "../actions"

class Decks extends React.Component {

  componentDidMount() {
    const {dispatch} = this.props

    fetchDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
  }

  showDeckDetails = (deckId) => {
    this.props.navigation.navigate(
            'Deck Details',
            {deckId: deckId}
    )
  }

  render() {
    return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <FlatList
                      data={this.props.decks}
                      renderItem={({item}) =>
                              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity onPress={() => {
                                  this.showDeckDetails(item.deckId)
                                }} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                  <Text>{item.deckName}</Text>
                                  <Text>{item.cards.length + ' Cards'}</Text>
                                </TouchableOpacity>
                              </View>
                      }
                      keyExtractor={item => item.deckId}
              />
            </View>
    )
  }

}

function mapStateToProps(state) {
  const decks = Object.keys(state).map(key => {
    return {...state[key], deckId: key}
  })

  return {
    decks,
  }
}

export default connect(mapStateToProps)(Decks)
