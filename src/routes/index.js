import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "../views/Main";
import HomeView from "../views/HomeView";
import NotificationView from "../views/notifications";
import Event from "../views/EventView";
import EducationView from "../views/EducationView";
import UserView from "../views/UserView";

const Stack = createStackNavigator();

const Routes = () => (
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
      initialParams={{ toolbarText: "Mitt svæði" }}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
export default Routes;
