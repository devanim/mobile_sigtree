import {  Pressable, View, Image } from "react-native";
import Text from "../../components/text";

import ArticleBrief from "src/models/article/article-brief";
import { articleBriefStyles } from "./article-brief-styles";

const ArticleBriefCard = (props: ArticleBriefCardProps): JSX.Element => {
  const onArticlePress = (articleId: number) => {
    props.onArticleSelected(articleId);
  }

  return (
    <Pressable onPress={() => onArticlePress(props.articleBrief.id)}>
      <View style={articleBriefStyles.containerCard}>
        <View style={articleBriefStyles.firstRow}>
          <Text style={articleBriefStyles.title} category="title1">
            {props.articleBrief.title}
          </Text>
          <Image style={articleBriefStyles.image} source={{uri: `${props.articleBrief.image}`}}/>
        </View>
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
  onArticleSelected: (articleId: number) => void;
}

export default ArticleBriefCard;