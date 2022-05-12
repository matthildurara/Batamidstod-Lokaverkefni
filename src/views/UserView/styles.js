import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  userInformation: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 5,
    width: 370,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  toolbarAction: {
    textAlign: "center",
    color: "black",
    backgroundColor: "#b0c4de",
  },
  footer: {
    flex: 1,
    alignSelf: "flex-end",
    bottom: 0,
  },
  toolbar: {
    flex: 1,
    alignSelf: "flex-start",
    marginTop: "auto",
  },
  logoutbutton: {
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 5,
    width: 65,
    paddingLeft: 5,
    marginRight: 38,
    alignSelf: "flex-end",
    right: 0,
  },
  username: {
    marginBottom: 5,
    fontSize: 15,
    marginLeft: 38,
  },
  eventUserItem: {
    borderBottomColor: "#949392",
    borderBottomWidth: 2,
    marginBottom: 6,
    width: 320,
  },
  userArrowRight: {
    right: 10,
    justifyContent: "center",
  },
  eventtextContainer: {
    flexDirection: "row",
    marginLeft: 15,
    justifyContent: "space-between",
  },
  eventbutton: {
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 5,
    width: 65,
    borderRadius: 4,
    paddingLeft: 5,
    marginTop: 5,
    marginRight: 10,
    marginLeft: 15,
  },
  eventUserText: {
    marginTop: 5,
  },
  text: {
    marginBottom: 2,
  },
  text1: {
    marginBottom: 2,
    fontWeight: "bold",
    fontSize: 15,
  },
  text2: {
    marginLeft: 4,
    marginBottom: 2,
  },
});
