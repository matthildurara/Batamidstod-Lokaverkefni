import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Linking,
} from "react-native";
import styles from "./styles";
import Toolbar from "../../components/toolBar";
import Footer from "../../components/footer";
import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
} from "firebase/database";

const EducationView = ({ navigation: { navigate } }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async () => {
      const user = await AsyncStorage.getItem("user");
      setUser(JSON.parse(user));
      console.log(user.email);
    };
  });

  const db = getDatabase();
  const dbRef = ref(db, "Users/EducationMaterial");
  const [allMaterial, setMaterial] = useState([]);

  useEffect(() => {
    async function fetchMaterial() {
      onValue(
        dbRef,
        (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childVal = childSnapshot.val();
            const item = {
              Title: childVal.educMatTitle,
              About: childVal.aboutMaterial,
              Link: childVal.linkToMaterial,
            };
            setMaterial((allMaterial) => [...allMaterial, item]);
          });
        },
        []
      );
    }
    fetchMaterial();
  }, []);
  //console.log("hallo");
  // for (var i = 0; i < Object.values(allMaterial).length; i++) {
  //   console.log("blala");
  //   console.log(Object.values(allMaterial)[i][0].Title);
  // }

  return (
    <View style={styles.container}>
      <Toolbar style={styles.toolbar} />
      <View style={styles.calander}>
        {Object.values(allMaterial).map((item, index) => (
          <View key={index} item={item} style={styles.educationMatContainer}>
            <Text>{item.Title}</Text>
            <Text>{item.About}</Text>
            <Text>Linkur á fræðsluefni: </Text>
            <Text>{item.Link}</Text>
            <Text
              style={{ color: "blue" }}
              onPress={() => Linking.openURL(item[0]?.Link)}
            >
              Linkur á efni
            </Text>
          </View>
        ))}
        {/* {allNotifications.map((item, index) => {
          <View key={index} item={item}>
            <Text>{item.notification}</Text>
          </View>;
        })} */}
      </View>

      <Footer style={styles.footer} />
    </View>
  );
};
export default EducationView;
