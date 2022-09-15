import { StyleSheet } from "react-native";

const cardStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textView: {
    marginRight: 32,
  },
  image: {
    borderRadius: 16,
    width: 50,
    height: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default cardStyles;
