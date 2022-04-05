import { StyleSheet } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { withOrientation } from "react-navigation";
import { grey, greyBrown } from "../../styles/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    // justifyContent: "space-around",
    backgroundColor: "white",
  },
  sign: {
    color: "white",
    fontSize: 22,
  },
  signButton: {
    borderRadius: 7,
    width: 185,
    height: 45,
    backgroundColor: "#635d5c",
    justifyContent: "center",
    // justifyItems:'center',
    alignItems: "center",
    margin: 10,
  },
  textInput: {
    fontSize: 18,
    margin: 10,
    width: 185,
    height: 45,
    borderRadius: 1,
    // justifyContent: "space-around",
    backgroundColor: "#B4B5B8",
  },
  image: {
    width: 140,
    height: 70,
    marginBottom: 10,
  },
});
