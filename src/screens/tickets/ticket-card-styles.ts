import { StyleSheet } from "react-native";

export const ticketCardStyles = StyleSheet.create({
  containerCard: {
    backgroundColor: "#fff",
    marginTop: 10,
    height: '15%'
  },
  button: {
    marginTop: 8,
  },
  content: {
    marginTop: 1,
    height: 350,
    width: '100%',
    overflow:'hidden'
  },
  text: {
    margin: 5,
    color: "#000",
  },
  title: {
    margin: 5,
    color: "#000",
    fontWeight: "bold"
  },
  textView: {
    flex: 2,
    padding: 1,
    flexDirection: "row"
  },
  titleView: {
    textAlign: "center",
    width: '100%',
    fontSize: 25
  },
  twoOnRow: {
    flex: 2,
    flexDirection: "row"
  },
  titleStyle: {
    textAlign: "center",
    width: "100%",
    fontSize: 25,
    fontWeight: "bold"
  }
});