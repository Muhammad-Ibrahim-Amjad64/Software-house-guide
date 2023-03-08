// FCM(firebase cloud messaging) IS USED TO SEND PUSH NOTIFICATIONS TO ANDROID

// APNS IS USED TO SEND NOTIFICATION TO IOS 


// Working with local notification

// Understanding push notification

// Example send + handle push notification

//------------------------------------------------------------------------
// Local Notification
//-----------------------------------------------------------------------


// * Notifications that are triggered by the installed apps for the local device

// * Not Sent to any other user or devices

// * No server is involved


// * useful in sending 1.Reminder, 2.Alaram, 3.todo notifications
// Means time related notifications ( sheduling ) type notifications -> local notifications are used

//---------------------------------------------------------
// Side note
//----------------------------------------------------------

// Implementing notifications in non expo is very complex so in real world notifications with expo are mostly used

// Expo go apps does not require to crenditional configuration but if you want to build an app and publish an app to playstore then you have to configre

// VISIT THIS PAGE
// https://docs.expo.dev/versions/latest/sdk/notifications/

// * npx expo install expo-notifications    -- step 1

// * paste the plugins in the app.json from expo notifications   -- step 2


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button} from 'react-native';
import * as Notifications from "expo-notifications"    // --- step 3 
// import { Button } from 'react-native';

Notifications.setNotificationHandler({   // step 6
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});


export default function App() {

  const sheduleNotificationsHandler = () => {
    console.log("hello")

    Notifications.scheduleNotificationAsync(     // step 5 
      {
        content:{

          title: "Wrong",
          body: "You are very ",
          data: {userName:"max"}
        },
        trigger: {
          seconds:5
        }
      }

    )
  }
  return (
    <View style={styles.container}>
          <Button title='remind me after 5 seconds' onPress={sheduleNotificationsHandler}></Button>        
          {/*  step 4  */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// * When the notificaition is tapped then it will automatically open the app

// * But we can also react or execute the code by using addNotificationListner() this function is called whenever the the notification is received successfully


// FINAL CODE IMPLEMENTATION OF LOCAL NOTIFICATION =========

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button} from 'react-native';
import * as Notifications from "expo-notifications"    // --- step 3 
import { useEffect } from 'react';
// import { Button } from 'react-native';

Notifications.setNotificationHandler({   // step 6
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});


export default function App() {

                                            
  useEffect(() => {   //  step 7
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      // * Ye wala function jb trigger ho ga jb notification receiceive ho jaa a gi 
       console.log("Notification is received successfully")
       console.log(notification.request.content.data.userName)
    })

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
        // Ye wala function jb trigger ho ga jb notification pr user tap kry ga 
      console.log("Notification is response received successfully")
      console.log(response.notification.request.content.data.userName)
    })

    return () => {
      subscription1.remove()
      subscription2.remove()
    }
  },[])

  const sheduleNotificationsHandler = () => {
    console.log("hello")

    Notifications.scheduleNotificationAsync(     // step 5 
      {
        content:{

          title: "Wrong",
          body: "You are very Allah hu akbar  ",
          data: {userName:"MY data that is used further"}
        },
        trigger: {
          seconds:5
        }
      }

    )
  }
  return (
    <View style={styles.container}>
          <Button title='remind me after 5 seconds' onPress={sheduleNotificationsHandler}></Button>        
          {/*  step 4  */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



//---------------------------------------------------------------------------
// Push notification
//---------------------------------------------------------------------------

// But of course you also often wanna talk
// to other instances of the app installed on other devices
// by other users.
// And that's where Push Notifications come into play.
// Because Push Notifications in the end allow you
// to push important, guess what?
// Notifications, so important messages in the end
// to other devices to notify users of something
// and this something could be a chat message
// but it could also be a marketing message
// sent by the owner of the app to all users of the app.
// That would be another example
// for a Push Notification as well.

// * To send a push notification you have to send an http request to the push notification server

// * you can send a push notification request either from the backend if the event is occured in the backend or either from the frontend ( directly from inside of your app )



// * Request permission is only for IOS


// ----------------------------------------------------------------
// About push tokens ==== Unique for every device

// And we will get a ExpoPushToken,
// which we can use with Expo's push notifications server
// to be precise, which is that server
// to which we can send requests
// to have push notifications delivered
// to multiple devices.


// In publishing on a real device you have to accesss permissions in your app code atleast on IOS


//-------------------------------------------
// Introducing push notification tool
//-------------------------------------------

// https://expo.dev/notifications

// You can send push notification by using push token of the specific device in which your app is installed

// *  Paste the push token including ExponentPushToken == then msg title == testing done

// * it is the backend that decides whether you send push notification to a single device or multiple devices


