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
    alignContent: "center",
    justifyContent: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
  },
  content: {
    height: 350,
    width: 350,
    overflow:'hidden'
  }
})