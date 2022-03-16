import React from 'react';
import {View, Text,TouchableHighlight,TextInput,Image} from 'react-native';
// import { TextInput } from 'react-native-web';
import styles from './styles';
import bata from '../../resources/Bata.png';



const Main = ({navigation: {navigate}}) => (
    <View style={styles.container}> 
        <Image source={ bata } style={ styles.image} />
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
