import React, { useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableHighlight,
  TextInput,
  Image,
} from "react-native";
// import { TextInput } from 'react-native-web';
import styles from "./styles";
import bata from "../../resources/Bata.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, dbFirestore } from "../../../firebase-config";

//import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { getAuth } from "firebase";
//import * as firebase from "firebase";
//import firebase from "firebase/compat/app";
//import "firebase/auth";
import { useAuthValue } from "../../../authContext";
import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
} from "firebase/database";
//import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { stringify } from "@firebase/util";
// import { useEffect } from "react/cjs/react.production.min";

// import { auth } from "../../../firebase";
// import { KeyboardAvoidingView } from "react-native-web";

const Main = ({ navigation: { navigate } }) => {
  // const { currentUser } = useAuthValue();
  // const [currentUser, setCurrentUser] = useState(null);

  //const auth = firebase.auth();
  //const history = useHistory();

  const db = getDatabase();
  const dbRef = ref(db, "Users/User");

  //let allUsers = [];
  const [allUsers, setAllUsers] = useState({});

  const getUsers = async () => {
    //let allUsers = [];
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot);
        const childKey = childSnapshot.key;
        const childVal = childSnapshot.val();
        allUsers[childKey] = [];

        allUsers[childKey].push({
          name: childKey,
          email: childVal.email,
        });
      });
    });
    return;
  };

  useEffect(() => {
    async function setUsers() {
      onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childVal = childSnapshot.val();
          allUsers[childKey] = [];

          allUsers[childKey].push({
            name: childKey,
            email: childVal.email,
          });
        });
      });
    }
    setUsers();
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorm, setErrorm] = useState("");

  const findName = async (email) => {
    for (var i = 0; i < Object.values(allUsers).length; i++) {
      const user = Object.values(allUsers)[i];
      const tempUserString = JSON.stringify(user[0].email);
      if (tempUserString === email) {
        return user[0].name;
      }
    }
  };
  const handleLogin = async () => {
    await getUsers();

    for (var i = 0; i < Object.values(allUsers).length; i++) {
      const user = Object.values(allUsers)[i];
      const newEmail = JSON.stringify(email.toLowerCase());
      const tempUserString = JSON.stringify(user[0].email);
      if (tempUserString === newEmail) {
        const thisName = await findName(newEmail);
        const userLogin = {
          name: thisName,
          email: user[0].email,
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
  };
  const [user, setUser] = useState("");
  useEffect(() => {
    async function isUser() {
      try {
        const value = await AsyncStorage.getItem("User");
        if (value !== null) {
          // We have data!!
          console.log("BEFORE LOG IN");
          console.log(JSON.parse(value).name);
          //setUser(JSON.parse(value));
        }
      } catch (error) {
        console.log("BEFORE LOG IN- ERROR");
        // Error retrieving data
      }
    }
    isUser();
  });

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
