import { Button, Text, View } from "react-native";
import listFilteringStyles from "./list-filtering-styles";

const ListFiltering = (props: ArticleFilteringProps): JSX.Element => {
  const onCancel = () => {
    props.onCancel();
  }

  return (
    <View style={listFilteringStyles.container}>
      <Text style={listFilteringStyles.text}>{props.tag}</Text>
      <Button title="X" onPress={onCancel}/>
    </View>
  );
};

type ArticleFilteringProps = {
  tag: string;
  onCancel: () => void;
}

export default ListFiltering;