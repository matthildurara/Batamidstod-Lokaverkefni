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
import getAllNotifications from "../../services/notificationServices";
import { getNotif } from "../../services/notificationServices";
const NotificationView = ({ navigation, route }) => {
  const { navigate } = useNavigation();

  const parameter = route.params.toolbarText;
  const db = getDatabase();
  const dbRef = ref(db, "Users/Notifications");
  const [allNotifications, setAllNotifications] = useState([]);

  const numerNotification = useState("");

  // const callNoti = async () => {
  //   console.log(allNotifications);
  //   const noti = await getAllNotifications();
  //   console.log(noti);
  //   return noti;
  // };

  useEffect(() => {
    // async function getNotifications() {
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

    //   console.log(allNotifications);
    //   const noti = await getAllNotifications();
    //   console.log(noti);
    //   setAllNotifications(noti);
    // }
    // getNotifications();
    // const notifi = callNoti();
    // setAllNotifications(notifi);
  }, []);
  console.log("LENGD: ", allNotifications.length);

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
