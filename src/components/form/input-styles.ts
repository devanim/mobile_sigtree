import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
    color: '#c0cbd3',
  },
  label: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c0cbd3',
  },
  textError: {
    color: '#fc6d47',
    fontSize: 14,
  }
});
