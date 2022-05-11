import React from "react";
import { View, Text } from "react-native";
import { AntDesign, MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import IconBadge from "react-native-icon-badge";

import styles from "./styles";

const Footer = (parameter) => {
  const { navigate } = useNavigation();

  return (
    <View styleName="horizontal" style={styles.footer}>
      <View style={styles.footerAction}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigate("Home")}
        >
          <View style={styles.buttonView}>
            <Text style={styles.icon}>
              <AntDesign name="calendar" size={24} color="black" />
            </Text>
            <Text style={styles.footerText}>Dagatal</Text>
          </View>
        </TouchableHighlight>
      </View>

      <View style={styles.footerAction}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigate("Notifications")}
        >
          <View style={styles.buttonView}>
            <IconBadge
              MainElement={
                // <Text style={styles.icon}>
                <MaterialIcons
                  style={{
                    //backgroundColor: "#489EFE",
                    // borderBottomWidth: "black",
                    // borderWidth: 2,
                    width: 44,
                    height: 30,
                    //margin: 6,
                    // paddingBottom: ,
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                  //style={styles.icon}
                  name="notifications"
                  size={28}
                  color="black"
                />
              }
              BadgeElement={
                <Text style={{ color: "#FFFFFF" }}>
                  {parameter.numberOfNotifications}
                </Text>
              }
              IconBadgeStyle={{
                width: 18,
                height: 18,
                // backgroundColor: "#FF00EE",
              }}
            />
            <Text style={styles.footerText}>
              Tilkynningar
              {/* {parameter.numberOfNotifications} */}
            </Text>
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
            <Text style={styles.footerText}>Fræðsluefni</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.footerAction}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigate("User")}
        >
          <View style={styles.buttonView}>
            <Text style={styles.icon}>
              <MaterialIcons name="account-circle" size={24} color="black" />
            </Text>
            <Text style={styles.footerText}>Mitt svæði</Text>
          </View>
        </TouchableHighlight>
      </View>
      {/* </View> */}
    </View>
  );
};

export default Footer;
