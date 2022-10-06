import { StyleSheet } from "react-native";

export const articleCardStyles = StyleSheet.create({
  containerCard: {
    backgroundColor: "#fff",
    flex: 3,
    flexDirection: "row"
  },
  image: {
    flex: 1,
    alignContent: "center",
    width: '100%',
    resizeMode: 'contain',
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
    width: '100%'
  },
  content: {
    height: 400,
    width: 400,
    overflow:'hidden'
  }
})