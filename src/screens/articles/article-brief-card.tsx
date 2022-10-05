import { Pressable, View, Image, Text } from "react-native";

import ArticleBrief from "src/models/article/article-brief";
import { articleBriefCardStyles } from "./article-brief-card-styles";

const ArticleBriefCard = (props: ArticleBriefCardProps): JSX.Element => {
  const localizedDate = new Date(props.articleBrief.timestamp).toLocaleDateString();

  const onArticlePress = (articleId: number) => {
    props.onArticleSelected(articleId);
  }

  return (
    <Pressable onPress={() => onArticlePress(props.articleBrief.id)}>
      <View style={articleBriefCardStyles.containerCard}>
        <Image style={articleBriefCardStyles.image} source={{uri: `${props.articleBrief.image}`}}/>
        <View style={articleBriefCardStyles.textView}>
          <Text style={articleBriefCardStyles.title}>{props.articleBrief.title}</Text>
          <Text style={articleBriefCardStyles.text}>{props.articleBrief.excerpt}</Text>
        </View>
        <View style={articleBriefCardStyles.dateView}>
          <Text style={articleBriefCardStyles.dateText}>{localizedDate}</Text>
        </View>
      </View>
    </Pressable>
  );
};

type ArticleBriefCardProps = {
  articleBrief: ArticleBrief;
  onArticleSelected: (articleId: number) => void;
}

export default ArticleBriefCard;