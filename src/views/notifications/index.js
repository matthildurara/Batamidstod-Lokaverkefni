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
  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      onValue(dbRef, (snapshot) => {
        setAllNotifications([]);
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childVal = childSnapshot.val();
          allNotifications[childKey] = [];
          const item = {
            Title: childVal.notificationTitle,
            Notification: childVal.notification,
          };
          setAllNotifications((allNotifications) => [
            ...allNotifications,
            item,
          ]);
        });
      });
    };
    fetchNotifications();
    return;
  }, []);

  return (
    <View style={styles.container}>
      <Toolbar toolbarText={parameter} style={styles.toolbar} />
      <ScrollView>
        <View>
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
        </View>
      </ScrollView>
      <Footer style={styles.footer} />
    </View>
  );
};
export default NotificationView;
