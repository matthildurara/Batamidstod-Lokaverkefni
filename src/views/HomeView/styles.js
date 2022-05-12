import { StyleSheet } from "react-native";
import { greyBrown } from "../../styles/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  homeViewContainer: {
    flex: 1,
  },

  toolbarAction: {
    textAlign: "center",
    color: "black",
    backgroundColor: "#b0c4de",
  },
  cont: {
    flex: 1,
  },
  eventItemContainer: {
    flexDirection: "row",
    marginLeft: 20,

    justifyContent: "space-between",
  },
  arrowRight: {
    right: 10,
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    alignSelf: "flex-end",
  },
  calander: {},
  toolbar: {
    flex: 1,
    alignSelf: "flex-start",
    marginTop: "auto",
  },
  eventButton: {
    marginLeft: 20,
    marginBottom: 5,
  },
  event: {
    marginTop: 5,
    width: 300,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 3,
  },
  eventbuttonOff: {
    borderColor: "black",
    borderWidth: 2,
    width: 65,
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 3,
    paddingLeft: 7,
  },
  eventbuttonOn: {
    borderColor: "black",
    borderWidth: 2,
    width: 54,
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 3,
    paddingLeft: 7,
  },
  eventContainer: {
    borderBottomColor: "#949392",
    borderBottomWidth: 2,
    marginBottom: 6,
    width: 320,
    alignSelf: "center",
  },
  noEvent: {
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 20,
  },
  notButton: {
    fontWeight: "bold",
  },
});
