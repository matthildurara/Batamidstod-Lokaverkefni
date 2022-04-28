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
//import { auth } from "../../../firebase-config";
import { getAuth } from "firebase/auth";
import { useAuthValue } from "../../../authContext";
import { Agenda } from "react-native-calendars";
import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
} from "firebase/database";
import { FirebaseError } from "firebase/app";

//const Drawer = createDrawerNavigator();

const HomeView = ({ navigation: { navigate } }) => {
  const [thisuser, setUser] = useState("");
  useEffect(() => {
    async function isUser() {
      try {
        const value = await AsyncStorage.getItem("User");
        if (value !== null) {
          // We have data!!
          console.log(value);
          setUser(value);
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    isUser();
  }, []);
  //const thisuser = AsyncStorage.getItem("User");
  //console.log("this user is : ", thisuser);
  const [allEvents, setAllEvent] = useState([]);
  // const [listOfEvents, setListEvents] = useState({
  //   "": {
  //     event: "",
  //     attendees: "",
  //   },
  // });
  const [listOfEvents, setListEvents] = useState({});

  const [newEvents, setNewEvents] = useState([]);

  console.log();

  const listE = [];

  const db = getDatabase();
  const dbRef = ref(db, "Users/Event");

  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        //console.log("childSnapshot", childSnapshot);
        const childKey = childSnapshot.key;
        //console.log("child key");
        // console.log(childKey);
        //setListEvents((prevState) => ({ ...prevState, childKey }));
        listOfEvents[childKey] = [];
        console.log("FYRIRRRRR");
        console.log(listOfEvents);
        //listOfEvents[childKey].push({ childSnapshot });
        childSnapshot.forEach((childChild) => {
          const childchildKey = childChild.key;
          const childValue = childChild.val();
          // setListEvents((prevState) => ({
          //   ...prevState,
          //   event: childchildKey,
          // }));
          let childVal = {};
          childVal = {
            name: childchildKey,
            childValue,
          };
          listOfEvents[childKey].push({
            name: childchildKey,
            startTime: childValue.startTime,
            endTime: childValue.endTime,
            date: childKey,
            attendees: childValue.Attendees,
          });
          // childChild.forEach((childvalue) => {
          //   listOfEvents[childKey].push({
          //     startTime: childvalue,
          //   });
          // });
          // const newObj = {
          //   childKey: {
          //     name: childchildKey,
          //   },
          // };
          // listE.push(newObj);
        });
        //const newList = listOfEvents.concat
        //console.log(childKey.valueOf());
        //listE.push(childKey);
        // setListEvents(childKey);
        //console.log("blabla");
        //console.log(listE);
        // console.log(listOfEvents);
        // setAllEvent(allEvents, listOfEvents);
      });
    });
  }, []);
  //console.log(listOfEvents);
  // console.log(listOfEvents);
  console.log("HALLOOO");
  console.log(listOfEvents);
  // console.log(listE);
  //console.log(allEvents);
  // const [user, setUser] = useState({});
  // useEffect(() => {
  //   async () => {
  //     const user = await AsyncStorage.getItem("user");
  //     console.log(user.email);
  //   };
  // }, []);
  // const user = await AsyncStorage.getItem("user");
  // const auth = getAuth();
  // const us = auth.currentUser();
  // useEffect(() => {
  //   async function getEvents() {
  //     try {
  //       // const db = getDatabase();
  //       await FirebaseError
  //         .ref(db, "Users/" + "Event")
  //         .on("value", (dataSnapshot) => {
  //           dataSnapshot.forEach((child) => {
  //             listE.push(child);
  //           });
  //         });
  //     } catch (error) {
  //       alert(error);
  //     }
  //   }

  //   // console.log("data");
  //   // console.log(starCountRef);
  //   // starCountRef.toJSON();
  //   // setListEvents(starCountRef);
  //   getEvents();
  //   console.log(listE);
  // }, []);

  //console.log(listOfEvents);
  // onValue(starCountRef, (snapshot) => {
  //   console.log("data");
  //   console.log(data);
  //   const data = snapshot.val();
  //   //updateStarCount(postElement, data);
  //   // console.log("data");
  //   // console.log("data" + data);
  // });

  const handleOnEvent = (item) => {
    const db = getDatabase();
    const starCountRef = ref(
      db,
      "Users/" + "Event/" + item.date + "/" + item.name + "/" + "Attendees"
    );
    //console.log("email here " + newEmail);
    set(
      ref(
        db,
        "Users/" + "Event/" + item.date + "/" + item.name + "/" + "Attendees"
      ),
      {
        name: thisuser,
      }
    );
    alert("þú hefur verið skráður á viðburð");
  };
  const [items, setItems] = useState({
    "2022-04-26": [{ name: "test #2" }],
    "2022-04-25": [{ name: "test #3" }],
  });
  const { currentUser } = useAuthValue();
  //console.log("halló");
  const user = currentUser?.providerData[0].email;
  const isUserOnEvent = (item) => {
    for (var i = 0; i < item.attendees?.length; i++) {
      console.log(item.attendees[i].name);
      if (item.attendees[i].name === thisuser) {
        return false;
      }
    }
    return true;
  };

  const renderItem = (item) => {
    // console.log(item);
    return (
      <View style={styles.event}>
        <Text>{item.name}</Text>
        <Text>{item.startTime}</Text>
        <Text>{item.endTime}</Text>
        <Text>{item.date}</Text>
        {isUserOnEvent(item) ? (
          <TouchableOpacity
            onPress={() => handleOnEvent(item)}
            style={styles.eventbutton}
          >
            <Text>Skrá</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            //onPress={() => handleOnEvent(item)}
            style={styles.eventbutton}
          >
            <Text>Af Skrá</Text>
          </TouchableOpacity>
        )}
        {/* <TouchableHighlight>skrá</TouchableHighlight> */}
        {/* <TouchableHighlight>skrá</TouchableHighlight> */}
        {/* <Text>{items.dateTime}</Text> */}

        {/* <Text>{DateTime.fromISO(items.dateTime).toFormat('HH:mm')}</Text> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Toolbar style={styles.toolbar} />
      <SafeAreaView style={styles.calander}>
        <Agenda
          items={listOfEvents}
          renderItem={renderItem}
          // renderDay={(day, item) => {
          //   return (
          //     <View>
          //       <Text>Test</Text>
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
          onDayPress={(day) => {
            // console.log("selected day", day);
            const date = day.dateString;
            console.log(date);
          }}
        />
      </SafeAreaView>

      <Footer style={styles.footer} />
    </View>
  );
};
export default HomeView;
