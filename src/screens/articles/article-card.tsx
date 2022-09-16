import { View } from "react-native";
import Article from "../../models/article/article";
import Text from "../../components/Text";
import { useEffect, useState } from "react";
import { mockIndividualArticlesList } from "./mock-articles";

const ArticleCard = (props: ArticleCardProps): JSX.Element => {
  const [article, setArticle] = useState<Article | undefined>(undefined);

  useEffect(() => {
    //TODO - replace with axios call to back-end
    const requestResponse = mockIndividualArticlesList.find((item: Article) => item.id === props.articleId);

    if (!requestResponse) {
      alert(`Article with id ${props.articleId} could not be found`)
    }

    setArticle(requestResponse);
  }, []);

  return (
    <View>
      <Text marginTop={48} category="title1">
        {`Title: ${article?.title}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Id: ${article?.id}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Tags: ${article?.tags}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Excerpt: ${article?.excerpt}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Image: ${article?.image}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Owners: ${article?.owners}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Content: ${article?.content}`}
      </Text>
    </View>
  );
};

interface ArticleCardProps {
  articleId: number;
}

export default ArticleCard;