import {StyleSheet} from 'react-native';
import { myGray } from '../../styles/colors';

export default StyleSheet.create({
  footer: {
    // display:grid,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    backgroundColor:'#B4B5B8',
    // bottom:0,
    paddingLeft:10,
    paddingRight:10,
    // marginBottom: 10,
    alignSelf:'flex-end',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    height: 70,
 
  },
  footerAction: {
    flex:1,
    alignItems: 'center'
  }

});
