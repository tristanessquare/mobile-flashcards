import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {View} from 'react-native';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Decks from "./components/Decks"
import DeckDetails from "./components/DeckDetails"
import AddDeck from "./components/AddDeck"
import Quiz from "./components/Quiz"
import {purple} from "./utils/colors"
import {Ionicons} from '@expo/vector-icons'

const DecksStack = createStackNavigator();
const Tab = createBottomTabNavigator();

class DecksStackScreen extends React.Component {
  render() {
    return (
            <DecksStack.Navigator>
              <DecksStack.Screen name="Decks" component={Decks}/>
              <DecksStack.Screen name="Deck Details" component={DeckDetails}/>
              <DecksStack.Screen name="Add Deck" component={AddDeck}/>
              <DecksStack.Screen name="Quiz" component={Quiz}/>
            </DecksStack.Navigator>
    )
  }
}

export default class App extends React.Component {
  render() {
    return (
            <Provider store={createStore(reducer)}>
              <View style={{flex: 1}}>
                <NavigationContainer>
                  <Tab.Navigator
                          screenOptions={({route}) => ({
                            tabBarIcon: ({focused, color, size}) => {
                              let iconName;

                              if (route.name === 'Decks') {
                                iconName = 'file-tray-stacked-outline';
                              } else if (route.name === 'Add Deck') {
                                iconName = 'add-circle-outline';
                              }

                              return <Ionicons name={iconName} size={size} color={color}/>;
                            },
                          })}
                          tabBarOptions={{
                            activeTintColor: 'tomato',
                            inactiveTintColor: 'gray',
                          }}
                  >
                    <Tab.Screen name="Decks" component={DecksStackScreen}/>
                    <Tab.Screen name="Add Deck" component={AddDeck}/>
                  </Tab.Navigator>
                </NavigationContainer>
                <StatusBar translucent backgroundColor={purple} style={"light"}/>
              </View>
            </Provider>
    )
  }
}

