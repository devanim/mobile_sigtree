import React from "react";
import { Text, View, Button } from "react-native";
import { BuildingTos } from "../../models/tos/building-tos";
import tosBuildingStyles from "./tos-building-styles";

const TosBuilding = (props: TosBuildingProps): JSX.Element => {
  return (
    <View style={tosBuildingStyles.container}>
      {
        props.tosList.map((item, idx) => (
          <Button key={idx} title={`${item.buildingName} - ${item.name}`} onPress={() => props.onTosSelect(item.url)}/>
        ))
      }
    </View>
  );
};

type TosBuildingProps = {
  tosList: BuildingTos[];
  onTosSelect: (tosUrl: string) => void;
}

export default TosBuilding;
