import { StyleSheet } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { withOrientation } from "react-navigation";
import { grey, greyBrown } from "../../styles/colors";

export default StyleSheet.create({
  eventContainer: {
    //padding: 20,
    marginLeft: 8,
    marginRight: 8,
    paddingLeft: 8,
    paddingRight: 8,
    //alignItems: "center",
    // justifyContent: "space-around",
  },
  buttonEventView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
    // alignSelf: "center",
    height: 40,
    //alignContent: "center",

    //justifyContent: "center",

    width: 370,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  noButton: {
    fontWeight: "bold",
    marginRight: 19,
    fontSize: 15,
  },
  eventbuttonOff: {
    borderColor: "black",
    borderWidth: 2,
    width: 65,
    borderRadius: 4,
    height: 27,
    justifyContent: "center",

    //marginTop: 5,
    //marginBottom: 3,
    paddingRight: 7,
    marginRight: 19,
    fontSize: 16,
  },

  eventbuttonOn: {
    borderColor: "black",
    height: 27,
    justifyContent: "center",
    borderWidth: 2,
    width: 48,
    borderRadius: 4,
    fontSize: 16,
    marginRight: 19,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 5,
  },
  backbutton: {
    marginLeft: 15,
  },
  buttonView: {
    //marginBottom: 8,
    //marginTop: 8,
    marginLeft: 35,
  },
  eventTitle: {
    paddingTop: 10,
    paddingBottom: 10,

    //padding: 20,
    //alignItems: "center",
    // justifyContent: "space-around",
    fontSize: 24,
    fontWeight: "bold",
  },
  noEvent: {
    fontSize: 15,
    fontWeight: "bold",
  },
  eventText: {
    paddingBottom: 10,
    fontSize: 18,
    //marginLeft: 5,
  },
  eventText2: {
    paddingBottom: 10,
    fontSize: 18,
    marginTop: 2,
  },
  eventText1: {
    paddingTop: 20,
    fontWeight: "bold",
    fontSize: 18,
  },
  backButton: {
    borderColor: "black",
    borderWidth: 2,
    width: 130,
    marginLeft: 8,
    marginBottom: 1,
    borderRadius: 4,

    // flex: 1,
  },
  backButtonContainer: {
    // borderColor: "red",
    // borderWidth: 2,
    // flex: 1,

    flexDirection: "row",
    justifyContent: "center",
  },
  arrow: {
    alignSelf: "flex-start",
    right: 10,
  },
  textBack: {
    left: 10,
    top: 2,
    fontSize: 16,
  },
  // eventbutton: {
  //   borderColor: "black",
  //   borderWidth: 2,
  //   marginBottom: 5,
  //   width: 65,
  //   paddingLeft: 5,
  //   marginRight: 10,
  //   marginLeft: 4,
  // },
});
