import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
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
  notificationContainer: {
    borderColor: "black",
    borderWidth: 2,
    paddingLeft: 5,
    paddingRight: 5,
    padding: 5,
    marginBottom: 10,
  },
  list: {
    flexDirection: "column-reverse",
  },
});
