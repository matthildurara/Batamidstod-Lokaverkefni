import React from "react";
import { View, Text } from "react-native";
import { AntDesign, MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

const Footer = (parameter) => {
  const { navigate } = useNavigation();

  // const [allNotifications, setAllNotifications] = useState([]);

  // useEffect(() => {
  //   const db = getDatabase();
  //   const dbRef = ref(db, "Users/Notifications");
  //   async function getNotifications() {
  //     onValue(dbRef, (snapshot) => {
  //       setAllNotifications([]);
  //       console.log("=============MMMMM==========");
  //       snapshot.forEach((childSnapshot) => {
  //         const childKey = childSnapshot.key;
  //         console.log("CHILDKEU IS ?");
  //         console.log(childKey);
  //         childSnapshot.forEach((childChild) => {
  //           const childchildKey = childChild.key;
  //           console.log("childchild key: ", childchildKey);
  //           const childValue = childChild.val();

  //           const item = {
  //             notification: childValue.notification,
  //             notificationTitle: childValue.notificationTitle,
  //           };

  //           setAllNotifications((allNotifications) => [
  //             ...allNotifications,
  //             item,
  //           ]);
  //         });
  //       });
  //     });
  //   }

  //   return getNotifications();
  //   //console.log(allNotifications);
  // }, []);

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
            <Text>Tilkynningar {parameter.numberOfNotifications}</Text>
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
          <View style={styles.buttonView}>
            <Text>
              <MaterialIcons name="account-circle" size={24} color="black" />
            </Text>
            <Text>Mitt svæði</Text>
          </View>
        </TouchableHighlight>
      </View>
      {/* </View> */}
    </View>
  );
};

export default Footer;
