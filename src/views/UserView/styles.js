import { SAMLAuthProvider } from "firebase/auth";
import { StyleSheet } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { grey, greyBrown } from "../../styles/colors";

export default StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    // padding:20,
    alignItems: "center",
    // padding:20,
    //alignItems: "center",
    //justifyContent: "space-between",
    backgroundColor: "white",
  },
  userInformation: {
    //height: 80,
    //borderColor: "red",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 5,

    width: 380,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    //borderWidth: 2,
  },
  toolbarAction: {
    // width:100,
    textAlign: "center",
    color: "black",
    backgroundColor: "#b0c4de",
  },
  footer: {
    flex: 1,
    alignSelf: "flex-end",
    bottom: 0,

    // position:'absolute',
    // bottom:0,
  },
  toolbar: {
    flex: 1,
    alignSelf: "flex-start",
    // flex:2,
    marginTop: "auto",
  },
  logoutbutton: {
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 5,
    width: 65,
    paddingLeft: 5,
    marginRight: 10,

    // margin: 5,
    alignSelf: "flex-end",
    right: 0,
  },
  username: {
    //alignSelf: "flex-end",
    marginBottom: 5,
    marginLeft: 20,
  },
  eventUserItem: {
    // borderColor: "black",
    // borderWidth: 2,
    borderBottomColor: "#949392",
    borderBottomWidth: 2,
    marginBottom: 6,
    width: 300,
  },
  eventbutton: {
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 5,
    width: 65,
    paddingLeft: 5,
    marginRight: 10,
    marginLeft: 4,
  },
  eventUserText: {},
  text: {
    // borderColor: "black",
    // borderWidth: 2,
    // marginLeft: 2,
    marginBottom: 4,
    // fontWeight: "bold",
    // justifyContent: "center",
    // alignSelf: "center",
  },
  // buttonText: {
  //   borderColor: "black",
  //   borderWidth: 2,
  //   marginBottom: 5,
  //   width: 65,
  //   paddingLeft: 5,
  //   marginRight: 10,
  // },
});
