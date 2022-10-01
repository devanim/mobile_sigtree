import { StyleSheet } from "react-native";

export const ticketFormStyles = StyleSheet.create({
  submit: {
    backgroundColor: "#5188E3",
    color: "white",
    textAlign: "center",
    marginHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 20,
  },
  twoOnRow: {
    flex: 2,
    flexDirection: "row"
  },
  smallDropdown: {
    width: "50%"
  },
  spacedView: {
    marginBottom: 40
  },
  multilineHeight: {
    height: 200
  }
});