import { StyleSheet } from "react-native";

export const articleBriefCardStyles = StyleSheet.create({
  containerCard: {
    backgroundColor: "#fff",
    width: "100%",
    // marginBottom: 1,
    borderBottomColor: "#000",
    flex: 2,
    flexDirection: "row"
  },
  text: {
    margin: 5,
    color: "#000",
  },
  dateText: {
    margin: 5,
    color: "#000",
    fontSize: 10,
  }, 
  title: {
    margin: 5,
    color: "#000",
    fontWeight: "bold"
  }, 
  textView: {
    flex: 3,
    padding: 5,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    width: '25%',
    height: '100%',
    resizeMode: 'contain',
  },
  dateView: {
    width: '17%',
    alignContent: "center",
    marginTop: '5%'
  },
  tagsContainer: {
    flex: 4,
    flexDirection: "row",
    backgroundColor: "#FFF",
    marginBottom: 2,
    borderWidth: 1,
    borderColor: "#000"
  },
  tagsPressable: {
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 1
  }
});