import React from "react"
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native"
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
            <View style={styles.container}>
              <FlatList
                      data={this.props.decks}
                      renderItem={({item}) =>
                              <View style={styles.listItem}>
                                <TouchableOpacity onPress={() => {
                                  this.showDeckDetails(item.deckId)
                                }} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                  <Text style={styles.headerText}>{item.deckName}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    margin: 1,
    padding: 10,
    backgroundColor: "#FFF",
    width: "100%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 2
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 15
  }
});
