import React, { useEffect } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { useState } from "react";
import Toolbar from "../../components/toolBar";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableHighlight } from "react-native-gesture-handler";
import { AntDesign, MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Event = ({ navigation, route }) => {
  const { navigate } = useNavigation();
  const parameter = route.params.toolbarText;
  const [thisEvent, setEvent] = useState({});
  useEffect(() => {
    async function isEvent() {
      try {
        const value = await AsyncStorage.getItem("Event");
        if (value !== null) {
          // We have data!!
          const parsed = JSON.parse(value);
          console.log("PArsed EVENT: ", JSON.parse(value));
          console.log("attttttendeeeees: ", parsed.attendees);
          setEvent(JSON.parse(value));
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    isEvent();
    return;
  }, []);

  const checkAttendees = (item) => {
    console.log("in checkAttendees");
    if (item.attendees) {
      console.log("in checkAttendees inside  first if");
      if (Object.keys(item.attendees).length > 0) {
        console.log("in checkAttendees inside  second if");
        //for (var i = 0; i < Object.values(item.attendees).length; i++) {
        // console.log("in checkAttendees inside for ");
        return true;
        //}
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
    <View>
      <Toolbar toolbarText={parameter} />
      <TouchableHighlight
        style={styles.backButton}
        onPress={() => navigate("Home")}
      >
        <View>
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text>Til baka </Text>
        </View>
      </TouchableHighlight>
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
    </View>
  );
};
export default Event;
