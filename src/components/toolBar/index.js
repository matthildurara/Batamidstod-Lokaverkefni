import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";

const Toolbar = (parameter) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function isUser() {
      try {
        const value = await AsyncStorage.getItem("User");
        if (value !== null) {
          // We have data!!
          console.log(value);
          setUser(value);
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    isUser();
    return;
  }, []);

  return (
    <View styleName="horizontal" style={styles.toolbar}>
      <View style={styles.toolbarActionMenu}></View>
      <View style={styles.toolbarActionName}>
        <Text style={styles.toolbarText}>{parameter.toolbarText}</Text>
        <Text>{user.name}</Text>
      </View>
    </View>
  );
};

export default Toolbar;
