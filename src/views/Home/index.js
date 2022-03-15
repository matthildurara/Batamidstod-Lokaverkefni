import React from 'react';
import {View, Text,TouchableHighlight,TextInput} from 'react-native';
import styles from './styles';
import Toolbar from '../../components/toolBar';


const Home = () => (
    <View style={styles.container}> 
    <TouchableHighlight  style={styles.toolbarAction}>
        <Toolbar/>
        </TouchableHighlight>
        <Text>Home</Text>
    </View>
);
export default Home;
