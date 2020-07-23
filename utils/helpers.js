import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import {AsyncStorage} from 'react-native'
import Constants from 'expo-constants';

export const DECKS_STORAGE_KEY = 'MobileFlashcards:decks'
const QUIZ_COMPLETED_DATE_KEY = 'MobileFlashcards:quizcompleteddate'

export function uuidv4() {
  // https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function storeQuizCompletedDate() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return AsyncStorage.setItem(QUIZ_COMPLETED_DATE_KEY, JSON.stringify(today))
}

async function quizCompletedToday() {
  const quizCompletedDateString = await AsyncStorage.getItem(QUIZ_COMPLETED_DATE_KEY)

  if (!quizCompletedDateString || quizCompletedDateString === '') {
    return false;
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayString = JSON.stringify(today)

  return todayString === quizCompletedDateString
}

function scheduleDailyQuizNotificationIfGranted(status) {
  if (status !== 'granted') {
    return
  }

  Notifications.cancelAllScheduledNotificationsAsync()
          .then(() => Notifications.scheduleNotificationAsync(
                  {
                    content: createNotification(),
                    trigger: {
                      hour: 18,
                      minute: 0,
                      repeats: true,
                    }
                  })
          )
}

export function setLocalNotification() {
  if (Constants.platform.web) {
    return
  }
  Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
          .then(({status}) => {
            if (status !== 'granted') {
              Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
                      .then(({status}) => scheduleDailyQuizNotificationIfGranted(status))
            } else {
              scheduleDailyQuizNotificationIfGranted(status)
            }
          })
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
      shouldShowAlert: !(await quizCompletedToday()),
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}
