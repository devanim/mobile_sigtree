import { StyleSheet } from "react-native";

export const dashboardStyles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  bottomTab: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 12,
    alignItems: "center",
    paddingHorizontal: 16,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    marginTop: 8,
  },
  content: {
    paddingBottom: 100,
  },
});