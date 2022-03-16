import React from 'react';
import {View,Text} from 'react-native';
import styles from './styles';
import {AntDesign, MaterialIcons, Ionicons} from '@expo/vector-icons';

const Footer = () => {
return(
    <View styleName= "horizontal" style={styles.footer}>
      {/* <View style={styles.toolbarAction}> */}
      <View style={styles.footerAction}>
          <Text>
          <AntDesign name="home" size={24} color="black" />
        </Text>
        </View>
          <View style={styles.footerAction}>
          <Text>
          <AntDesign name="calendar" size={24} color="black" />
        </Text>
        </View>

          <View style={styles.footerAction}>
          <Text>
          <MaterialIcons name="notifications" size={24} color="black" />
        </Text>
        </View>
        <View style={styles.footerAction}>
          <Text>
          <MaterialIcons name="account-circle" size={24} color="black" />
        </Text>
        </View>
      {/* </View> */}
    </View>
);}
export default Footer;