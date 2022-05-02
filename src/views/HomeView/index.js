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
import AsyncStorage from "@react-native-async-storage/async-storage";
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
        if (value !== null) {
          const val = JSON.parse(value);
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
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        childSnapshot.forEach((childChild) => {
          const childchildKey = childChild.key;
          //console.log("CHILDCHILDKEY: ", childchildKey);
          //console.log("CHILD KEY: ", childKey);
          const childValue = childChild.val();
          //console.log("CHILD VALUE name: ", childValue);
          //listOfEvents[childKey] = [];

          const item = [
            {
              name: childValue.name,
              startTime: childValue.startTime,
              endTime: childValue.endTime,
              date: childKey,
              maxNumber: childValue.maxNumber,
              attendees: childValue.attendees,
              description: childValue.description,
              eventId: childchildKey,
              staffmember: childValue.staffmember,
            },
          ];

          setListEvents((prevState) => ({
            ...prevState,
            [childSnapshot.key]: item,
          }));
          //console.log("EFTIR SET LIST EVENTS");
        });
      });
    });
  };

  const [items, setItems] = useState({
    "2022-04-26": [{ name: "test #2" }],
    "2022-04-25": [{ name: "test #3" }],
  });

  useEffect(() => {
    fetchEvents();
    // console.log("LIST OG EVENTS: ");
    // console.log(listOfEvents);
    //return;
  }, []);
  //console.log(listOfEvents);

  const handleOnEvent = async (item) => {
    const db = getDatabase();
    if (item.attendees) {
      const urlr = `Users/Event/${item.date}/${item.eventId}/attendees/${
        Object.keys(item.attendees).length + 1
      }`;

      set(ref(db, urlr), {
        name: thisuser?.name,
      });
      alert("þú hefur verið skráður á viðburð");
    } else {
      const urll = `Users/Event/${item.date}/${item.eventId}/attendees/1`;

      set(ref(db, urll), {
        name: thisuser?.name,
      });
      alert("þú hefur verið skráður á viðburð");
    }
    await fetchEvents();
  };

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
  const handleOnRemove = (item) => {
    const db = getDatabase();
    const id = findId(item);
    console.log(id);
    const urls = `Users/Event/${item.date}/${item.eventId}/attendees/${id}/name`;
    remove(ref(db, urls));
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
      for (var i = 0; i < Object.keys(item.attendees).length; i++) {
        for (var j = 0; j < Object.values(item.attendees).length; j++) {
          if (
            Object.values(item.attendees)[i].name.toLowerCase() ===
            thisuser.name?.toLowerCase()
          ) {
            const obj = Object.values(item.attendees)[i].name.toLowerCase();
            const us = thisuser.name?.toLowerCase();
            return true;
            // }
          }
        }
      }
      return false;
    }
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
    AsyncStorage.setItem("Event", JSON.stringify(pressedEvent));
    navigate("Event");
  };
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

  const renderItem = (item) => {
    return (
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
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Toolbar toolbarText={parameter} style={styles.toolbar} />
      <SafeAreaView style={styles.calander}>
        <Agenda
          items={listOfEvents}
          renderItem={renderItem}
          pastScrollRange={10}
          futureScrollRange={10}
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
