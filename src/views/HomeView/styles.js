import { StyleSheet } from "react-native";
import { buildUnavailableHoursBlocks } from "react-native-calendars/src/timeline/Packer";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { AuthProvider } from "../../../authContext";
import { grey, greyBrown } from "../../styles/colors";

export default StyleSheet.create({
  container: {
    flexDirection: "column",

    flex: 1,
    // padding:20,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  toolbarAction: {
    // width:100,
    textAlign: "center",
    color: "black",
    backgroundColor: "#b0c4de",
  },
  calander: {
    //  height:400,
    paddingTop: 10,
    flex: 1,
    //
    width: 400,
  },
  footer: {
    flex: 1,
    alignSelf: "flex-end",
    // position:'absolute',
    // bottom:0,
  },
  toolbar: {
    flex: 1,
    alignSelf: "flex-start",
    // flex:2,
    marginTop: "auto",
  },
  event: {
    // borderColor: "black",
    // borderWidth: 2,
    marginTop: 5,
    width: 300,
  },
  eventbutton: {
    borderColor: "black",
    borderWidth: 2,
    width: 70,
    borderRadius: 4,
    marginTop: 3,
    marginBottom: 3,
  },
  eventContainer: {
    borderBottomColor: "#949392",
    borderBottomWidth: 2,
    marginBottom: 6,
    width: 300,
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
});
