import { StyleSheet } from "react-native";

export const ticketCardStyles = StyleSheet.create({
  containerCard: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 15,
    height: 500
  },
  button: {
    marginTop: 8,
  },
  content: {
    height: 350,
    width: 350,
    overflow:'hidden'
  },
  textStyle: {
    color: "#000",
    marginTop: 5,
    marginRight: 5
  },
  threeOnRow: {
    flex: 3,
    flexDirection: "row"
  },
  twoOnRow: {
    flex: 2,
    flexDirection: "row"
  }
});