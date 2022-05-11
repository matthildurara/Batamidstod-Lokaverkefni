import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { useState } from "react";
import Toolbar from "../../components/toolBar";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  FontAwesome,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";
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
  //const [listOfEvents, setListEvents] = useState({});

  const { navigate } = useNavigation();
  const parameter = route.params.toolbarText;
  const [thisEvent, setEvent] = useState({});
  const [event, setRightEvent] = useState({});

  useEffect(() => {
    //setRightEvent({});
    const db = getDatabase();
    const dbRef = ref(db, "Users/Event");
    async function isEvent() {
      try {
        const value = await AsyncStorage.getItem("Event");
        if (value !== null) {
          // We have data!!
          const parsed = JSON.parse(value);

          onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const childKey = childSnapshot.key;
              console.log("CHILDKEY DATE IA : ", childKey);
              childSnapshot.forEach((childChild) => {
                const childchildKey = childChild.key;
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
                    color: childValue.color,
                    location: childValue.location,
                  };
                  console.log("ITEM DATE IS : ", item.date);
                  setRightEvent(item);
                }
              });
            });
          });
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    console.log("EVENT DATE IS : ", event.date);
    isEvent();

    return;
  }, []);

  const fetchEvent = async () => {
    const db = getDatabase();
    const dbRef = ref(db, "Users/Event");
    try {
      const value = await AsyncStorage.getItem("Event");
      if (value !== null) {
        // We have data!!
        const parsed = JSON.parse(value);
        onValue(dbRef, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            childSnapshot.forEach((childChild) => {
              const childchildKey = childChild.key;
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
                  color: childValue.color,
                  location: childValue.location,
                };
                setRightEvent(item);
              }
            });
          });
        });
      }
    } catch (error) {
      // Error retrieving data
    }
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
    //checking if item has any attendees
    if (item.attendees && item.attendees != "") {
      if (Object.keys(item.attendees).length > 0) {
        return true;
      }
    }
    return false;
  };

  const isUserOnEvent = (item) => {
    //checking if this user is on this event
    if (
      !item.attendees ||
      item.attendees == undefined ||
      item.attendees == ""
    ) {
      return false;
    } else {
      for (var i = 0; i < Object.keys(item.attendees).length; i++) {
        if (
          Object.values(item.attendees)[i].name.toLowerCase() ===
          thisuser.name?.toLowerCase()
        ) {
          return true;
        }
      }
      return false;
    }
  };

  const isEventOver = (eventDate) => {
    console.log(eventDate);
    const today = new Date();
    const date = new Date(eventDate);

    if (today.setHours(0, 0, 0, 0) <= date.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  };
  const checkItem = (item) => {
    if (!item || item == null || item == "null") {
      return false;
    } else {
      return true;
    }
  };

  const checkForMax = (item) => {
    if (item.attendees) {
      if (item.attendees == "") {
        return true;
      }

      if (Object.keys(item.attendees).length >= item.maxNumber) {
        return false;
      } else {
        return true;
      }
    }
    return true;
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
          //fetchEvent();
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
          //fetchEvent();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    alert("þú hefur verið skráður á viðburð");
  };

  const handleOnRemove = (item) => {
    const db = getDatabase();
    const id = findId(item);
    const urls = `Users/Event/${item.date}/${item.eventId}/attendees/${id}/name`;

    remove(ref(db, urls))
      .then(() => {
        //fetchEvent();
      })
      .catch((err) => {
        console.log(err);
      });

    alert("þú hefur verið afskráður á viðburð");
  };
  const getDate = (evedate) => {
    if (evedate) {
      console.log("EVENT IS : ", event);
      console.log("EVEDATE IS : ", evedate);
      var months = [
        "janúar",
        "febrúar",
        "mars",
        "apríl",
        "maí",
        "júní",
        "júlí",
        "ágúst",
        "september",
        "október",
        "nóvember",
        "desember",
      ];
      //let dateStr = toString(event.date);
      let d = new Date(evedate);
      // var datePosted = new Date(post.publish_date).toString();
      let monthName = months[d.getMonth()];

      let res = evedate.slice(8, 10);
      return res + ". " + monthName;
    }
    //return res + ". " + monthName;
    // setDateFormat(monthName);
  };
  // console.log("event date");
  // console.log(event.date);

  return (
    <View>
      <Toolbar toolbarText={parameter} />
      <View style={styles.buttonEventView}>
        <View>
          <TouchableHighlight
            style={styles.backButton}
            onPress={() => navigation.goBack()}
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
        </View>
        <View style={styles.buttonView}>
          {isEventOver(event.date) ? (
            <View>
              {checkForMax(event) ? (
                <View>
                  {isUserOnEvent(event) ? (
                    <View>
                      <TouchableOpacity
                        onPress={() => handleOnRemove(event)}
                        style={styles.eventbuttonOff}
                      >
                        <Text style={styles.buttonText}>AfSkrá</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <TouchableOpacity
                        onPress={() => handleOnEvent(event)}
                        style={styles.eventbuttonOn}
                      >
                        <Text style={styles.buttonText}>Skrá</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ) : (
                <View>
                  {isUserOnEvent(event) == false ? (
                    <View style={styles.eventButton}>
                      <Text style={styles.notButton}>Viðburður fullur</Text>
                    </View>
                  ) : (
                    <View>
                      <TouchableOpacity
                        onPress={() => handleOnRemove(event)}
                        style={styles.eventbuttonOff}
                      >
                        <Text style={styles.buttonText}>AfSkrá</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </View>
          ) : (
            <Text style={styles.noButton}> Viðburður er búinn</Text>
          )}
        </View>
      </View>
      <View>
        <ScrollView>
          <View
            style={[styles.eventContainer, { backgroundColor: event.color }]}
          >
            {/* <Text style={styles.eventTitle}> {event.name}</Text>
            <Text style={styles.eventText}> Dagsetning: {event.date}</Text>
            <Text style={styles.eventText}>
              {" "}
              Byrjar klukkan: {event.startTime}
            </Text>
            <Text style={styles.eventText}>
              {" "}
              Endar klukkan: {event.endTime}
            </Text>
            <Text style={styles.eventText}> Staðsetning: {event.location}</Text> */}
            <Text style={styles.eventTitle}>{event.name}</Text>
            <Text>
              <Text style={styles.eventText}>
                <Fontisto name="date" size={24} color="black" />
                {"    "}
                {getDate(event?.date)}
              </Text>
            </Text>

            <Text style={styles.iconNameCont}>
              <Text style={styles.eventText}>
                <Ionicons name="time" size={28} color="black" /> {"  "}
                {event.startTime} - {event.endTime}
              </Text>
            </Text>

            <Text style={styles.iconNameCont}>
              <Text style={styles.eventText}>
                <Entypo
                  style={styles.eventIcon}
                  name="location-pin"
                  size={28}
                  color="black"
                />{" "}
                {"  "}
                {event.location}
              </Text>
            </Text>

            <Text style={styles.iconNameCont}>
              <Text style={styles.eventText}>
                {" "}
                <FontAwesome
                  style={styles.eventIcon}
                  name="user"
                  size={27}
                  color="black"
                />
                {"    "}
                {event.staffmember}
              </Text>
            </Text>
            <Text style={styles.iconNameCont}>
              <Text style={styles.eventIcon}>
                <MaterialIcons name="description" size={27} color="black" />
              </Text>
              <Text style={styles.eventText}>
                {"   "}
                {event.description}
              </Text>
            </Text>
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
              <></>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Event;
