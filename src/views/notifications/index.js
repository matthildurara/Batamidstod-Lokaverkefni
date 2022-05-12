import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, onValue } from "firebase/database";

import styles from "./styles";
import Toolbar from "../../components/toolBar";
import Footer from "../../components/footer";

const NotificationView = ({ navigation, route }) => {
  const { navigate } = useNavigation();

  const parameter = route.params.toolbarText;
  const db = getDatabase();
  const dbRef = ref(db, "Users/Notifications");
  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "Users/Notifications");
    async function getNotifications() {
      onValue(dbRef, (snapshot) => {
        setAllNotifications([]);
        snapshot.forEach((childSnapshot) => {
          childSnapshot.forEach((childChild) => {
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

  return (
    <View style={styles.container}>
      <Toolbar toolbarText={parameter} style={styles.toolbar} />
      <ScrollView>
        <View style={styles.list}>
          {Object.values(allNotifications).map((item, index) => (
            <View key={index} item={item} style={styles.notificationContainer}>
              <Text>{item.notificationTitle}</Text>
              <Text>{item.notification}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <Footer numberOfNotifications={allNotifications?.length} />
    </View>
  );
};

export default NotificationView;
