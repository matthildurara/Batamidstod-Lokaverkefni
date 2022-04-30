import React, { useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableHighlight,
  TextInput,
  Image,
} from "react-native";
import styles from "./styles";
import bata from "../../resources/Bata.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, dbFirestore } from "../../../firebase-config";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuthValue } from "../../../authContext";
import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
} from "firebase/database";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { stringify } from "@firebase/util";

const Event = ({ navigation: { navigate } }) => {
  const [thisEvent, setEvent] = useState({});
  useEffect(() => {
    async function isEvent() {
      try {
        const value = await AsyncStorage.getItem("Event");
        if (value !== null) {
          // We have data!!
          //console.log("PArsed EVENT: ", JSON.parse(value));
          setEvent(JSON.parse(value));
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    isEvent();
  }, []);

  const checkAttendees = (item) => {
    console.log("INSIDE CHECKATTENDEEEEEEEEEEs");
    console.log("ITEM : ", item);
    console.log("attendeees: ", item.attendees);
    console.log("IN THE MIDDDLE");
    //console.log("attendeees length: ", Object.values(item.attendees).length);

    if (item.attendees) {
      console.log("inside if");
      console.log(Object.values(item.attendees).length);
      if (Object.values(item.attendees).length > 1) {
        return true;
      }
    }
    return false;
  };
  return (
    <>
      <View style={styles.eventContainer}>
        <Text style={styles.eventTitle}> {thisEvent.name}</Text>
        <Text style={styles.eventText}> {thisEvent.date}</Text>
        <Text style={styles.eventText}> {thisEvent.startTime}</Text>
        <Text style={styles.eventText}> {thisEvent.endTime}</Text>
        <Text style={styles.eventText}> {thisEvent.description}</Text>
        <Text>Skráðir á viðburðinn: </Text>
        {checkAttendees(thisEvent) ? (
          Object.values(thisEvent.attendees).map((item, index) => (
            <View key={index} item={item}>
              <Text>{item.name}</Text>
            </View>
          ))
        ) : (
          //<Text>Hello </Text>
          <></>
        )}
      </View>
    </>
  );
};
export default Event;
