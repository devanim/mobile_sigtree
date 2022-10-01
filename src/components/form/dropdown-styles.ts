import { StyleSheet } from "react-native";

export const dropdownStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
  },
  label: {
    paddingVertical: 5,
    fontSize: 16,
    marginBottom: 15,
    height: 25,
    fontWeight: 'bold',
    color: '#c0cbd3',
  },
  placeholderStyles: {
    color: "grey",
  },
  dropdown: {
    marginBottom: 15,
    borderColor: "#B7B7B7",
    height: 50,
  },
  textError: {
    color: '#fc6d47',
    fontSize: 14,
  },
});