import React, { useEffect, useState } from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import styles from "./styles";
import Toolbar from "../../components/toolBar";
import Footer from "../../components/footer";
//import { createDrawerNavigator } from "@react-navigation/drawer";
//import { NavigationContainer } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
//import { auth } from "../../../firebase-config";
import { getAuth } from "firebase/auth";
import { useAuthValue } from "../../../authContext";
import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
} from "firebase/database";

//const Drawer = createDrawerNavigator();

const EducationView = ({ navigation: { navigate } }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async () => {
      const user = await AsyncStorage.getItem("user");
      setUser(JSON.parse(user));
      console.log(user.email);
    };
  });
  // const user = await AsyncStorage.getItem("user");
  // const auth = getAuth();
  // const us = auth.currentUser();
  //const { currentUser } = useAuthValue();
  // console.log("halló");
  // //const user = currentUser?.providerData[0].email;
  // console.log("halló 2 ");

  // console.log(currentUser);
  // console.log(user);

  // console.log("halló 3 ");

  const db = getDatabase();
  const dbRef = ref(db, "Users/EducationMaterial");
  const [allMaterial, setMaterial] = useState({});

  // const setEduMaterial = async () => {
  //   onValue(dbRef, (snapshot) => {
  //     snapshot.forEach((childSnapshot) => {
  //       const childKey = childSnapshot.key;
  //       const childVal = childSnapshot.val();
  //       allMaterial[childKey] = [];
  //       // console.log("KEY: ", childKey);
  //       // console.log(childVal.notification);

  //       allMaterial[childKey].push({
  //         Title: childVal.educMatTitle,
  //         About: childVal.aboutMaterial,
  //         Link: childVal.linkToMaterial,
  //       });
  //     });
  //   });
  // };
  useEffect(() => {
    // async function setMaterial() {
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childVal = childSnapshot.val();
        allMaterial[childKey] = [];
        // console.log("KEY: ", childKey);
        // console.log(childVal.notification);

        allMaterial[childKey].push({
          Title: childVal.educMatTitle,
          About: childVal.aboutMaterial,
          Link: childVal.linkToMaterial,
        });
      });
    });
    // }
    //setMaterial();
  }, [allMaterial]);
  console.log("hallo");
  for (var i = 0; i < Object.values(allMaterial).length; i++) {
    console.log("blala");
    console.log(Object.values(allMaterial)[i][0].Title);
  }

  return (
    <View style={styles.container}>
      <Toolbar style={styles.toolbar} />
      <View style={styles.calander}>
        {Object.values(allMaterial).map((item, index) => (
          <View key={index} item={item} style={styles.educationMatContainer}>
            <Text>{item[0]?.Title}</Text>
            <Text>{item[0]?.About}</Text>
            <Text>Linkur á fræðsluefni: </Text>
            <Text>{item[0]?.Link}</Text>
          </View>
        ))}
        {/* {allNotifications.map((item, index) => {
          <View key={index} item={item}>
            <Text>{item.notification}</Text>
          </View>;
        })} */}
      </View>

      <Footer style={styles.footer} />
    </View>
  );
};
export default EducationView;
