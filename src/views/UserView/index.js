import React, { useEffect, useState } from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import styles from "./styles";
import Toolbar from "../../components/toolBar";
import Footer from "../../components/footer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
  remove,
} from "firebase/database";

const UserView = ({ navigation, route }) => {
  const { navigate } = useNavigation();

  const parameter = route.params.toolbarText;

  const [listOfEvents, setListEvents] = useState([]);
  const [listOfUserEvent, setListUserEvent] = useState([]);

  const db = getDatabase();
  const dbRef = ref(db, "Users/Event");

  const fetchEvents = async () => {
    onValue(dbRef, (snapshot) => {
      setListEvents([]);
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        childSnapshot.forEach((childChild) => {
          const childchildKey = childChild.key;
          const childValue = childChild.val();

          const item = {
            date: childKey,
            name: childValue.name,
            startTime: childValue.startTime,
            endTime: childValue.endTime,
            staffmember: childValue.staffmember,
            eventId: childValue.eventId,

            attendees: childValue.attendees,
          };
          console.log("ATTENDEES", Object.values(childValue.attendees));
          // if (
          //   !childValue.attendees ||
          //   childValue.attendees == undefined ||
          //   childValue.attendees == ""
          // ) {
          //   for (
          //     var j = 0;
          //     j < Object.values(childValue.attendees.length);
          //     j++
          //   ) {
          //     if (
          //       Object.values(childValue.attendees)[i].name.toLowerCase() ===
          //       user.name?.toLowerCase()
          //     ) {
          //       const obj = Object.values(childValue.attendees)[
          //         i
          //       ].name.toLowerCase();
          //       const us = user.name?.toLowerCase();
          //       setListUserEvent((listOfUserEvent) => [
          //         ...listOfUserEvent,
          //         item,
          //       ]);
          //       //return true;
          //     }
          //   }

          //   // if (isUserOnEvent(item) == true) {
          //   //   setListEvents((listOfEvents) => [...listOfEvents, item]);
          //   // }
          // }
          // if (isUserOnEvent(item) == true) {
          setListEvents((listOfEvents) => [...listOfEvents, item]);
          // }
        });
      });
    });
    return;
  };

  useEffect(() => {
    fetchEvents();
    console.log("LIST OF ALL USER EVENTS");
    console.log(listOfEvents);
    //isUserOnEvent();
    return;
  }, []);
  const [user, setUser] = useState("");
  useEffect(() => {
    async function isUser() {
      try {
        const value = await AsyncStorage.getItem("User");
        if (value !== null) {
          setUser(JSON.parse(value));
        }
      } catch (error) {}
    }
    isUser();
  }, []);
  const handleSetUSer = async () => {
    try {
      AsyncStorage.setItem("User", JSON.stringify(""));
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogOut = async () => {
    await handleSetUSer();
    navigate("Main");
  };

  // const checkEventForUser = () => {
  //   console.log("hallo");
  //   for (var i = 0; i < Object.keys(listOfEvents).length; i++) {
  //     console.log(Object.keys(listOfEvents[i]));
  //   }
  //   // if (isUserOnEvent(item)) {
  // };
  const isUserOnEvent = (item) => {
    console.log("ITEM IS : ");
    console.log(item);
    if (
      !item.attendees ||
      item.attendees == undefined ||
      item.attendees == ""
    ) {
      return false;
    } else {
      for (var i = 0; i < Object.keys(item.attendees).length; i++) {
        for (var j = 0; j < Object.values(item.attendees).length; j++) {
          if (
            Object.values(item.attendees)[i].name.toLowerCase() ===
            user.name?.toLowerCase()
          ) {
            const obj = Object.values(item.attendees)[i].name.toLowerCase();
            const us = user.name?.toLowerCase();
            // setListUserEvent((listOfUserEvent) => [...listOfUserEvent, item]);
            return true;
          }
        }
      }
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <Toolbar toolbarText={parameter} style={styles.toolbar} />
      <View style={styles.calander}></View>
      <Text>{user.name}</Text>
      <TouchableHighlight onPress={handleLogOut} style={styles.logoutbutton}>
        <Text>Log Out</Text>
      </TouchableHighlight>
      <View>
        {Object.values(listOfEvents).map((item, index) => (
          <View key={index} item={item}>
            {isUserOnEvent(item) ? (
              // {if(item[0].)}

              <View style={styles.eventUserItem}>
                <Text> {item.name}</Text>
                <Text>{item.startTime}</Text>
                <Text>{item.endTime}</Text>
              </View>
            ) : (
              <></>
            )}
          </View>
        ))}
      </View>

      <Footer style={styles.footer} />
    </View>
  );
};
export default UserView;
