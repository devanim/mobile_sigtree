import { StyleSheet } from "react-native";

export const articleCardStyles = StyleSheet.create({
  containerCard: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 15
  },
  image: {
    width: 25,
    height: 25
  },
  title: {
    marginRight: "auto",
    color: "#000"
  },
  content: {
    height: 350,
    width: 350,
    overflow:'hidden'
  }
})