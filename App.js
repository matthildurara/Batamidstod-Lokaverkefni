import React, { useEffect } from "react";
//import { auth } from "./authContext";
import { auth } from "./firebase-config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";

const Stack = createStackNavigator();

import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
//import Main from "./src/views/Main";
import AppContainer from "./src/routes";
import { AuthProvider } from "./authContext";
//import { onAuthStateChanged } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import Main from "./src/views/Main";
import HomeView from "./src/views/HomeView";

export default function App() {
  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notification
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // console.log(currUser);
      // console.log(user);
      // //const currUser = JSON.stringify(user);
      // const userEmail = user?.email;
      // console.log(userEmail);

      //const jsonValue = JSON.stringify(user);
      // AsyncStorage.setItem("user", jsonValue);

      // setUser(currentUser);
    });
    return;
  }, []);
  return (
    <NavigationContainer>
      <AuthProvider value={{ currentUser }}>
        <AppContainer />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
