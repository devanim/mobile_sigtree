import {  Pressable, View } from "react-native";
import Text from "../../components/Text";

import ArticleBrief from "src/models/article/article-brief";
import { articleBriefStyles } from "./article-brief-styles";

const ArticleBriefCard = (props: ArticleBriefCardProps): JSX.Element => {
  const onArticlePress = (articleId: number) => {
    props.onArticleSelected(articleId);
  }

  return (
    <Pressable onPress={() => onArticlePress(props.articleBrief.id)}>
      <View style={articleBriefStyles.containerCard}>
        <Text style={articleBriefStyles.default} category="title1">
          {props.articleBrief.title}
        </Text>
        <Text style={articleBriefStyles.default} category="call-out" status="placeholder">
          {props.articleBrief.excerpt}
        </Text>
        <Text style={articleBriefStyles.default} category="call-out" status="placeholder">
          {props.articleBrief.timestamp}
        </Text>
      </View>
    </Pressable>
  );
};

interface ArticleBriefCardProps {
  articleBrief: ArticleBrief;
  onArticleSelected: Function;
}

export default ArticleBriefCard;