import { Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import Card from "../../components/Card";
import ArticleBrief from "src/models/article/article-brief";
import { Images } from "assets/images";

const ArticleBriefCard = (props: ArticleBriefCardProps): JSX.Element => {
  const translationX = useSharedValue(0);
  const articleBrief = {
    id: props.articleBrief.id,
    title: props.articleBrief.title,
    description: props.articleBrief.excerpt,
    image: Images.shield, //change this to use actual image data
    color: "#4B9BAE"
  };

  return (
    <Card animationShared={translationX} details={articleBrief}></Card>
  );
};
/*<Text>
      {`Article Brief Details: id-${article.id}, title-${article.title}`}
    </Text>*/
interface ArticleBriefCardProps {
  articleBrief: ArticleBrief;
}

export default ArticleBriefCard;