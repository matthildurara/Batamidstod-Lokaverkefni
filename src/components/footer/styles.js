import { StyleSheet } from "react-native";
import { myGray } from "../../styles/colors";

export default StyleSheet.create({
  footer: {
    // display:grid,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C6DDEC",
    // bottom:0,
    paddingLeft: 10,
    paddingRight: 10,
    // marginBottom: 10,
    //alignSelf: "flex-end",
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    height: 80,
  },
  footerAction: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    height: 80,

    //flexDirection: "row",

    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  textButton: {
    alignContent: "center",
    justifyContent: "center",
  },
  buttonView: {
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    paddingBottom: 6,
    alignContent: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 13,
  },
});
