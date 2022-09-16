import {  Pressable, View } from "react-native";
import Text from "../../components/Text";

import ArticleBrief from "src/models/article/article-brief";

const ArticleBriefCard = (props: ArticleBriefCardProps): JSX.Element => {
  const onArticlePress = (articleId: number) => {
    alert(`Pressed article with value ${articleId}`);
  }

  return (
    <Pressable onPress={() => onArticlePress(props.articleBrief.id)}>
      <View>
        <Text marginTop={48} category="title1">
          {props.articleBrief.title}
        </Text>
        <Text marginTop={8} category="call-out" status="placeholder">
          {props.articleBrief.id}
        </Text>
        <Text marginTop={8} category="call-out" status="placeholder">
          {props.articleBrief.excerpt}
        </Text>
        <Text marginTop={8} category="call-out" status="placeholder">
          {props.articleBrief.tags}
        </Text>
        <Text marginTop={8} category="call-out" status="placeholder">
          {props.articleBrief.timestamp}
        </Text>
      </View>
    </Pressable>
  );
};

interface ArticleBriefCardProps {
  articleBrief: ArticleBrief;
}

export default ArticleBriefCard;