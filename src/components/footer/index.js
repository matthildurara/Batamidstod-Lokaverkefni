import React from "react";
import { View, Text, Menu } from "react-native";
import styles from "./styles";
import { AntDesign, MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const { navigate } = useNavigation();
  //const menu = <Menu navigator={navigator} />;

  return (
    <View styleName="horizontal" style={styles.footer}>
      {/* <View style={styles.toolbarAction}> */}

      <View style={styles.footerAction}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigate("Home")}
        >
          <View style={styles.buttonView}>
            <Text style={styles.icon}>
              <AntDesign name="calendar" size={24} color="black" />
            </Text>
            <Text>Dagatal</Text>
          </View>
        </TouchableHighlight>
      </View>

      <View style={styles.footerAction}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigate("Notifications")}
        >
          <View style={styles.buttonView}>
            <Text style={styles.icon}>
              <MaterialIcons name="notifications" size={24} color="black" />
            </Text>
            <Text>Tilkynningar</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.footerAction}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigate("Education")}
        >
          <View style={styles.buttonView}>
            <Text style={styles.icon}>
              <Entypo name="graduation-cap" size={24} color="black" />
              {/* <Ionicons name="menu" size={24} color="black" /> */}
            </Text>
            <Text>Fræðsluefni</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.footerAction}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigate("User")}
        >
          <Text>
            <MaterialIcons name="account-circle" size={24} color="black" />
          </Text>
        </TouchableHighlight>
      </View>
      {/* </View> */}
    </View>
  );
};
export default Footer;
