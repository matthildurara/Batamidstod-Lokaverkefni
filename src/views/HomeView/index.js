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

//const Drawer = createDrawerNavigator();

const HomeView = async () => {
  // const [user, setUser] = useState({});
  // useEffect(() => {
  //   async () => {
  //     const user = await AsyncStorage.getItem("user");
  //     console.log(user.email);
  //   };
  // }, []);
  // const user = await AsyncStorage.getItem("user");
  //const auth = getAuth();
  const user = auth().currentUser?.email;
  console.log(user);

  return (
    <View style={styles.container}>
      <Toolbar style={styles.toolbar} />
      <View style={styles.calander}>
        <Text>Dagatal</Text>
      </View>

      <Footer style={styles.footer} />
    </View>
  );
};
export default HomeView;
