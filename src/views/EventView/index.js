import React, { useEffect } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Event = ({ navigation: { navigate } }) => {
  const [thisEvent, setEvent] = useState({});
  useEffect(() => {
    async function isEvent() {
      try {
        const value = await AsyncStorage.getItem("Event");
        if (value !== null) {
          // We have data!!
          console.log("PArsed EVENT: ", JSON.parse(value));
          setEvent(JSON.parse(value));
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    isEvent();
  }, []);

  const checkAttendees = (item) => {
    // console.log("INSIDE CHECKATTENDEEEEEEEEEEs");
    console.log("ITEM : ", item);
    console.log("attendeees: ", item.attendees);
    // console.log("IN THE MIDDDLE");
    //console.log("attendeees length: ", Object.values(item.attendees).length);

    if (item.attendees) {
      // console.log("inside if");
      // console.log(Object.values(item.attendees).length);
      if (Object.values(item.attendees).length > 1) {
        for (var i = 0; i < Object.values(item.attendees).length; i++) {
          // console.log("NAAAAAMMMMEE");
          // console.log(Object.values(item?.attendees)[i].name);
          return true;
        }
      }
    }
    return false;
  };

  const checkItem = (item) => {
    console.log(item);
    if (item == null || item == "null") {
      console.log("false");
      return false;
    } else {
      console.log("true");
      return true;
    }
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
              {checkItem(item) ? <Text>{item.name}</Text> : <></>}
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
