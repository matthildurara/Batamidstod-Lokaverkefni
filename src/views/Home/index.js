import React from 'react';
import {View, Text,TouchableHighlight,TextInput} from 'react-native';
import styles from './styles';
import Toolbar from '../../components/toolBar';
import Footer from '../../components/footer';


const Home = () => (
    <View style={styles.container}> 
        <Toolbar style={styles.toolbar}/>
        <View style={styles.calander}>
        <Text>Dagatal</Text>
        </View>
        <Footer style={styles.footer}/>
    </View>
);
export default Home;
