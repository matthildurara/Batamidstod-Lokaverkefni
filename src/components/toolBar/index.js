import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";

const Toolbar = () => {
  return (
    <View styleName="horizontal" style={styles.toolbar}>
      <View style={styles.toolbarActionMenu}>
        {/* <Text>
          <Ionicons name="menu" size={24} color="black" />
        </Text> */}
      </View>
      <View style={styles.toolbarActionName}>
        <Text style={styles.toolbarText}>Batamiðstöðin</Text>
      </View>
    </View>
  );
};
export default Toolbar;
