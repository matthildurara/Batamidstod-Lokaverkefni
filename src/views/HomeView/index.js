import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  SafeAreaView,
} from "react-native";
import styles from "./styles";
import Toolbar from "../../components/toolBar";
import Footer from "../../components/footer";
//import { createDrawerNavigator } from "@react-navigation/drawer";
//import { NavigationContainer } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [allEvents, setAllEvent] = useState([]);
  const [listOfEvents, setListEvents] = useState({
    "": {
      event: "",
      attendees: "",
    },
  });
  const listE = [];

  const db = getDatabase();
  const dbRef = ref(db, "Users/Event");

  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        console.log(childKey);
        setListEvents((prevState) => ({ ...prevState, childKey }));
        childSnapshot.forEach((childChild) => {
          const childchildKey = childChild.key;
          setListEvents((prevState) => ({
            ...prevState,
            event: childchildKey,
          }));
          const newObj = {
            childKey: {
              name: childchildKey,
            },
          };
          listE.push(newObj);
        });
        //const newList = listOfEvents.concat
        //console.log(childKey.valueOf());
        //listE.push(childKey);
        // setListEvents(childKey);
        console.log("blabla");
        console.log(listE);
        console.log(listOfEvents);
        setAllEvent(allEvents, listOfEvents);
      });
    });
  }, []);
  //console.log(listOfEvents);
  // console.log(listOfEvents);
  console.log("HALLOOO");
  // console.log(listE);
  console.log(allEvents);
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
  const [items, setItems] = useState({
    "2022-04-26": [{ name: "test #2" }],
    "2022-04-25": [{ name: "test #3" }],
  });
  const { currentUser } = useAuthValue();
  console.log("halló");
  const user = currentUser?.providerData[0].email;
  console.log("halló 2 ");

  // console.log(currentUser);
  console.log(user);

  console.log("halló 3 ");
  const renderItem = (items) => {
    return (
      <View>
        <Text>{items.name}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Toolbar style={styles.toolbar} />
      <SafeAreaView style={styles.calander}>
        <Agenda items={items} renderItem={renderItem} />
      </SafeAreaView>

      <Footer style={styles.footer} />
    </View>
  );
};
export default HomeView;
