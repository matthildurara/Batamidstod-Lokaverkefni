import { StyleSheet } from "react-native";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { withOrientation } from "react-navigation";
import { grey, greyBrown } from "../../styles/colors";

export default StyleSheet.create({
  imgContainer: {
    paddingTop: 200,
    paddingBottom: 150,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C6DDEC",
  },
  container: {
    flex: 1,
    // padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C6DDEC",
  },
  sign: {
    // color: "white",
    color: "grey",
    //color: "lightgrey",
    fontSize: 22,
  },
  signButton: {
    borderRadius: 7,
    // width: 185,
    width: 185,
    height: 30,
    backgroundColor: "white",
    // backgroundColor: "#635d5c",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  //   buttonSign: {
  //   width: 140,
  //   font-size: 17px;
  //   border-radius: 10px;
  //   border-width: 1px;
  //   border-color: black;
  //   background-color: white;
  // },
  textInput: {
    fontSize: 18,
    margin: 10,
    width: 185,
    height: 40,
    borderRadius: 1,
    // backgroundColor: "#B4B5B8",
    backgroundColor: "white",
  },
  image: {
    width: 280,
    height: 140,
    paddingTop: 100,
    // width: 140,
    // height: 70,
    marginBottom: 10,
  },
});
