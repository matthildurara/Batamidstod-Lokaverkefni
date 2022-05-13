import { StyleSheet } from "react-native";

export default StyleSheet.create({
  eventContainer: {
    marginLeft: 8,
    marginRight: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  buttonEventView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
    height: 40,
    width: 370,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  noButton: {
    fontWeight: "bold",
    marginRight: 19,
    fontSize: 15,
  },
  eventbuttonOff: {
    borderColor: "black",
    borderWidth: 2,
    width: 65,
    borderRadius: 4,
    height: 27,
    justifyContent: "center",
    paddingRight: 7,
    marginRight: 19,
    fontSize: 16,
  },

  eventbuttonOn: {
    borderColor: "black",
    height: 27,
    justifyContent: "center",
    borderWidth: 2,
    width: 48,
    borderRadius: 4,
    fontSize: 16,
    marginRight: 19,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 5,
  },
  backbutton: {
    marginLeft: 15,
  },
  buttonView: {
    marginLeft: 35,
  },
  eventTitle: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  noEvent: {
    fontSize: 15,
    fontWeight: "bold",
  },
  iconNameCont: {
    flexDirection: "row",
    marginTop: 5,
  },
  eventText: {
    paddingBottom: 10,
    fontSize: 18,
    marginBottom: 5,
  },
  eventText2: {
    paddingBottom: 10,
    fontSize: 18,
    marginTop: 2,
  },
  eventText1: {
    paddingTop: 20,
    fontWeight: "bold",
    fontSize: 18,
  },
  backButton: {
    borderColor: "black",
    borderWidth: 2,
    width: 130,
    marginLeft: 8,
    marginBottom: 1,
    borderRadius: 4,
  },
  backButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  arrow: {
    alignSelf: "flex-start",
    right: 10,
  },
  textBack: {
    left: 10,
    top: 2,
    fontSize: 16,
  },
});
