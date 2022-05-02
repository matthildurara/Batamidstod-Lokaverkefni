import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Linking,
  ScrollView,
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

const EducationView = ({ navigation, route }) => {
  const parameter = route.params.toolbarText;
  const [user, setUser] = useState({});
  useEffect(() => {
    async () => {
      const user = await AsyncStorage.getItem("user");
      setUser(JSON.parse(user));
    };
  });

  const db = getDatabase();
  const dbRef = ref(db, "Users/EducationMaterial");
  const [allMaterial, setMaterial] = useState([]);

  useEffect(() => {
    const fetchMaterial = async () => {
      onValue(dbRef, (snapshot) => {
        setMaterial([]);
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
      });
    };
    fetchMaterial();
    return;
  }, []);

  return (
    <View style={styles.container}>
      <Toolbar toolbarText={parameter} style={styles.toolbar} />
      <ScrollView>
        <View>
          {Object.values(allMaterial).map((item, index) => (
            <View key={index} item={item} style={styles.educationMatContainer}>
              <Text>{item.Title}</Text>
              <Text>{item.About}</Text>
              <Text>Linkur á fræðsluefni: </Text>
              <Text>{item.Link}</Text>
              <Text
                style={{ color: "blue" }}
                onPress={() => Linking.openURL(item.Link)}
              >
                Linkur á efni
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Footer style={styles.footer} />
    </View>
  );
};
export default EducationView;
