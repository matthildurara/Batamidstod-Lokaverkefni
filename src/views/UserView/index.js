import React, { useEffect, useState } from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import styles from "./styles";
import Toolbar from "../../components/toolBar";
import Footer from "../../components/footer";

import AsyncStorage from "@react-native-async-storage/async-storage";

const UserView = ({ navigation: { navigate } }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function isUser() {
      try {
        const value = await AsyncStorage.getItem("User");
        if (value !== null) {
          // We have data!!
          console.log(JSON.parse(value).name);
          setUser(JSON.parse(value));
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    isUser();
  }, []);

  const handleSetUSer = async () => {
    try {
      AsyncStorage.setItem("User", JSON.stringify(""));
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogOut = async () => {
    await handleSetUSer();
    navigate("Main");
  };
  return (
    <View style={styles.container}>
      <Toolbar style={styles.toolbar} />
      <View style={styles.calander}></View>
      <Text>{user.name}</Text>
      <TouchableHighlight onPress={handleLogOut} style={styles.logoutbutton}>
        <Text>Log Out</Text>
      </TouchableHighlight>

      <Footer style={styles.footer} />
    </View>
  );
};
export default UserView;
