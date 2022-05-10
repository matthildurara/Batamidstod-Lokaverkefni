import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableHighlight,
  TextInput,
  Image,
} from "react-native";
// import { TextInput } from 'react-native-web';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigate } from "react-router-dom";
import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
} from "firebase/database";

import styles from "./styles";
import bata from "../../resources/Bata.png";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, dbFirestore } from "../../../firebase-config";

//import { getAuth } from "firebase/auth";
//import { getAuth } from "firebase";
//import * as firebase from "firebase";
//import firebase from "firebase/compat/app";
//import "firebase/auth";
import { useAuthValue } from "../../../authContext";

//import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { stringify } from "@firebase/util";
// import { useEffect } from "react/cjs/react.production.min";

// import { auth } from "../../../firebase";
// import { KeyboardAvoidingView } from "react-native-web";

const Main = ({ navigation: { navigate } }) => {
  const db = getDatabase();
  const dbRef = ref(db, "Users/User");

  const [allUsers, setAllUsers] = useState([]);
  const [email, setEmail] = useState("");

  const getUsers = async () => {
    onValue(dbRef, (snapshot) => {
      setEmail("");
      setErrorm("");
      snapshot.forEach((childSnapshot) => {
        //console.log(childSnapshot);
        const childKey = childSnapshot.key;
        const childVal = childSnapshot.val();
        allUsers[childKey] = [];
        const itemUser = { name: childKey, email: childVal.email };
        setAllUsers((prevstate) => [...prevstate, itemUser]);
        // allUsers[childKey].push({
        //   name: childKey,
        //   email: childVal.email,
        // });
      });
    });
    return;
  };

  useEffect(() => {
    getUsers();
    setEmail("");
    setErrorm("");
    // async function setUsers() {
    //   onValue(dbRef, (snapshot) => {
    //     snapshot.forEach((childSnapshot) => {
    //       const childKey = childSnapshot.key;
    //       const childVal = childSnapshot.val();
    //       allUsers[childKey] = [];

    //       allUsers[childKey].push({
    //         name: childKey,
    //         email: childVal.email,
    //       });
    //     });
    //   });
    // }
    // setUsers();
    return;
  }, []);

  const [password, setPassword] = useState("");
  const [errorm, setErrorm] = useState("");

  // const findName = async (email) => {
  //   for (var i = 0; i < Object.keys(allUsers).length; i++) {
  //     const user = Object.values(allUsers)[i];
  //     const tempUserString = JSON.stringify(user[0].email);
  //     if (tempUserString === email) {
  //       return user[0].name;
  //     }
  //   }
  // };
  const handleLogin = async () => {
    for (var i = 0; i < Object.keys(allUsers).length; i++) {
      // console.log("inni for ");
      const user = Object.values(allUsers)[i];
      // console.log(user);
      const newEmail = JSON.stringify(email.toLowerCase());
      const tempUserString = JSON.stringify(user.email);
      // console.log("TEmpUSER STRING :       ", tempUserString);
      // console.log("EEEMAIL: ", newEmail);
      //console.log(tempUserString[i].name);
      if (tempUserString === newEmail) {
        // const thisName = await findName(newEmail);
        const userLogin = {
          name: user.name,
          email: user.email,
        };
        try {
          AsyncStorage.setItem("User", JSON.stringify(userLogin));
        } catch (error) {
          console.log(error);
        }
        navigate("Home", { toolbarText: "Dagatal" });
      } else {
        console.log(false);
        setErrorm("This email is invalid");
      }
    }
    //await getUsers();
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <Image source={bata} style={styles.image} />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          setEmail={setEmail}
          onChangeText={setEmail}
        />

        <TouchableHighlight
          onPress={() => handleLogin()}
          style={styles.signButton}
        >
          <Text style={styles.sign}>Sign in</Text>
        </TouchableHighlight>
        {errorm != "" ? <Text>{errorm}</Text> : <></>}
      </KeyboardAvoidingView>
    </>
  );
};

export default Main;
