import { StyleSheet } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { withOrientation } from "react-navigation";
import { grey, greyBrown } from "../../styles/colors";

export default StyleSheet.create({
  eventContainer: {
    //padding: 20,
    marginLeft: 20,

    //alignItems: "center",
    // justifyContent: "space-around",
  },
  eventTitle: {
    paddingTop: 20,
    paddingBottom: 20,
    //padding: 20,
    //alignItems: "center",
    // justifyContent: "space-around",
    fontSize: 24,
    fontWeight: "bold",
  },
  eventText: {
    paddingBottom: 10,
    fontSize: 18,
  },
  eventText2: {
    paddingBottom: 10,
    fontSize: 18,
    marginTop: 2,
  },
  eventText1: {
    fontWeight: "bold",
    fontSize: 18,
  },
  backButton: {
    borderColor: "black",
    borderWidth: 2,
    width: 150,
    marginLeft: 10,

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
});
