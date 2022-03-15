import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Main from '../views/Main';
import Home from '../views/Home';

const Routes = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Main'>
            <Stack.Screen name ='Main' component={Main} />
            <Stack.Screen name ='Home' component={Home} />

        </Stack.Navigator>
    </NavigationContainer>

);
export default Routes;