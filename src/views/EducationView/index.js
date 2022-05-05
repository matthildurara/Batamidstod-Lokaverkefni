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
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EducationView = ({ navigation, route }) => {
  const { navigate } = useNavigation();
  const parameter = route.params.toolbarText;
  // const db = getDatabase();
  // const dbRef = ref(db, "Users/EducationMaterial");
  //const [user, setUser] = useState({});
  // useEffect(() => {
  //   async () => {
  //     const user = await AsyncStorage.getItem("user");
  //     setUser(JSON.parse(user));
  //   };
  // });
  const [allMaterial, setMaterial] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "Users/EducationMaterial");
    async function getMaterial() {
      onValue(dbRef, (snapshot) => {
        setMaterial([]);
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          // console.log("CHILDKEU IS ?");
          // console.log(childKey);
          childSnapshot.forEach((childChild) => {
            const childchildKey = childChild.key;
            // console.log("CHILDChildKEU IS ?");
            // console.log(childchildKey);

            const childValue = childChild.val();
            // console.log("CHILDValue IS ?");
            // console.log(childValue);
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
    // setMaterial((current) => [...current].reverse());
    getNotificationLength();
    return getMaterial();
  }, []);
  //console.log(allMaterial);
  const [notificationLength, setNotificationLength] = useState(0);

  const getNotificationLength = async () => {
    try {
      console.log("inside try before asyncstore");

      const value = await AsyncStorage.getItem("NumberNotifications");
      console.log("inside Try after asyncstore");
      console.log(value);
      console.log("value: ", JSON.parse(value));
      if (value !== null) {
        console.log("inside If");

        // We have data!!

        console.log("value: ", value);
        const parsedData = JSON.parse(value);
        console.log("parsedValue: ", parsedData);
        setNotificationLength(parsedData);
        //return parsedData;
      }
    } catch (error) {
      console.log("error: ", error);
      // Error retrieving data
    }
  };
  // useEffect(() => {
  //   console.log("inside useeffect");
  //   async function getNotificationLength() {
  //     console.log("inside getNotifications");

  //     try {
  //       console.log("inside try before asyncstore");

  //       const value = await AsyncStorage.getItem("NumberNotifications");
  //       console.log("inside Try after asyncstore");
  //       console.log(value);
  //       console.log("value: ", JSON.parse(value));
  //       if (value !== null) {
  //         console.log("inside If");

  //         // We have data!!

  //         console.log("value: ", value);
  //         const parsedData = JSON.parse(value);
  //         console.log("parsedValue: ", parsedData);
  //         setNotificationLength(parsedData);
  //       }
  //     } catch (error) {
  //       console.log("error: ", error);
  //       // Error retrieving data
  //     }
  //   }
  //   getNotificationLength();
  //   return;
  // }, []);

  // console.log(notificationLength);
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
