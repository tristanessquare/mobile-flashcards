import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import {AsyncStorage} from 'react-native'
import Constants from 'expo-constants';

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
  if (!Constants.platform.web) {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
            .then(() => Notifications.cancelAllScheduledNotificationsAsync())
  } else {
    return Promise.resolve()
  }

}

function scheduleQuizNotificationIfGranted(status) {
  if (status !== 'granted') {
    return
  }

  Notifications.cancelAllScheduledNotificationsAsync()
          .then(() => Notifications.scheduleNotificationAsync(
                  {
                    content: createNotification(),
                    trigger: {
                      hour: 10,
                      minute: 0,
                      repeats: true,
                    }
                  })
          )
          .then(() => AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true)))
}

export function setLocalNotification() {
  if (!Constants.platform.web) {
    AsyncStorage.getItem(NOTIFICATION_KEY)
            .then(JSON.parse)
            .then((data) => {
              if (data === null) {
                Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
                        .then(({status}) => {
                          if (status !== 'granted') {
                            Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
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
    title: 'Do not forget your daily Quiz!',
    body: "Lets get it on and quiz everything you can!",
    vibrate: true,
    priority: 'high',
  }
}

export function registerNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}
