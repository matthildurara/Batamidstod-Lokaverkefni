import { StyleSheet } from "react-native";
import { buildUnavailableHoursBlocks } from "react-native-calendars/src/timeline/Packer";
import {
  backgroundColor,
  borderLeftColor,
} from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { AuthProvider } from "../../../authContext";
import { grey, greyBrown } from "../../styles/colors";

export default StyleSheet.create({
  container: {
    //flexDirection: "column",
    flex: 1,

    // padding:20,
    //alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  homeViewContainer: {
    flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
  },

  toolbarAction: {
    // width:100,
    textAlign: "center",
    color: "black",
    backgroundColor: "#b0c4de",
  },
  // calander: {
  //   flex: 1,
  //   //
  // },
  cont: {
    flex: 1,
  },
  eventItemContainer: {
    flexDirection: "row",
    //width: 300,
    marginLeft: 20,

    justifyContent: "space-between",
  },
  arrowRight: {
    // alignSelf: "flex-end",
    right: 10,
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    alignSelf: "flex-end",
    // position:'absolute',
    // bottom:0,
  },
  calander: {},
  toolbar: {
    flex: 1,
    alignSelf: "flex-start",
    // flex:2,
    marginTop: "auto",
  },
  eventButton: {
    marginLeft: 20,
    marginBottom: 5,
    // paddingLeft: 5,
  },
  event: {
    // borderColor: "black",
    // borderWidth: 2,
    marginTop: 5,
    width: 300,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 3,
  },
  eventbuttonOff: {
    borderColor: "black",
    borderWidth: 2,
    width: 65,
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 3,
    paddingLeft: 7,
  },
  eventbuttonOn: {
    borderColor: "black",
    borderWidth: 2,
    width: 48,
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 3,
    paddingLeft: 7,
  },
  eventContainer: {
    borderBottomColor: "#949392",
    borderBottomWidth: 2,
    marginBottom: 6,
    width: 320,
    alignSelf: "center",
  },
  noEvent: {
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 20,
    // marginLeft:
  },
  notButton: {
    fontWeight: "bold",
  },
  // overview: {
  //   height: 370,
  // },
});
