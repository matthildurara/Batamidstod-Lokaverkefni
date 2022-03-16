import React from 'react';
import {View, Text,TouchableHighlight,TextInput} from 'react-native';
// import { TextInput } from 'react-native-web';
import styles from './styles';



const Main = ({navigation: {navigate}}) => (
    <View style={styles.container}> 
        <Text>Batamiðstöðin</Text>
        <TextInput style={styles.textInput}
        placeholder='Username'/>
        <TextInput style={styles.textInput}
        secureTextEntry
        placeholder='Password'/>
        <TouchableHighlight 
        onPress={()=> navigate('Home')}
        style={styles.signButton}>
            <Text style={styles.sign}>Sign in</Text>
        </TouchableHighlight>
    </View>
);
export default Main;
