import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "./styles";
import Toolbar from "../../components/toolBar";
import Footer from "../../components/footer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
  remove,
} from "firebase/database";

const UserView = ({ navigation, route }) => {
  const { navigate } = useNavigation();

  const parameter = route.params.toolbarText;

  const [listOfEvents, setListEvents] = useState([]);
  const [listOfUserEvent, setListUserEvent] = useState([]);

  const db = getDatabase();
  const dbRef = ref(db, "Users/Event");

  const fetchEvents = () => {
    onValue(dbRef, (snapshot) => {
      setListEvents([]);
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        let listOfDay = [];
        childSnapshot.forEach((childChild) => {
          const childchildKey = childChild.key;
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
          };
          listOfDay.push(item);
          parseInt(childValue.startTime);
        });
        listOfDay.sort((a, b) =>
          parseInt(a.startTime) > parseInt(b.startTime) ? 1 : -1
        );
        //for (var i = 0; i < listOfDay?.length; i++) {
        listOfDay.map((item) => {
          console.log("EACH ITEM: ", item);
          setListEvents((listOfEvents) => [...listOfEvents, item]);
        });
      });
    });
    console.log("===============LISTOFEVENTS===============");
    console.log(listOfEvents);
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
      console.log("inside try before asyncstore");

      const value = await AsyncStorage.getItem("NumberNotifications");
      console.log("inside Try after asyncstore");
      console.log(value);
      console.log("value: ", JSON.parse(value));
      if (value !== null) {
        console.log("inside If");

        // We have data!!

        console.log("value: ", value);
        const parsedData = JSON.parse(value);
        console.log("parsedValue: ", parsedData);
        setNotificationLength(parsedData);
        //return parsedData;
      }
    } catch (error) {
      console.log("error: ", error);
      // Error retrieving data
    }
  };

  const handleLogOut = async () => {
    try {
      AsyncStorage.setItem("User", JSON.stringify(""));
    } catch (error) {
      console.log(error);
    }
    //await handleSetUSer();
    navigate("Main");
  };

  const findId = (item) => {
    if (item.attendees) {
      for (var i = 0; i < Object.keys(item.attendees).length; i++) {
        if (Object.values(item.attendees)[i].name === user.name) {
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
    console.log("ITEM IS : ");
    console.log(item);
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
            user.name?.toLowerCase()
          ) {
            const obj = Object.values(item.attendees)[i].name.toLowerCase();
            const us = user.name?.toLowerCase();
            // setListUserEvent((listOfUserEvent) => [...listOfUserEvent, item]);
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

  return (
    <View style={styles.container}>
      <Toolbar toolbarText={parameter} />
      <View style={styles.userInformation}>
        <View>
          <Text style={styles.username}>{user.name}</Text>
        </View>
        <View style={styles.logoutbutton}>
          <TouchableHighlight
            onPress={handleLogOut}
            // style={styles.logoutbutton}
          >
            <Text>Log Out</Text>
          </TouchableHighlight>
        </View>
      </View>
      <ScrollView>
        <View style={styles.list}>
          <View>
            {Object.values(listOfEvents).map((item, index) => (
              <View key={index} item={item}>
                {isUserOnEvent(item) && isEventOver(item.date) ? (
                  // {if(item[0].)}

                  <View
                    style={[
                      styles.eventUserItem,
                      { backgroundColor: item.color },
                    ]}
                    //style={styles.eventUserItem}
                  >
                    <View style={styles.eventUserText}>
                      <Text style={styles.text}> {item.name}</Text>
                      <Text style={styles.text}> {item.date}</Text>

                      <Text style={styles.text}>
                        {" "}
                        Byrjar klukkan: {item.startTime}
                      </Text>
                      <Text style={styles.text}>
                        {" "}
                        Endar klukkan: {item.endTime}
                      </Text>
                      <Text style={styles.text}> {item.staffmember}</Text>
                    </View>

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
    // <View style={styles.container}>
    //   <Toolbar toolbarText={parameter} style={styles.toolbar} />
    //   {/* <View> */}
    //   <Text>{user.name}</Text>
    //   <TouchableHighlight onPress={handleLogOut} style={styles.logoutbutton}>
    //     <Text>Log Out</Text>
    //   </TouchableHighlight>
    //   {/* </View> */}
    //   <View>
    //     {Object.values(listOfEvents).map((item, index) => (
    //       <View key={index} item={item}>
    //         {isUserOnEvent(item) && isEventOver(item.date) ? (
    //           // {if(item[0].)}

    //           <View style={styles.eventUserItem}>
    //             <Text> {item.name}</Text>
    //             <Text>{item.startTime}</Text>
    //             <Text>{item.endTime}</Text>

    //             <View>
    //               <TouchableOpacity
    //                 onPress={() => handleOnRemove(item)}
    //                 style={styles.eventbutton}
    //               >
    //                 <Text>AfSkrá</Text>
    //               </TouchableOpacity>
    //             </View>
    //           </View>
    //         ) : (
    //           <></>
    //         )}
    //       </View>
    //     ))}
    //   </View>

    //   <Footer />
    // </View>
  );
};
export default UserView;
