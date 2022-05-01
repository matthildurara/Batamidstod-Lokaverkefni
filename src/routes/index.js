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
    <Stack.Screen name="Main" component={Main} />
    <Stack.Screen name="Home" component={HomeView} />
    <Stack.Screen name="Notifications" component={NotificationView} />
    <Stack.Screen name="Event" component={Event} />
    <Stack.Screen name="Education" component={EducationView} />
    <Stack.Screen name="User" component={UserView} />
  </Stack.Navigator>
  // {/* </NavigationContainer> */}
);
export default Routes;
