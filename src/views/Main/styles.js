import { StyleSheet } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { grey, greyBrown } from "../../styles/colors";


export default StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        alignItems:'center',
        justifyContent:'space-around'
    },
    sign:{
        color:'white',
        fontSize:22,

    },
    signButton:{
        borderRadius:7,
        width:185,
        height:45,
        backgroundColor:greyBrown,
        justifyContent:"center",
        // justifyItems:'center',
        alignItems:'center'
    },
    textInput:{
        fontSize:18,
        width:185,
        height:45,
        borderRadius:3,
        justifyContent:'space-around',
        backgroundColor:grey,
    }
});
