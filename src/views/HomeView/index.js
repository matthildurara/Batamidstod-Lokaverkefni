import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import styles from "./styles";
import Toolbar from "../../components/toolBar";
import Footer from "../../components/footer";
import { AntDesign, MaterialIcons, Ionicons, FontAwesome, Fontisto, Entypo } from "@expo/vector-icons";
//import CalendarPicker from "react-native-calendar-picker";
import CalendarStrip from "react-native-calendar-strip";
//import WeekSelector from "react-native-week-selector";

//import { createDrawerNavigator } from "@react-navigation/drawer";
//import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dbFirestore } from "../../../firebase-config";
import { getAuth } from "firebase/auth";
import { useAuthValue } from "../../../authContext";
import getAllNotifications from "../../services/notificationServices";
import uuid from "react-native-uuid";
import { Agenda } from "react-native-calendars";
import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
  remove,
} from "firebase/database";
import { useNavigation } from "@react-navigation/native";

import moment from "moment";
//import getAllNotifications from "../../services/notificationServices";

const HomeView = ({ navigation, route }) => {
  const [notificationLength, setNotificationLength] = useState(0);
  const [allNotifications, setAllNotifications] = useState([]);

  // console.log("nvjknavkjnvjkenvkjnrkjtnkrtnjvjrnbkjrnnrk");
  // console.log(allNotifications.length);
  AsyncStorage.setItem(
    "NumberNotifications",
    JSON.stringify(allNotifications.length)
  );
  const { navigate } = useNavigation();
  const parameter = route.params.toolbarText;
  const [reload, setReload] = useState(0);
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

  const [listOfEvents, setListEvents] = useState([]);

  const db = getDatabase();
  const dbRef = ref(db, "Users/Event");

  const fetchEvents = async () => {
    onValue(dbRef, (snapshot) => {
      setListEvents([]);
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        //let listOfDay = [];

        childSnapshot.forEach((childChild) => {
          const childchildKey = childChild.key;
          const childValue = childChild.val();
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
          setListEvents((listOfEvents) => [...listOfEvents, item]);
          // listOfDay.push(item);
          // setListEvents((prevState) => ({
          //   ...prevState,
          //   [childKey]: listOfDay,
          // }));
        });
      });
    });
    return;
  };
  // const [items, setItems] = useState({
  //   "2022-05-03": [{ name: "test #2" }, { name: "test $4" }],
  //   "2022-04-25": [{ name: "test #3" }],
  // });

  useEffect(() => {
    async function getEvents() {
      console.log("Getting new events from the database");

      onValue(dbRef, (snapshot) => {
        setListEvents([]);
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          //let listOfDay = [];

          childSnapshot.forEach((childChild) => {
            const childchildKey = childChild.key;
            const childValue = childChild.val();
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
            setListEvents((listOfEvents) => [...listOfEvents, item]);
            // listOfDay.push(item);
            // setListEvents((prevState) => ({
            //   ...prevState,
            //   [childKey]: listOfDay,
            //}));
          });
        });
      });
    }
    getEvents();
    return;
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "Users/Notifications");

    async function getNotifications() {
      onValue(dbRef, (snapshot) => {
        setAllNotifications([]);
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          childSnapshot.forEach((childChild) => {
            const childchildKey = childChild.key;
            const childValue = childChild.val();

            const item = {
              notification: childValue.notification,
              notificationTitle: childValue.notificationTitle,
            };

            setAllNotifications((allNotifications) => [
              ...allNotifications,
              item,
            ]);
          });
        });
      });
    }

    return getNotifications();
  }, []);

  const handleOnEvent = async (item) => {
    const db = getDatabase();
    const userId = uuid.v4();
    if (item.attendees) {
      const urlr = `Users/Event/${item.date}/${item.eventId}/attendees/${userId}`;

      set(ref(db, urlr), {
        name: thisuser?.name,
      })
        .then(() => {
          //fetchEvents();
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
          //fetchEvents();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    alert("þú hefur verið skráður á viðburð");
    //await fetchEvents();
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

  const findId = (item) => {
    if (item.attendees) {
      for (let i = 0; i < Object.keys(item.attendees).length; i++) {
        if (Object.values(item.attendees)[i].name === thisuser.name) {
          return Object.keys(item.attendees)[i];
        }
      }
    }
    return 0;
  };

  const handleOnRemove = (item) => {
    const db = getDatabase();
    const id = findId(item);
    const urls = `Users/Event/${item.date}/${item.eventId}/attendees/${id}/name`;

    remove(ref(db, urls))
      .then(() => {
        // fetchEvents();
      })
      .catch((err) => {
        console.log(err);
      });

    alert("þú hefur verið afskráður á viðburð");
  };

  const isUserOnEvent = (item) => {
    if (
      !item.attendees ||
      item.attendees == undefined ||
      item.attendees == ""
    ) {
      return false;
    } else {
      for (let i = 0; i < Object.keys(item.attendees).length; i++) {
        for (let j = 0; j < Object.values(item.attendees).length; j++) {
          if (
            Object.values(item.attendees)[i].name.toLowerCase() ===
            thisuser.name?.toLowerCase()
          ) {
            const obj = Object.values(item.attendees)[i].name.toLowerCase();
            const us = thisuser.name?.toLowerCase();
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

  const handlePressEvent = async (item) => {
    console.log("attendees: ", item.attendees);
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
    await AsyncStorage.setItem("Event", JSON.stringify(pressedEvent));
    navigate("Event");
  };

  const today = moment().format("YYYY-MM-DD");

  // const [listOfDay, setListOfDay] = useState(today);
  // console.log("LIST OF ALL EVENTS: ", listOfEvents);
  const [selectedDay, setSelectedDay] = useState(today);

  const dayPress = async (day) => {
    // console.log("Day Pressed: ", day);
    let listDay = [];
    //await fetchEvents();
    const select = moment(day).format("YYYY-MM-DD");
    setSelectedDay(select);

    return;
  };

  const listOfDay = listOfEvents.filter((data) =>
    data.date.includes(selectedDay)
  );
  listOfDay.sort((a, b) =>
    parseInt(a.startTime) > parseInt(b.startTime) ? 1 : -1
  );

  console.log("LIST OF DAY ITEMS : ", listOfDay);
  // const checkDate = (item) => {
  //   // Object.values(listOfEvents).map((item, index) => {
  //   //   console.log(item.date);
  //   // });
  //   // dayItems = [];
  //   // // //console.log("ITEM DATE IS : ", item.date);
  //   // for (let i = 0; i < Object.keys(listOfEvents).length; i++) {
  //   //   if (Object.values(listOfEvents)[i].date == selectedDay) {
  //   //     console.log(Object.values(listOfEvents)[i]);
  //   //     dayItems.push(Object.values(listOfEvents)[i]);
  //   //   }
  //   // }
  //   // console.log(dayItems);

  //   //setListOfDay(dayItems);
  //   //console.log("ITEM DATE IS : ", item.date);
  //   // console.log("SELECTED DATE: ", selectedDay);
  //   if (item.date == selectedDay) {
  //     //console.log("INSIDE IF : ", item.date);
  //     return true;
  //   }
  // };
  //const [dateFormat, setDateFormat] = useState("");
  const getDate = (date) => {
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
    // setDateFormat(monthName);
  };

  return (
    <View style={styles.container}>
      <Toolbar toolbarText={parameter} />
      <View style={styles.homeViewContainer}>
        <View style={styles.calander}>
          <CalendarStrip
            //scrollable={true}
            style={{
              height: 120,
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 8,
              paddingRight: 8,
            }}
            selectedDate={selectedDay}
            // name={"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split(
            //   "_"
            // )}
            // dateNameStyle={"dim._lun._mar._mer._jeu._ven._sam.".split("_")}
            // name'fr',
            daySelectionAnimation={{
              type: "background",
              duration: 200,
              //calendarHeaderStyle
              highlightColor: "#C6DDEC",
              // borderWidth: 1,
              // borderHighlightColor: "blue",
            }}
            onDateSelected={(day) => {
              dayPress(moment(day).format("YYYY-MM-DD"));
            }}
            //calendarColor={"#3343CE"}
          />
        </View>

        <ScrollView style={styles.itemcont}>
          {listOfDay.length != 0 ? (
            <View>
              {Object.values(listOfDay).map((item, index) => (
                <View key={index} item={item}>
                  {/* {checkDate(item) ? ( */}
                  <View
                    style={[
                      styles.eventContainer,
                      { backgroundColor: item.color },
                    ]}
                  >
                    <View style={styles.event}>
                      <TouchableOpacity onPress={() => handlePressEvent(item)}>
                        <View style={styles.eventItemContainer}>
                          <View>
                            {/* <Text> {JSON.stringify(item)}</Text> */}
                            <Text style={styles.itemTitle}>{item.name}</Text>
                            <Text> <Fontisto name="date" size={24} color="black"/> {getDate(item.date)}</Text>
                            <Text> <Ionicons name="time" size={28} color="black"/>{item.startTime} - {item.endTime}</Text>
                            <Text><Entypo name="location-pin" size={28} color="black"/>{item.location}</Text>
                            <Text>  <FontAwesome name="user" size={24} color="black" /> {item.staffmember} </Text> 
                          </View>
                          <View style={styles.arrowRight}>
                            <AntDesign
                              name="doubleright"
                              size={24}
                              color="black"
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                    {isEventOver(item.date) ? (
                      <View>
                        {checkForMax(item) ? (
                          <View>
                            {isUserOnEvent(item) == false ? (
                              <View style={styles.eventButton}>
                                <TouchableOpacity
                                  onPress={() => handleOnEvent(item)}
                                  style={styles.eventbuttonOn}
                                >
                                  <Text>Skrá</Text>
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <View style={styles.eventButton}>
                                <TouchableOpacity
                                  onPress={() => handleOnRemove(item)}
                                  style={styles.eventbuttonOff}
                                >
                                  <Text>AfSkrá</Text>
                                </TouchableOpacity>
                              </View>
                            )}
                          </View>
                        ) : (
                          <View>
                            {isUserOnEvent(item) == false ? (
                              <View style={styles.eventButton}>
                                <Text style={styles.notButton}>
                                  Viðburður fullur
                                </Text>
                              </View>
                            ) : (
                              <View>
                                <TouchableOpacity
                                  onPress={() => handleOnRemove(item)}
                                  style={styles.eventbuttonOff}
                                >
                                  <Text>AfSkrá</Text>
                                </TouchableOpacity>
                              </View>
                            )}
                          </View>
                        )}
                      </View>
                    ) : (
                      <View style={styles.eventButton}>
                        <Text style={styles.notButton}>Viðburður er búinn</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text> Enginn viðburður í dag</Text>
          )}
        </ScrollView>
      </View>
      <Footer numberOfNotifications={allNotifications.length} />
    </View>
  );
};

export default HomeView;
