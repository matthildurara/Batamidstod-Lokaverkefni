import React, { useEffect, useState } from "react";
import { View, Text, Linking, ScrollView } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";
import Toolbar from "../../components/toolBar";
import Footer from "../../components/footer";

const EducationView = ({ navigation, route }) => {
  const { navigate } = useNavigation();
  const parameter = route.params.toolbarText;
  const [allMaterial, setMaterial] = useState([]);

  useEffect(() => {
    const db = getDatabase(); //Getting the database 
    const dbRef = ref(db, "Users/EducationMaterial"); //Accessing the correct location in the database 

    async function getMaterial() {
      //Getting all the education material
      onValue(dbRef, (snapshot) => {
        setMaterial([]);
        snapshot.forEach((childSnapshot) => {
          childSnapshot.forEach((childChild) => {
            const childValue = childChild.val();
            const item = {
              aboutMaterial: childValue.aboutMaterial,
              educMatTitle: childValue.educMatTitle,
              linkToMaterial: childValue.linkToMaterial,
            };

            setMaterial((prevstate) => [...prevstate, item]);
          });
        });
      });
    }
    getNotificationLength();
    return getMaterial();
  }, []);

  const [notificationLength, setNotificationLength] = useState(0);

  const getNotificationLength = async () => {
    //Getting the number of notification to be able to display it in the footer 
    try {
      const value = await AsyncStorage.getItem("NumberNotifications");
      if (value !== null) {
        // We have data!!
        const parsedData = JSON.parse(value);
        setNotificationLength(parsedData);
      }
    } catch (error) {
      console.log("error: ", error);
      // Error retrieving data
    }
  };

  return (
    <View style={styles.container}>
      <Toolbar toolbarText={parameter} style={styles.toolbar} />
      <ScrollView>
        <View style={styles.list}>
          {Object.values(allMaterial).map((item, index) => (
            <View key={index} item={item} style={styles.educationMatContainer}>
              <Text>{item.educMatTitle}</Text>
              <Text>{item.aboutMaterial}</Text>
              <Text>Linkur á fræðsluefni: </Text>
              <Text
                style={{ color: "blue" }}
                onPress={() => Linking.openURL(item.linkToMaterial)}
              >
                Linkur á efni
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Footer numberOfNotifications={notificationLength} />
    </View>
  );
};

export default EducationView;
