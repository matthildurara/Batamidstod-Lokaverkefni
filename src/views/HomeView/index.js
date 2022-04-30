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
import { Agenda } from "react-native-calendars";
import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
  remove,
} from "firebase/database";
import { FirebaseError } from "firebase/app";

//const Drawer = createDrawerNavigator();

const HomeView = ({ navigation: { navigate } }) => {
  const [reload, setReload] = useState(0);
  const [thisuser, setUser] = useState("");

  // const isUser = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("User");
  //     ///console.log("WHAT IS THIS VALUE: ", value);
  //     if (value !== null) {
  //       // We have data!!

  //       console.log("THIS IS THE USER: ", JSON.parse(value));
  //       const val = JSON.parse(value);
  //       console.log(val.name);
  //       setUser(JSON.parse(value));
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  //   return;
  // };

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
  //const thisuser = AsyncStorage.getItem("User");
  //console.log("this user is : ", thisuser);
  const [allAtt, setAllAtt] = useState("");
  // const [listOfEvents, setListEvents] = useState({
  //   "": {
  //     event: "",
  //     attendees: "",
  //   },
  // });
  const [listOfEvents, setListEvents] = useState({});

  const db = getDatabase();
  const dbRef = ref(db, "Users/Event");

  // const getAllEvents = () => {
  //   onValue(dbRef, (snapshot) => {
  //     snapshot.forEach((childSnapshot) => {
  //       const childKey = childSnapshot.key;
  //       listOfEvents[childKey] = [];
  //       //console.log("FYRIRRRRR");
  //       //console.log(listOfEvents);
  //       //listOfEvents[childKey].push({ childSnapshot });
  //       childSnapshot.forEach((childChild) => {
  //         const childchildKey = childChild.key;
  //         const childValue = childChild.val();
  //         // setListEvents((prevState) => ({
  //         //   ...prevState,
  //         //   event: childchildKey,
  //         // }));
  //         let childVal = {};
  //         childVal = {
  //           name: childchildKey,
  //           childValue,
  //         };

  //         listOfEvents[childKey].push({
  //           name: childchildKey,
  //           startTime: childValue.startTime,
  //           endTime: childValue.endTime,
  //           date: childKey,
  //           maxNumber: childValue.maxNumber,
  //           attendees: childValue.attendees,
  //           description: childValue.description,
  //         });
  //       });
  //     });
  //   });
  // };

  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        listOfEvents[childKey] = [];
        //console.log("FYRIRRRRR");
        //console.log(listOfEvents);
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
            maxNumber: childValue.maxNumber,
            attendees: childValue.attendees,
            description: childValue.description,
          });
        });
      });
    });
    console.log("THIS IS ALL EVENTS: ");
    console.log(listOfEvents);
  });
  //console.log(listOfEvents);
  // console.log(listOfEvents);
  //console.log("HALLOOO");
  //console.log(listOfEvents);
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

  const handleOnEvent = async (item) => {
    const db = getDatabase();
    if (item.attendees) {
      const urlr = `Users/Event/${item.date}/${item.name}/attendees/${
        Object.keys(item.attendees).length + 1
      }`;

      set(ref(db, urlr), {
        name: thisuser?.name,
      });

      alert("þú hefur verið skráður á viðburð");
    } else {
      const urll = `Users/Event/${item.date}/${item.name}/attendees/1`;

      set(ref(db, urll), {
        name: thisuser?.name,
      });

      alert("þú hefur verið skráður á viðburð");
    }

    // const starCountRef = ref(
    //   db,
    //   "Users/" + "Event/" + item.date + "/" + item.name + "/" + "Attendees"
    // );
    // //console.log("email here " + newEmail);

    //setReload(1);
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
    // console.log("HE ID IS: ", id);
    const urls = `Users/Event/${item.date}/${item.name}/attendees/${id}/name`;
    remove(ref(db, urls));
    //setReload(0);
  };
  const [items, setItems] = useState({
    "2022-04-26": [{ name: "test #2" }],
    "2022-04-25": [{ name: "test #3" }],
  });
  // const isUserOnEvent = async (item) => {
  //   // console.log("IS THIS USER EVENT : ");
  //   // // const us = await isUser();
  //   // console.log(item);
  //   // console.log("THIS IS THE USERRRRRRR: ", thisuser);
  //   if (
  //     !item.attendees ||
  //     item.attendees == undefined ||
  //     item.attendees == ""
  //   ) {
  //     console.log("not in if");
  //     return false;
  //     //return false;
  //   } else {
  //     for (var i = 0; i < Object.keys(item.attendees).length; i++) {
  //       // console.log("objectvalue: ", Object.values(item.attendees));
  //       for (var j = 0; j < Object.values(item.attendees).length; j++) {
  //         console.log(
  //           "this is the value: ",
  //           Object.values(item.attendees)[i].name
  //         );
  //         console.log("THIS IS THE USER: ", thisuser.name);
  //         if (
  //           Object.values(item.attendees)[i].name.toLowerCase() ===
  //           thisuser.name?.toLowerCase()
  //         ) {
  //           console.log("KOMST INN Í");
  //           // console.log(Object.values(item.attendees)[i]);

  //           const obj = Object.values(item.attendees)[i].name.toLowerCase();
  //           const us = thisuser.name?.toLowerCase();
  //           // console.log(obj);
  //           // console.log(us);
  //           return true;
  //           // }
  //         }
  //       }
  //     }
  //     console.log("not in for");
  //     return false;
  //   }
  // };

  const isUserOnEvent = (item) => {
    // console.log("IS THIS USER EVENT : ");
    // // const us = await isUser();
    // console.log(item);
    // console.log("THIS IS THE USERRRRRRR: ", thisuser);
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
        // console.log("objectvalue: ", Object.values(item.attendees));
        for (var j = 0; j < Object.values(item.attendees).length; j++) {
          // console.log(
          //   "this is the value: ",
          //   Object.values(item.attendees)[i].name
          // );
          // console.log("THIS IS THE USER: ", thisuser.name);
          if (
            Object.values(item.attendees)[i].name.toLowerCase() ===
            thisuser.name?.toLowerCase()
          ) {
            // console.log("KOMST INN Í");
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

  const handlePressEvent = (item) => {
    const pressedEvent = {
      name: item.name,
      date: item.date,
      startTime: item.startTime,
      endTime: item.endTime,
      maxNumber: item.maxNumber,
      description: item.description,
      attendees: item.attendees,
    };
    // console.log("ATTENDES BEFORE ASYNC ");
    // console.log(item.attendees);
    AsyncStorage.setItem("Event", JSON.stringify(pressedEvent));
    navigate("Event");
  };

  const renderItem = (item) => {
    //console.log(item);
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
          </TouchableOpacity>
        </View>
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
