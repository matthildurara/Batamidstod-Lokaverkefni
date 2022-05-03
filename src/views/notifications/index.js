import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";
import Toolbar from "../../components/toolBar";
import Footer from "../../components/footer";
import { useNavigation } from "@react-navigation/native";

import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
} from "firebase/database";
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
        console.log("=============MMMMM==========");
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          console.log("CHILDKEU IS ?");
          console.log(childKey);
          childSnapshot.forEach((childChild) => {
            const childchildKey = childChild.key;
            console.log("childchild key: ", childchildKey);
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
  console.log(allNotifications);

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
      <Footer style={styles.footer} />
    </View>
  );
};
export default NotificationView;
