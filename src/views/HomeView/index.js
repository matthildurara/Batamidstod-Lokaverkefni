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
import getAllNotifications from "../../../services/notificationServices";
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
  const [listOfEvents, setListEvents] = useState({});

  const db = getDatabase();
  const dbRef = ref(db, "Users/Event");

  const fetchEvents = async () => {
    // console.log("================AAAAAAA=======");
    setListEvents({});
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        let listOfDay = [];

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
          };
          listOfDay.push(item);
        });
        setListEvents((prevState) => ({
          ...prevState,
          [childKey]: listOfDay,
        }));
      });
    });
    return;
  };

  const [items, setItems] = useState({
    "2022-05-03": [{ name: "test #2" }, { name: "test $4" }],
    "2022-04-25": [{ name: "test #3" }],
  });

  useEffect(() => {
    fetchEvents();
    return;
  }, []);
  const [notificationLength, setNotificationLength] = useState(0);
  const [allNotifications, setAllNotifications] = useState([]);

  // useEffect(() => {
  //   const db = getDatabase();
  //   const dbRef = ref(db, "Users/Notifications");
  //   async function getNotifications() {
  //     setNotificationLength(0);
  //     onValue(dbRef, (snapshot) => {
  //       // console.log("=============MMMMM==========");
  //       snapshot.forEach((childSnapshot) => {
  //         const childKey = childSnapshot.key;
  //         console.log("CHILDKEU IS ?");
  //         console.log(childKey);
  //         childSnapshot.forEach((childChild) => {
  //           const childchildKey = childChild.key;
  //           console.log("===================AAAA=========AAAA");
  //           console.log(childchildKey);

  //           setNotificationLength(notificationLength + 1);
  //         });
  //       });
  //     });
  //     AsyncStorage.setItem(
  //       "NumberNotifications",
  //       JSON.stringify(notificationLength)
  //     );
  //   }
  //   getNotifications();
  //   return;
  // }, []);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "Users/Notifications");
    async function getNotifications() {
      onValue(dbRef, (snapshot) => {
        setAllNotifications([]);
        // console.log("=============MMMMM==========");
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          // console.log("CHILDKEU IS ?");
          // console.log(childKey);
          childSnapshot.forEach((childChild) => {
            const childchildKey = childChild.key;
            // console.log("childchild key: ", childchildKey);
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
    //console.log(allNotifications);
  }, []);

  console.log("nvjknavkjnvjkenvkjnrkjtnkrtnjvjrnbkjrnnrk");
  console.log(allNotifications.length);
  AsyncStorage.setItem(
    "NumberNotifications",
    JSON.stringify(allNotifications.length)
  );

  const handleOnEvent = async (item) => {
    const db = getDatabase();
    const userId = uuid.v4();
    if (item.attendees) {
      const urlr = `Users/Event/${item.date}/${item.eventId}/attendees/${userId}`;

      set(ref(db, urlr), {
        name: thisuser?.name,
      })
        .then(() => {
          fetchEvents();
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
          fetchEvents();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    alert("þú hefur verið skráður á viðburð");
    await fetchEvents();
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
  const handlePressEvent = (item) => {
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
        />
      </SafeAreaView>

      <Footer
        numberOfNotifications={allNotifications.length}
        style={styles.footer}
      />
    </View>
  );
};
export default HomeView;
