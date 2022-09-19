import { StyleSheet } from "react-native";

export const briefStyles = StyleSheet.create({
  containerCard: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 15
  },
  idRow: {
    flex: 2,
    flexDirection: "row"
  },
  floorRow: {
    flex: 2,
    flexDirection: "row"
  },
  userSupplierRow: {
    flex: 4,
    flexDirection: "row"
  },
  statusRow: {
    flex: 2,
    flexDirection: "row"
  },
  ticketId: {
    fontWeight: "bold",
    marginRight: "auto"
  },
  priority: {
    marginLeft: "auto"
  },
  default: {
    margin: 8,
    color: "#000",
  },
  ticketName: {
    fontWeight: "bold"
  }
});