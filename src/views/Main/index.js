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
import { auth } from "../../../firebase-config";

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
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { stringify } from "@firebase/util";
// import { useEffect } from "react/cjs/react.production.min";

// import { auth } from "../../../firebase";
// import { KeyboardAvoidingView } from "react-native-web";

const Main = ({ navigation: { navigate } }) => {
  // const { currentUser } = useAuthValue();
  // const [currentUser, setCurrentUser] = useState(null);

  //const auth = firebase.auth();
  //const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorm, setErrorm] = useState("");

  const db = getDatabase();
  const dbRef = ref(db, "Users/User");

  let allUsers = [];

  useEffect(() => {
    async function setUsers() {
      onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          //console.log("childSnapshot", childSnapshot);
          const childKey = childSnapshot.key;
          //console.log(childKey);
          childSnapshot.forEach((childvalue) => {
            //console.log(childvalue);
            allUsers.push(childvalue);
          });

          //console.log("child key");
          // console.log(childKey);
          //setListEvents((prevState) => ({ ...prevState, childKey }));
          //listOfEvents[childKey] = [];
          //console.log("FYRIRRRRR");
          // console.log(listOfEvents);
          //listOfEvents[childKey].push({ childSnapshot });
          // childSnapshot.forEach((childChild) => {
          //   const childchildKey = childChild.key;
          //   const childValue = childChild.val();
          //   console.log(child)
          //   // setListEvents((prevState) => ({
          //   //   ...prevState,
          //   //   event: childchildKey,
          //   // }));
          //   // let childVal = {};
          //   // childVal = {
          //   //   name: childchildKey,
          //   //   childValue,
          //   // };
          //   // childChild.forEach((childvalue) => {
          //   //   listOfEvents[childKey].push({
          //   //     startTime: childvalue,
          //   //   });
          //   // });
          //   // const newObj = {
          //   //   childKey: {
          //   //     name: childchildKey,
          //   //   },
          //   // };
          //   // listE.push(newObj);
          // });
          //const newList = listOfEvents.concat
          //console.log(childKey.valueOf());
          //listE.push(childKey);
          // setListEvents(childKey);
          //console.log("blabla");
          //console.log(listE);
          // console.log(listOfEvents);
          // setAllEvent(allEvents, listOfEvents);
        });
      });
    }
    setUsers();
  }, []);

  //   const auth = getAuth();
  //   const [user, setUser] = useState({});
  //   onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //   });
  //   useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //       setCurrentUser(user);
  //       // console.log(currUser);
  //       // console.log(user);
  //       // //const currUser = JSON.stringify(user);
  //       // const userEmail = user?.email;
  //       // console.log(userEmail);

  //       //const jsonValue = JSON.stringify(user);
  //       // AsyncStorage.setItem("user", jsonValue);

  //       // setUser(currentUser);
  //     });
  //   }, []);
  //   const handleSignup = () => {
  //     auth
  //       .createUserWithEmailAndPasswor(email, password)
  //       .then((userCredentials) => {
  //         const user = userCredentials.user;
  //         console.log(user.email);
  //       })
  //       .catch((error) => alert.apply(error.message));
  //   };

  // const handleLogin = async () => {
  //   try {
  //     const user = await signInWithEmailAndPassword(auth, email, password);
  //     //   console.log(user.user.email);
  //     // setUser(user);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   navigate("Home");
  // };
  const handlesaveUser = async () => {
    try {
      AsyncStorage.setItem("User", email);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async () => {
    const isinclude = allUsers.includes(email);
    console.log(isinclude);
    for (var i = 0; i < allUsers.length; i++) {
      console.log(allUsers[i]);
      console.log(email.toLowerCase().toString());

      if (allUsers[i] === email.toLowerCase()) {
        try {
          AsyncStorage.setItem("User", email);
        } catch (error) {
          console.log(error);
        }
        navigate("Home");
      } else {
        setErrorm("This email is invalid");
      }
    }
    // allUsers.forEach((user) => {
    //   //console.log(user);
    //   console.log(user);
    //   console.log(email);
    //   const newEmail = email.toLowerCase.toString();
    //   if (user === newEmail) {
    //     try {
    //       AsyncStorage.setItem("User", email);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     navigate("Home");
    //   } else {
    //     setErrorm("This email is invalid");
    //   }
    // });
  };

  //console.log(currentUser);

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
        {/* <TextInput
          style={styles.textInput}
          secureTextEntry
          placeholder="Password"
          value={password}
          setPassword={setPassword}
          onChangeText={setPassword}
        /> */}
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
