import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import {AsyncStorage} from 'react-native'
import * as Constants from "expo-constants"

export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'
const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export function uuidv4() {
  // https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// see UdaciFitness App
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
          .then(() => {
            if (Constants.default.isDevice) {
              return Notifications.cancelAllScheduledNotificationsAsync()
            }
          })
}

function scheduleQuizNotificationIfGranted(status) {
  if (status !== 'granted') {
    return
  }

  Notifications.cancelAllScheduledNotificationsAsync()
          .then(() => {
            return Notifications.scheduleNotificationAsync(
                    {
                      content: createNotification(),
                      trigger: {
                        repeats: true,
                        seconds: 120,
                      }
                    }
            )
          })
          .then(() => AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true)))
}

export function setLocalNotification() {
  if (Constants.default.isDevice) {
    AsyncStorage.getItem(NOTIFICATION_KEY)
            .then(JSON.parse)
            .then((data) => {
              if (data === null) {
                Permissions.getAsync(Permissions.NOTIFICATIONS)
                        .then(({status}) => {
                          if (status !== 'granted') {
                            Permissions.askAsync(Permissions.NOTIFICATIONS)
                                    .then(({status}) => scheduleQuizNotificationIfGranted(status))
                          } else {
                            scheduleQuizNotificationIfGranted(status)
                          }
                        })

              }
            })
  }
}

function createNotification() {
  return {
    title: 'Do your daily Quiz!',
    body: "Please do your daily quiiiiizzzz!",
    sound: true,
    vibrate: true,
    priority: 'high',
  }
}
