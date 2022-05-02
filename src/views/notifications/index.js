import React, { useEffect, useState } from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import styles from "./styles";
import Toolbar from "../../components/toolBar";
import Footer from "../../components/footer";
//import { createDrawerNavigator } from "@react-navigation/drawer";
//import { NavigationContainer } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
//import { auth } from "../../../firebase-config";
import { getAuth } from "firebase/auth";
import { useAuthValue } from "../../../authContext";
import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
} from "firebase/database";

//const Drawer = createDrawerNavigator();

const NotificationView = ({ navigation: { navigate } }) => {
  // const [user, setUser] = useState({});
  // useEffect(() => {
  //   async () => {
  //     const user = await AsyncStorage.getItem("user");
  //     console.log(user.email);
  //   };
  // }, []);
  // const user = await AsyncStorage.getItem("user");
  // const auth = getAuth();
  // const us = auth.currentUser();
  //const { currentUser } = useAuthValue();
  // console.log("halló");
  // //const user = currentUser?.providerData[0].email;
  // console.log("halló 2 ");

  // console.log(currentUser);
  // console.log(user);

  // console.log("halló 3 ");

  const db = getDatabase();
  const dbRef = ref(db, "Users/Notifications");
  // const [allNotifications, setNotificationsData] = useState({});
  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    console.log("==============");
    console.log("USE EFFECT");
    async function fetchNotifications() {
      onValue(dbRef, (snapshot) => {
        console.log("FIREBASE CALL");
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childVal = childSnapshot.val();
          allNotifications[childKey] = [];
          // console.log("KEY: ", childKey);
          // console.log(childVal.notification);

          console.log("pusha inn allNotification");

          const item = {
            Title: childVal.notificationTitle,
            Notification: childVal.notification,
          };

          setAllNotifications((allNotifications) => [
            ...allNotifications,
            item,
          ]);
        });
      });
    }

    console.log("setNotification");
    fetchNotifications();
  }, []);

  // console.log("hallo");
  // for (var i = 0; i < Object.values(allNotifications).length; i++) {
  //   console.log("blala");
  //   console.log(Object.values(allNotifications)[i][0].Notification);
  // }

  return (
    <View style={styles.container}>
      <Toolbar style={styles.toolbar} />
      <View style={styles.calander}>
        {allNotifications &&
          allNotifications.map((item, index) => (
            <View key={index} item={item} style={styles.notificationContainer}>
              <Text>{item.Title}</Text>
              <Text>{item.Notification}</Text>
            </View>
          ))}

        {/* {Object.values(allNotifications).map((item, index) => (
          <View key={index} item={item} style={styles.notificationContainer}>
            <Text>{item[0].Title}</Text>
            <Text>{item[0].Notification}</Text>
          </View>
        ))} */}

        {/* <Text>{JSON.stringify(allNotifications)}</Text> */}

        {/* {allNotifications.map((item, index) => {
          <View key={index} item={item}>
            <Text>{item.notification}</Text>
          </View>;
        })} */}

        {/* <Text>HGALLOOO</Text> */}
      </View>

      <Footer style={styles.footer} />
    </View>
  );
};
export default NotificationView;
