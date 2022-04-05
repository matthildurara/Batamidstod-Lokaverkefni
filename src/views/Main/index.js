import React from "react";
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
import { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
//import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { getAuth } from "firebase";
//import * as firebase from "firebase";
//import firebase from "firebase/compat/app";
//import "firebase/auth";

// import { auth } from "../../../firebase";
// import { KeyboardAvoidingView } from "react-native-web";

const Main = ({ navigation: { navigate } }) => {
  //const auth = firebase.auth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const auth = getAuth();
  //   const [user, setUser] = useState({});
  onAuthStateChanged(auth, (user) => {
    // console.log(currUser);
    console.log(user);
    //const currUser = JSON.stringify(user);
    const userEmail = user?.email;
    console.log(userEmail);

    //const jsonValue = JSON.stringify(user);
    // AsyncStorage.setItem("user", jsonValue);

    // setUser(currentUser);
  });
  //   const handleSignup = () => {
  //     auth
  //       .createUserWithEmailAndPasswor(email, password)
  //       .then((userCredentials) => {
  //         const user = userCredentials.user;
  //         console.log(user.email);
  //       })
  //       .catch((error) => alert.apply(error.message));
  //   };

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      //   console.log(user.user.email);
      // setUser(user);
    } catch (error) {
      console.log(error.message);
    }
    navigate("Home");
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
        <TextInput
          style={styles.textInput}
          secureTextEntry
          placeholder="Password"
          value={password}
          setPassword={setPassword}
          onChangeText={setPassword}
        />
        <TouchableHighlight onPress={handleLogin} style={styles.signButton}>
          <Text style={styles.sign}>Sign in</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    </>
  );
};
export default Main;
