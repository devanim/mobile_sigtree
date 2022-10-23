import { StyleSheet } from "react-native";

export const userProfileStyle = StyleSheet.create({
  containerCard: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 0,
    
  },
  textBox: {
    marginLeft: '5%',
    color: "#000",
    width: '60%'
  },
  twoColumns: {
    flex: 2,
    flexDirection: "row"
  },
  labelBox: {
    margin: 8,
    color: "#000",
    width: '40%',
    fontWeight: "bold"
  }, 
  container : {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});