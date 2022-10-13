import { Pressable, View, Image, Text } from "react-native";

import ArticleBrief from "src/models/article/article-brief";
import { articleBriefCardStyles } from "./article-brief-card-styles";

const ArticleBriefCard = (props: ArticleBriefCardProps): JSX.Element => {
  const localizedDate = new Date(
    props.articleBrief.timestamp
  ).toLocaleDateString();

  const onArticlePress = (articleId: number) => {
    props.onArticleSelected(articleId);
  };

  const onTagPress = (tag: string) => {
    props.onTagSelected(tag);
  }

  return (
    <>
      <Pressable onPress={() => onArticlePress(props.articleBrief.id)}>
        <View style={articleBriefCardStyles.containerCard}>
          <Image
            style={articleBriefCardStyles.image}
            source={{ uri: `${props.articleBrief.image}` }}
          />
          <View style={articleBriefCardStyles.textView}>
            <Text style={articleBriefCardStyles.title}>
              {props.articleBrief.title}
            </Text>
            <Text style={articleBriefCardStyles.text}>
              {props.articleBrief.excerpt}
            </Text>
          </View>
          <View style={articleBriefCardStyles.dateView}>
            <Text style={articleBriefCardStyles.dateText}>{localizedDate}</Text>
          </View>
        </View>
      </Pressable>
      <View style={articleBriefCardStyles.tagsContainer}>
        {props.articleBrief.tagsArray.map((item) => (
          <Pressable key={item} style={articleBriefCardStyles.tagsPressable} onPress={() => onTagPress(item)}>
            <Text style={articleBriefCardStyles.text}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
};

type ArticleBriefCardProps = {
  articleBrief: ArticleBrief;
  onArticleSelected: (articleId: number) => void;
  onTagSelected: (tag: string) => void;
};

export default ArticleBriefCard;
