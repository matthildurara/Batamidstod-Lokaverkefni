import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableHighlight,
  TextInput,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set, onValue } from "firebase/database";

import styles from "./styles";
import bata from "../../resources/Bata.png";

const Main = ({ navigation: { navigate } }) => {
  const db = getDatabase();
  const dbRef = ref(db, "Users/User");

  const [allUsers, setAllUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [errorm, setErrorm] = useState("");

  const getUsers = async () => {
    setEmail("");
    setErrorm("");
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childVal = childSnapshot.val();
        allUsers[childKey] = [];
        const itemUser = { name: childKey, email: childVal.email };
        setAllUsers((prevstate) => [...prevstate, itemUser]);
      });
    });

    return;
  };

  useEffect(() => {
    setEmail("");
    setErrorm("");
    getUsers();
    return;
  }, []);

  const handleLogin = () => {
    for (var i = 0; i < Object.keys(allUsers).length; i++) {
      const user = Object.values(allUsers)[i];
      const newEmail = JSON.stringify(email.toLowerCase());
      const tempUserString = JSON.stringify(user.email);
      if (tempUserString === newEmail) {
        const userLogin = {
          name: user.name,
          email: user.email,
        };
        setEmail("");
        setErrorm("");
        AsyncStorage.setItem("User", JSON.stringify(userLogin));

        navigate("Home", { toolbarText: "Dagatal" });
        return;
      } else {
      }
    }
    setErrorm("This email is invalid");
  };

  return (
    <>
      <View style={styles.imgContainer}>
        <Image source={bata} style={styles.image} />
        <KeyboardAvoidingView style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Netfang"
            value={email}
            setEmail={setEmail}
            onChangeText={setEmail}
          />

          <TouchableHighlight
            onPress={() => handleLogin()}
            style={styles.signButton}
          >
            <Text style={styles.sign}>Innskrá</Text>
          </TouchableHighlight>
          {errorm != "" ? <Text>{errorm}</Text> : <></>}
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default Main;
