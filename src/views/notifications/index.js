import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";
import Toolbar from "../../components/toolBar";
import Footer from "../../components/footer";

import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
} from "firebase/database";
const NotificationView = ({ navigation, route }) => {
  const parameter = route.params.toolbarText;
  const db = getDatabase();
  const dbRef = ref(db, "Users/Notifications");
  //const [allNotifications, setAllNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState({});

  const fetchNotifications = async () => {
    onValue(dbRef, (snapshot) => {
      setAllNotifications([]);
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        childSnapshot.forEach((childChild) => {
          const childchildKey = childChild.key;
          const childValue = childChild.val();

          const item = [
            {
              name: childchildKey,
              notification: childValue.notification,
              notificationTitle: childValue.notificationTitle,
            },
          ];

          setAllNotifications(
            (prevState) => ({
              ...prevState,
              [childSnapshot.key]: item,
            })
          );
        });
      });
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     onValue(dbRef, (snapshot) => {
  //       setAllNotifications([]);
  //       snapshot.forEach((childSnapshot) => {
  //         const childKey = childSnapshot.key;
  //         const childVal = childSnapshot.val();
  //         allNotifications[childKey] = [];
  //         const item = {
  //           Title: childVal.notificationTitle,
  //           Notification: childVal.notification,
  //         };
  //         setAllNotifications((allNotifications) => [
  //           ...allNotifications,
  //           item,
  //         ]);
  //       });
  //     });
  //   };
  //   fetchNotifications();
  //   return;
  // }, []);

  const renderItem = (item) => {
    //console.log(item);
    //console.log(dayValue);
    return (
      // {item.date==}
        <View style={styles.notificationContainer}>
            <Text>{item.notificationTitle}</Text>
            <Text>{item.notification}</Text>
        </View>
 

    );
  };

  return (
    <View style={styles.container}>
      <Toolbar toolbarText={parameter} style={styles.toolbar} />
      <ScrollView>
        <View 
        items={allNotifications}
        renderItem={renderItem}>
        </View>
        {/* <View>
          {allNotifications &&
            allNotifications.map((item, index) => (
              <View
                key={index}
                item={item}
                style={styles.notificationContainer}
              >
                <Text>{item.Title}</Text>
                <Text>{item.Notification}</Text>
              </View>
            ))}
        </View> */}
      </ScrollView>
      <Footer style={styles.footer} />
    </View>
  );
};
export default NotificationView;
