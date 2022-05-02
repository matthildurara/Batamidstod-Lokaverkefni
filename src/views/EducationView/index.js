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

const EducationView = ({ navigation, route }) => {
  const { navigate } = useNavigation();
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
  const [allMaterial, setMaterial] = useState({});

  const fetchMaterial = async () => {
    onValue(dbRef, (snapshot) => {
      setMaterial({});
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        console.log("CHILDKEU IS ?");
        console.log(childKey);
        childSnapshot.forEach((childChild) => {
          const childchildKey = childChild.key;

          const childValue = childChild.val();

          const item = [
            {
              aboutMaterial: childValue.aboutMaterial,
              educMatTitle: childValue.educMatTitle,
              linkToMaterial: childValue.linkToMaterial,
            },
          ];

          setMaterial((prevState) => ({
            ...prevState,
            [childSnapshot.key]: item,
          }));
        });
      });
    });
  };

  useEffect(() => {
    fetchMaterial();
    console.log(allMaterial);
  }, []);

  // useEffect(() => {
  //   const fetchMaterial = async () => {
  //     onValue(dbRef, (snapshot) => {
  //       setMaterial([]);
  //       snapshot.forEach((childSnapshot) => {
  //         const childKey = childSnapshot.key;
  //         const childVal = childSnapshot.val();
  //         const item = {
  //           Title: childVal.educMatTitle,
  //           About: childVal.aboutMaterial,
  //           Link: childVal.linkToMaterial,
  //         };

  //         setMaterial((allMaterial) => [...allMaterial, item]);
  //       });
  //     });
  //   };
  //   fetchMaterial();

  //   return;
  // }, []);

  return (
    <View style={styles.container}>
      <Toolbar toolbarText={parameter} style={styles.toolbar} />
      <ScrollView>
        <View>
          {Object.values(allMaterial).map((item, index) => (
            <View key={index} item={item} style={styles.educationMatContainer}>
              <Text>{item[0].educMatTitle}</Text>
              <Text>{item[0].aboutMaterial}</Text>
              <Text>Linkur á fræðsluefni: </Text>
              <Text
                style={{ color: "blue" }}
                onPress={() => Linking.openURL(item[0].linkToMaterial)}
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
