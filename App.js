import React from 'react';
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
              <NavigationContainer>
                <Tab.Navigator
                        screenOptions={({route}) => ({
                          tabBarIcon: ({focused, color, size}) => {
                            let iconName;

                            if (route.name === 'Decks') {
                              iconName = 'ios-apps';
                            } else if (route.name === 'Add Deck') {
                              iconName = 'ios-add-circle-outline';
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
            </Provider>
    )
  }
}


