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
  },
});
