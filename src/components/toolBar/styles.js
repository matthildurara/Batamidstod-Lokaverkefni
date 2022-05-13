import { StyleSheet } from "react-native";
import { blueBackground } from "../../styles/colors";

export default StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    borderBottomColor: "#C6DDEC",
    backgroundColor: blueBackground,
    borderBottomWidth: 1,
    top: 0,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  toolbarActionMenu: {
    alignItems: "center",
    left: 0,
  },
  toolbarActionName: {
    flex: 1,
    alignItems: "center",
  },
  toolbarText: {
    fontSize: 18,
    paddingTop: 30,
    fontWeight: "bold",
  },
});
