import React, { useEffect, useState } from "react";
import {View, Text, TouchableHighlight, TouchableOpacity, ScrollView} from "react-native";
import {AntDesign, Ionicons, FontAwesome, Fontisto, Entypo} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, onValue, remove } from "firebase/database";

import styles from "./styles";
import Toolbar from "../../components/toolBar";
import Footer from "../../components/footer";

const UserView = ({ navigation, route }) => {
  const { navigate } = useNavigation();

  const parameter = route.params.toolbarText;
  const [listOfEvents, setListEvents] = useState([]);

  const db = getDatabase(); //Getting the database 
  const dbRef = ref(db, "Users/Event"); //Accessing the correct location in the database 

  const fetchEvents = () => {
    onValue(dbRef, (snapshot) => {
      setListEvents([]);
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        let listOfDay = [];
        childSnapshot.forEach((childChild) => {
          const childValue = childChild.val();
          const item = {
            date: childKey,
            name: childValue.name,
            startTime: childValue.startTime,
            endTime: childValue.endTime,
            staffmember: childValue.staffmember,
            eventId: childValue.eventId,
            attendees: childValue.attendees,
            color: childValue.color,
            location: childValue.location,
          };
          listOfDay.push(item);
          parseInt(childValue.startTime);
        });
        listOfDay.sort((a, b) =>
          parseInt(a.startTime) > parseInt(b.startTime) ? 1 : -1
        );
        listOfDay.map((item) => {
          console.log("EACH ITEM: ", item);
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
    getNotificationLength();
    isUser();
    return;
  }, []);

  const [notificationLength, setNotificationLength] = useState(0);

  const getNotificationLength = async () => {
    try {
      const value = await AsyncStorage.getItem("NumberNotifications");
      if (value !== null) {
        // We have data!!
        const parsedData = JSON.parse(value);
        setNotificationLength(parsedData);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleLogOut = async () => {
    // handling when user logs out
    try {
      AsyncStorage.setItem("User", JSON.stringify(""));
    } catch (error) {
      console.log(error);
    }
    navigate("Main");
  };

  const findId = (item) => {
    //finding user id to be able to unsubscribe from event
    if (item.attendees) {
      for (var i = 0; i < Object.keys(item.attendees).length; i++) {
        if (Object.values(item.attendees)[i].name === user.name) {
          return Object.keys(item.attendees)[i];
        }
      }
    }
    return 0;
  };

  const handleOnRemove = (item) => {
    //handling when user unsubscribes from event
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
    //checking if user is attending event
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
          user.name?.toLowerCase()
        ) {
          return true;
        }
      }
      return false;
    }
  };

  const isEventOver = (eventDate) => {
    //checking if event is over
    const today = new Date();
    const date = new Date(eventDate);
    if (today.setHours(0, 0, 0, 0) <= date.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  };

  const getDate = (date) => {
    //changing the format of the date
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
    let d = new Date(date);
    let monthName = months[d.getMonth()];
    let res = date.substring(8, 10);
    return res + ". " + monthName;
  };

  const handlePressEvent = async (item) => {
    // handling when event is pressed
    const pressedEvent = {
      name: item.name,
      date: item.date,
      startTime: item.startTime,
      endTime: item.endTime,
      maxNumber: item.maxNumber,
      description: item.description,
      attendees: item.attendees,
      eventId: item.eventId,
      staffmember: item.staffmember,
      location: item.location,
    };
    await AsyncStorage.setItem("Event", JSON.stringify(pressedEvent)); // saving the pressed event to asyncstorage
    navigate("Event");
  };

  return (
    <View style={styles.container}>
      <Toolbar toolbarText={parameter} />
      <View style={styles.userInformation}>
        <View>
          <Text style={styles.username}>{user.name}</Text>
        </View>
        <View style={styles.logoutbutton}>
          <TouchableHighlight onPress={handleLogOut}>
            <Text>Skrá út</Text>
          </TouchableHighlight>
        </View>
      </View>
      <ScrollView>
        <View style={styles.list}>
          <View>
            {/* Mapping through the list if the events to be able to display them */}
            {Object.values(listOfEvents).map((item, index) => (
              <View key={index} item={item}>
                {isUserOnEvent(item) && isEventOver(item.date) ? (
                  <View
                    style={[
                      styles.eventUserItem,
                      { backgroundColor: item.color },
                    ]}
                  >
                    <TouchableOpacity onPress={() => handlePressEvent(item)}>
                      <View style={styles.eventtextContainer}>
                        <View style={styles.eventUserText}>
                          <Text style={styles.text1}>{item.name}</Text>
                          <Text>
                            {" "}
                            <Fontisto name="date" size={24} color="black" />
                            {"   "} {getDate(item.date)}
                          </Text>
                          <Text>
                            {" "}
                            <Ionicons
                              name="time"
                              size={28}
                              color="black"
                            />{" "}
                            {"  "}
                            {item.startTime} - {item.endTime}
                          </Text>
                          <Text>
                            {" "}
                            <Entypo
                              name="location-pin"
                              size={28}
                              color="black"
                            />{" "}
                            {"  "}
                            {item.location}
                          </Text>
                          <Text>
                            {"  "}
                            <FontAwesome
                              name="user"
                              size={24}
                              color="black"
                            />{" "}
                            {"   "}
                            {item.staffmember}{" "}
                          </Text>
                        </View>

                        <View style={styles.userArrowRight}>
                          <AntDesign
                            name="doubleright"
                            size={24}
                            color="black"
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
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
        </View>
      </ScrollView>
      <Footer numberOfNotifications={notificationLength} />
    </View>
  );
};

export default UserView;
