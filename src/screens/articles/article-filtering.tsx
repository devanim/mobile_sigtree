import { Button, Text, View } from "react-native";
import articleFilteringStyles from "./article-filtering-styles";

const ArticleFiltering = (props: ArticleFilteringProps): JSX.Element => {
  const onCancel = () => {
    props.onCancel();
  }

  return (
    <View style={articleFilteringStyles.container}>
      <Text style={articleFilteringStyles.text}>{props.tag}</Text>
      <Button title="X" onPress={onCancel}/>
    </View>
  );
};

type ArticleFilteringProps = {
  tag: string;
  onCancel: () => void;
}

export default ArticleFiltering;