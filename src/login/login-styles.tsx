import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  flatList: {
    alignItems: "center",
    paddingTop: 16,
  },
  btnBottom: {
    paddingBottom: 16,
  },
  bottomLayout: {
    flexDirection: "row",
    marginVertical: 24,
    alignItems: "center",
  },
  layout: {
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
  },
  topView: {
    marginHorizontal: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  content: {
    flexWrap: "wrap",
    flex: 1,
    alignSelf: "center",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginRight: 8,
    marginLeft: 28,
  },
  icon: {
    width: 48,
    height: 48,
  },
  topIcon: {
    tintColor: "icon-basic-color",
  },
});