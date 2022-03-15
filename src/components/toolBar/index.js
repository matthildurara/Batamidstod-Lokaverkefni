import React from 'react';
import {View,Text} from 'react-native';
import styles from './styles';

const Toolbar = () => {
return(
    <View styleName= "horizontal" style={styles.toolbar}>
      <Text>Menu</Text>
    </View>
);}
export default Toolbar;