import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const { navigate } = useNavigation();
  return (
    <View styleName="horizontal" style={styles.footer}>
      {/* <View style={styles.toolbarAction}> */}
      <View style={styles.footerAction}>
        <Text>
          <Ionicons name="menu" size={24} color="black" />
        </Text>
      </View>
      <View style={styles.footerAction}>
        <TouchableHighlight onPress={() => navigate("Home")}>
          <Text>
            <AntDesign name="calendar" size={24} color="black" />
          </Text>
        </TouchableHighlight>
      </View>

      <View style={styles.footerAction}>
        <TouchableHighlight onPress={() => navigate("Notifications")}>
          <Text>
            <MaterialIcons name="notifications" size={24} color="black" />
          </Text>
        </TouchableHighlight>
      </View>
      <View style={styles.footerAction}>
        <Text>
          <MaterialIcons name="account-circle" size={24} color="black" />
        </Text>
      </View>
      {/* </View> */}
    </View>
  );
};
export default Footer;
