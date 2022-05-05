import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
} from "react-native";
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
          setListEvents((listOfEvents) => [...listOfEvents, item]);
        });
      });
    });
    return;
  };

  useEffect(() => {
    fetchEvents();
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
    try {
      AsyncStorage.setItem("User", JSON.stringify(""));
    } catch (error) {
      console.log(error);
    }
    //await handleSetUSer();
    navigate("Main");
  };

  const handleOnRemove = (item) => {
    const db = getDatabase();
    const id = findId(item);
    const urls = `Users/Event/${item.date}/${item.eventId}/attendees/${id}/name`;
    remove(ref(db, urls))
      .then(() => {
        fetchEvents();
      })
      .catch((err) => {
        console.log(err);
      });
    alert("þú hefur verið afskráður á viðburð");
  };

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

  const isEventOver = (eventDate) => {
    const today = new Date();
    const date = new Date(eventDate);
    if (today.setHours(0, 0, 0, 0) <= date.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
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
            {isUserOnEvent(item) && isEventOver(item.date) ? (
              // {if(item[0].)}

              <View style={styles.eventUserItem}>
                <Text> {item.name}</Text>
                <Text>{item.startTime}</Text>
                <Text>{item.endTime}</Text>

                <View>
                  <TouchableOpacity
                    onPress={() => handleOnRemove(item)}
                    style={styles.eventbutton}
                  >
                    <Text>AfSkrá</Text>
                  </TouchableOpacity>
                </View>
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
