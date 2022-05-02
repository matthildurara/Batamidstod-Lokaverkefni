import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Main from "../views/Main";
import HomeView from "../views/HomeView";
import NotificationView from "../views/notifications";
import Event from "../views/EventView";
import EducationView from "../views/EducationView";
import UserView from "../views/UserView";

const Routes = () => (
  //   <NavigationContainer>

  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen
      name="Main"
      component={Main}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Home"
      component={HomeView}
      initialParams={{ toolbarText: "Dagatal" }}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Notifications"
      component={NotificationView}
      initialParams={{ toolbarText: "Tilkynningar" }}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Event"
      component={Event}
      initialParams={{ toolbarText: "Viðburður" }}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Education"
      component={EducationView}
      initialParams={{ toolbarText: "Fræðsluefni" }}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="User"
      component={UserView}
      initialParams={{ toolbarText: "Notandi" }}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
  // {/* </NavigationContainer> */}
);
export default Routes;
