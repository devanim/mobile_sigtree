import { Button } from "@ui-kitten/components";
import { Text, View } from "react-native";
import { TOS } from "../../models/tos/tos";
import tosBuildingStyles from "./tos-building-styles";

const TosBuilding = (props: TosBuildingProps): JSX.Element => {
  return (
    <View style={tosBuildingStyles.container}>
      <Text style={tosBuildingStyles.text}>{props.buildingName}</Text>
      {
        props.tosList.map(item => (
          <Button children={item.name} onPress={() => props.onTosSelect(item.url)}/>
        ))
      }
    </View>
  );
};

type TosBuildingProps = {
  buildingName: string;
  tosList: TOS[];
  onTosSelect: (tosUrl: string) => void;
}

export default TosBuilding;