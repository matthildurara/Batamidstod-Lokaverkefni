import { StyleSheet } from "react-native";
import { blueBackground } from "../../styles/colors";

export default StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: blueBackground,
    paddingLeft: 10,
    paddingRight: 10,
    height: 80,
  },
  footerAction: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    height: 80,
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
