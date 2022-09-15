import { Text } from "react-native";
import ArticleBrief from "src/models/article/article-brief";

const ArticleBriefCard = (props: ArticleBriefCardProps): JSX.Element => {
  const article = props.articleBrief;

  return (
    <Text>
      {`Article Brief Details: id-${article.id}, title-${article.title}`}
    </Text>
  );
};

interface ArticleBriefCardProps {
  articleBrief: ArticleBrief;
}

export default ArticleBriefCard;