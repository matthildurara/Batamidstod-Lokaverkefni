import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  }, []);
  return (
    <View styleName="horizontal" style={styles.toolbar}>
      <View style={styles.toolbarActionMenu}>
        {/* <Text>
          <Ionicons name="menu" size={24} color="black" />
        </Text> */}
      </View>
      <View style={styles.toolbarActionName}>
        <Text style={styles.toolbarText}>{parameter.toolbarText}</Text>
        <Text>{user.name}</Text>
      </View>
    </View>
  );
};
export default Toolbar;
