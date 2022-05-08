import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useState } from "react";
import Toolbar from "../../components/toolBar";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableHighlight } from "react-native-gesture-handler";
import { AntDesign, MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
  remove,
} from "firebase/database";
import uuid from "react-native-uuid";

const Event = ({ navigation, route }) => {
  const [listOfEvents, setListEvents] = useState({});

  const { navigate } = useNavigation();
  const parameter = route.params.toolbarText;
  const [thisEvent, setEvent] = useState({});
  const [event, setRightEvent] = useState({});
  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "Users/Event");
    async function isEvent() {
      try {
        const value = await AsyncStorage.getItem("Event");
        if (value !== null) {
          // We have data!!
          const parsed = JSON.parse(value);
          console.log("PArsed EVENT: ", JSON.parse(value));
          // console.log("attttttendeeeees: ", parsed.attendees);

          onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const childKey = childSnapshot.key;
              childSnapshot.forEach((childChild) => {
                const childchildKey = childChild.key;
                console.log("CHILDCHIOLD KEY IS; ", childchildKey);
                const childValue = childChild.val();

                if (childchildKey == parsed.eventId) {
                  const item = {
                    name: childValue.name,
                    startTime: childValue.startTime,
                    endTime: childValue.endTime,
                    date: childKey,
                    maxNumber: childValue.maxNumber,
                    attendees: childValue.attendees,
                    description: childValue.description,
                    eventId: childchildKey,
                    staffmember: childValue.staffmember,
                  };
                  setRightEvent(item);
                }
                // return;
                // console.log(item);
                //listOfDay.push(item);
              });
              // setListEvents((prevState) => ({
              //   ...prevState,
              //   [childKey]: listOfDay,
              // }));
            });
          });
        }
      } catch (error) {
        // Error retrieving data
      }
      //await fetchEvent();
    }

    isEvent();

    return;
  }, []);

  const fetchEvent = async () => {
    const db = getDatabase();
    const dbRef = ref(db, "Users/Event");
    console.log("================AAAAAAA=======");
    // setListEvents({});
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        childSnapshot.forEach((childChild) => {
          const childchildKey = childChild.key;
          console.log("CHILDCHIOLD KEY IS; ", childchildKey);
          const childValue = childChild.val();

          if (childchildKey == thisEvent.eventId) {
            const item = {
              name: childValue.name,
              startTime: childValue.startTime,
              endTime: childValue.endTime,
              date: childKey,
              maxNumber: childValue.maxNumber,
              attendees: childValue.attendees,
              description: childValue.description,
              eventId: childchildKey,
              staffmember: childValue.staffmember,
            };
            setRightEvent(item);
          }
          // return;
          // console.log(item);
          //listOfDay.push(item);
        });
        // setListEvents((prevState) => ({
        //   ...prevState,
        //   [childKey]: listOfDay,
        // }));
      });
    });
    return;
  };

  const [thisuser, setUser] = useState("");

  useEffect(() => {
    async function isUser() {
      try {
        const value = await AsyncStorage.getItem("User");
        if (value !== null) {
          // We have data!!

          const val = JSON.parse(value);
          setUser(JSON.parse(value));
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    isUser();
    return;
  }, []);

  const findId = (item) => {
    if (item.attendees) {
      for (var i = 0; i < Object.keys(item.attendees).length; i++) {
        if (Object.values(item.attendees)[i].name === thisuser.name) {
          return Object.keys(item.attendees)[i];
        }
      }
    }
    return 0;
  };
  const checkAttendees = (item) => {
    // console.log("in checkAttendees");
    if (item.attendees) {
      // console.log("in checkAttendees inside  first if");
      if (Object.keys(item.attendees).length > 0) {
        // console.log("in checkAttendees inside  second if");
        //for (var i = 0; i < Object.values(item.attendees).length; i++) {
        // console.log("in checkAttendees inside for ");
        return true;
        //}
      }
    }
    return false;
  };

  const isUserOnEvent = (item) => {
    // console.log("ITEM IS : ");
    // console.log(item);
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
            thisuser.name?.toLowerCase()
          ) {
            const obj = Object.values(item.attendees)[i].name.toLowerCase();
            const us = thisuser.name?.toLowerCase();
            // setListUserEvent((listOfUserEvent) => [...listOfUserEvent, item]);
            return true;
          }
        }
      }
      return false;
    }
  };

  const isEventOver = (eventDate) => {
    console.log(eventDate);
    const today = new Date();
    const date = new Date(eventDate);
    console.log(today);
    console.log(date);
    if (today.setHours(0, 0, 0, 0) <= date.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  };
  const checkItem = (item) => {
    // console.log(item);
    if (item == null || item == "null") {
      // console.log("false");
      return false;
    } else {
      // console.log("true");
      return true;
    }
  };
  const handleOnEvent = async (item) => {
    const db = getDatabase();
    const userId = uuid.v4();
    if (item.attendees) {
      const urlr = `Users/Event/${item.date}/${item.eventId}/attendees/${userId}`;

      set(ref(db, urlr), {
        name: thisuser?.name,
      })
        .then(() => {
          fetchEvent();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const urll = `Users/Event/${item.date}/${item.eventId}/attendees/${userId}`;

      set(ref(db, urll), {
        name: thisuser?.name,
      })
        .then(() => {
          fetchEvent();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    alert("þú hefur verið skráður á viðburð");
    //await fetchEvents();
  };

  const handleOnRemove = (item) => {
    const db = getDatabase();
    const id = findId(item);
    const urls = `Users/Event/${item.date}/${item.eventId}/attendees/${id}/name`;
    remove(ref(db, urls))
      .then(() => {
        fetchEvent();
      })
      .catch((err) => {
        console.log(err);
      });
    alert("þú hefur verið afskráður á viðburð");
  };

  // console.log("THIS EVENT:; ", thisEvent);
  // console.log("=======RIGHT EVENT: ", event);
  return (
    <View>
      <Toolbar toolbarText={parameter} />
      <TouchableHighlight
        style={styles.backButton}
        onPress={() => navigate("Home")}
      >
        <View style={styles.backButtonContainer}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            style={styles.arrow}
          />
          <Text style={styles.textBack}>Til baka </Text>
        </View>
      </TouchableHighlight>
      <View>
        {isEventOver(event.date) ? (
          <View>
            {isUserOnEvent(event) ? (
              <View>
                <TouchableOpacity
                  onPress={() => handleOnRemove(event)}
                  style={styles.eventbutton}
                >
                  <Text>AfSkrá</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={() => handleOnEvent(event)}
                  style={styles.eventbutton}
                >
                  <Text>Skrá</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <Text> Viðburður er búinn</Text>
        )}
      </View>
      <View style={styles.eventContainer}>
        <Text style={styles.eventTitle}> {event.name}</Text>
        <Text style={styles.eventText}> Dagsetning: {event.date}</Text>
        <Text style={styles.eventText}> Byrjar klukkan: {event.startTime}</Text>
        <Text style={styles.eventText}> Endar klukkan: {event.endTime}</Text>
        <Text style={styles.eventText}> Lýsing: {event.description}</Text>
        <Text style={styles.eventText1}> Skráðir á viðburðinn: </Text>
        {checkAttendees(event) ? (
          Object.values(event.attendees).map((item, index) => (
            <View key={index} item={item}>
              {checkItem(item) ? (
                <Text style={styles.eventText2}> {item.name}</Text>
              ) : (
                <></>
              )}
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
