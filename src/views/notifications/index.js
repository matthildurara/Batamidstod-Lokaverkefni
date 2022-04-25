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

//const Drawer = createDrawerNavigator();

const NotificationView = ({ navigation: { navigate } }) => {
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
  const { currentUser } = useAuthValue();
  console.log("halló");
  const user = currentUser?.providerData[0].email;
  console.log("halló 2 ");

  // console.log(currentUser);
  console.log(user);

  console.log("halló 3 ");

  return (
    <View style={styles.container}>
      <Toolbar style={styles.toolbar} />
      <View style={styles.calander}>
        <Text>Notifications</Text>
      </View>

      <Footer style={styles.footer} />
    </View>
  );
};
export default NotificationView;
