import { Button } from "@ui-kitten/components";
import { Text, View } from "react-native";
import { TOS } from "../../models/tos/tos";

const TosBuilding = (props: TosBuildingProps): JSX.Element => {
  return (
    <View>
      <Text>{props.buildingName}</Text>
      {
        props.tosList.map(item => (
          <Button children={item.name}/>
        ))
      }
    </View>
  );
};

type TosBuildingProps = {
  buildingName: string;
  tosList: TOS[];
}

export default TosBuilding;