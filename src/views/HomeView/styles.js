import { StyleSheet } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { grey, greyBrown } from "../../styles/colors";


export default StyleSheet.create({
    container:{
        flexDirection:'column',
         flex:1,
        // padding:20,
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white',
    },
    toolbarAction:{
        // width:100,
        textAlign:'center',
        color: 'black',
        backgroundColor: '#b0c4de'
      },
      calander:{
        //  height:400,
          paddingTop:10,
      
      },
    footer:{
        flex:1,
        alignSelf:'flex-end',
        // position:'absolute',
        // bottom:0,
    },
    toolbar:{
        flex:1,
        alignSelf:'flex-start',
        // flex:2,
        marginTop:'auto',
    }

});

