import { StyleSheet } from "react-native";
import { gray } from "../../styles/colors";

export default StyleSheet.create({
  toolbar: {
    // display:grid,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    // backgroundColor:'#b0c4de',
    borderBottomColor: "#b4b5b8",
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
