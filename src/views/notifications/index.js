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
  //const [allNotifications, setAllNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);

  // const fetchNotifications = async () => {
  //   onValue(dbRef, (snapshot) => {
  //     //setAllNotifications([]);
  //     console.log("=============MMMMM==========");
  //     snapshot.forEach((childSnapshot) => {
  //       const childKey = childSnapshot.key;
  //       console.log("CHILDKEU IS ?");
  //       console.log(childKey);
  //       childSnapshot.forEach((childChild) => {
  //         const childchildKey = childChild.key;
  //         console.log("childchild key: ", childchildKey);
  //         const childValue = childChild.val();

  //         const item = {
  //           notification: childValue.notification,
  //           notificationTitle: childValue.notificationTitle,
  //         };

  //         console.log("ITEM IS: ", item);
  //         // setAllNotifications((prevState) => ({
  //         //   ...prevState,
  //         //   [childSnapshot.key]: item,
  //         // }));
  //         setAllNotifications((allNotifications) => [
  //           ...allNotifications,
  //           item,
  //         ]);
  //         let newArray = [...allNotifications];
  //         newArray.slice().reverse();
  //         console.log("NEEEW ARRAY: ", newArray);
  //         setAllNotifications(newArray);
  //       });
  //     });
  //   });
  // };

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
  // console.log("ALL NOT");
  // console.log(Object.values(allNotifications));

  // const renderItem = (item) => {
  //   //console.log(item);
  //   //console.log(dayValue);
  //   return (
  //     // {item.date==}
  //     <View style={styles.notificationContainer}>
  //       <Text>{item.notificationTitle}</Text>
  //       <Text>{item.notification}</Text>
  //     </View>
  //   );
  // };
  //console.log(allNotifications);
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
