import { StyleSheet } from "react-native";

export const userProfileStyle = StyleSheet.create({
  containerCard: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 15
  },
  default: {
    margin: 8,
    color: "#000",
  },
  twoColumns: {
    flex: 2,
    flexDirection: "row"
  },
  twoRows: {
    flex: 2,
    flexDirection: "column"
  },
  allignLeft: {
    marginRight: "auto"
  },
  allignRight: {
    marginLeft: "auto"
  },
  borderBox: {
    borderColor: "#000",
    borderStyle: "solid"
  }
});