import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import styles from "./styles";
import Toolbar from "../../components/toolBar";
import Footer from "../../components/footer";
//import { createDrawerNavigator } from "@react-navigation/drawer";
//import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dbFirestore } from "../../../firebase-config";
import { getAuth } from "firebase/auth";
import { useAuthValue } from "../../../authContext";
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

const HomeView = ({ navigation, route }) => {
  const { navigate } = useNavigation();
  const parameter = route.params.toolbarText;
  const [reload, setReload] = useState(0);
  const [thisuser, setUser] = useState("");

  useEffect(() => {
    async function isUser() {
      try {
        const value = await AsyncStorage.getItem("User");
        // console.log("WHAT IS THIS VALUE: ", value);
        if (value !== null) {
          // We have data!!

          //console.log("THIS IS THE USER: ", JSON.parse(value));
          const val = JSON.parse(value);
          //console.log(val.name);
          setUser(JSON.parse(value));
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    isUser();
  }, []);
  const [listOfEvents, setListEvents] = useState({});

  const db = getDatabase();
  const dbRef = ref(db, "Users/Event");

  const fetchEvents = async () => {
    console.log("================AAAAAAA=======");
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        let listOfDay = [];

        childSnapshot.forEach((childChild) => {
          const childchildKey = childChild.key;
          console.log("CHILDCHILDKEY: ", childchildKey);
          console.log("CHILD KEY: ", childKey);
          const childValue = childChild.val();
          console.log("CHILD VALUE name: ", childValue);
          //listOfEvents[childKey] = [];

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

          listOfDay.push(item);
          console.log("insideforfor");
          console.log(listOfDay);
        });
        console.log("insideFIRST FOR ");
        console.log(listOfDay);
        setListEvents((prevState) => ({
          ...prevState,
          [childKey]: listOfDay,
        }));
        console.log("EFTIR SET LIST EVENTS");
        console.log(listOfEvents);
      });
    });
    console.log("AL LIST ================================: ");
    console.log(listOfEvents);
  };

  const [items, setItems] = useState({
    "2022-05-03": [{ name: "test #2" }, { name: "test $4" }],
    "2022-04-25": [{ name: "test #3" }],
  });

  useEffect(() => {
    fetchEvents();
    console.log("AL LIST: ");
    console.log(listOfEvents);
  }, []);

  const handleOnEvent = async (item) => {
    const db = getDatabase();
    const userId = uuid.v4();
    if (item.attendees) {
      const urlr = `Users/Event/${item.date}/${item.eventId}/attendees/${userId}`;

      set(ref(db, urlr), {
        name: thisuser?.name,
      });
      fetchEvents();

      alert("þú hefur verið skráður á viðburð");
    } else {
      const urll = `Users/Event/${item.date}/${item.eventId}/attendees/1`;

      set(ref(db, urll), {
        name: thisuser?.name,
      });

      alert("þú hefur verið skráður á viðburð");
    }

    await fetchEvents();

    // const starCountRef = ref(
    //   db,
    //   "Users/" + "Event/" + item.date + "/" + item.name + "/" + "Attendees"
    // );
    // //console.log("email here " + newEmail);

    //setReload(1);
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
      for (var i = 0; i < Object.keys(item.attendees).length; i++) {
        if (Object.values(item.attendees)[i].name === thisuser.name) {
          // console.log("USER AND OVJECT");
          // console.log("USER: ", thisuser);
          // console.log("OBJECT: ", Object.values(item.attendees)[i].name);
          return Object.keys(item.attendees)[i];
        }
      }
    }
    return 0;
  };
  const handleOnRemove = (item) => {
    const db = getDatabase();
    const id = findId(item);
    console.log(id);
    const urls = `Users/Event/${item.date}/${item.eventId}/attendees/${id}/name`;
    remove(ref(db, urls));
    //fetchEvents();
    // console.log("blablablalblbalbalblla");
    // console.log(item.attendees);
    alert("þú hefur verið afskráður á viðburð");
    //setReload(0);
  };

  const isUserOnEvent = (item) => {
    if (
      !item.attendees ||
      item.attendees == undefined ||
      item.attendees == ""
    ) {
      // console.log("not in if");
      return false;
      //return false;
    } else {
      for (var i = 0; i < Object.keys(item.attendees).length; i++) {
        console.log("first for");
        // console.log("objectvalue: ", Object.values(item.attendees));
        for (var j = 0; j < Object.values(item.attendees).length; j++) {
          //console.log("this is the value: ", Object.values(item.attendees));
          console.log("THIS IS THE USER: ", thisuser.name);
          if (
            Object.values(item.attendees)[i].name.toLowerCase() ===
            thisuser.name?.toLowerCase()
          ) {
            console.log("KOMST INN Í");
            // console.log(Object.values(item.attendees)[i]);

            const obj = Object.values(item.attendees)[i].name.toLowerCase();
            const us = thisuser.name?.toLowerCase();
            // console.log(obj);
            // console.log(us);
            return true;
            // }
          }
        }
      }
      // console.log("not in for");
      return false;
    }
  };
  //const [dayValue, setDay] = useState("");
  const isEventOver = (eventDate) => {
    //console.log(eventDate);

    const today = new Date();
    const date = new Date(eventDate);
    if (today.setHours(0, 0, 0, 0) <= date.setHours(0, 0, 0, 0)) {
      return true;
    }
    console.log("date", date);
    console.log("today", today);
    return false;
  };
  const handlePressEvent = (item) => {
    console.log("======ÖÖÖÖÖ======");
    console.log(item.name);
    console.log(item.date);
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
    };
    // console.log("ATTENDES BEFORE ASYNC ");
    // console.log(item.attendees);
    AsyncStorage.setItem("Event", JSON.stringify(pressedEvent));
    navigate("Event");
  };

  const renderItem = (item) => {
    console.log(
      "ONE ITEM =============FREFERFEGRGER=========================== "
    );
    console.log("ONE ITEM ");
    console.log(item);
    //console.log(dayValue);
    return (
      // {item.date==}
      <>
        <View style={styles.event}>
          <TouchableOpacity onPress={() => handlePressEvent(item)}>
            <Text>{item.name}</Text>
            <Text>{item.startTime}</Text>
            <Text>{item.endTime}</Text>
            <Text>{item.date}</Text>
            <Text>{item.staffmember}</Text>
          </TouchableOpacity>
        </View>
        {checkForMax(item) ? (
          <View>
            {isEventOver(item.date) ? (
              <View>
                {isUserOnEvent(item) == false ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => handleOnEvent(item)}
                      style={styles.eventbutton}
                    >
                      <Text>Skrá</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity
                      onPress={() => handleOnRemove(item)}
                      style={styles.eventbutton}
                    >
                      <Text>AfSkrá</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : (
              <Text>Viðburður er búinn</Text>
            )}
          </View>
        ) : (
          <View>
            {isUserOnEvent(item) == false ? (
              <View>
                <Text>Viðburður fullur</Text>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={() => handleOnRemove(item)}
                  style={styles.eventbutton}
                >
                  <Text>AfSkrá</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </>
    );
  };

  // const changeDay = (day) => {

  // }

  return (
    <View style={styles.container}>
      <Toolbar style={styles.toolbar} />
      <SafeAreaView style={styles.calander}>
        <Agenda
          items={listOfEvents}
          //items={items}
          renderItem={renderItem}
          // renderDay={(day, item) => {
          //   return (
          //     <View>
          //       <Text>{day}</Text>
          //     </View>
          //   );
          // }}
          renderEmptyDate={() => {
            return (
              <View>
                <Text>No events</Text>
              </View>
            );
          }}
          renderEmptyData={() => {
            return (
              <View>
                <Text>No events</Text>
              </View>
            );
          }}
          // onDayPress={(day) => {
          //   // console.log("selected day", day);
          //   const date = day.dateString;
          //   //setDay(date);
          //   console.log(date);
          // }}
        />
      </SafeAreaView>

      <Footer style={styles.footer} />
    </View>
  );
};
export default HomeView;
