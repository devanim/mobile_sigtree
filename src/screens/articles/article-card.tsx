import { Image } from "react-native";
import Article from "../../models/article/article";
import Text from "../../components/text";
import { useEffect, useState } from "react";
import { mockIndividualArticlesList } from "./mock-articles";
import { Button } from "@ui-kitten/components";
import { articleCardStyles } from "./article-card-styles";
import { WebView } from "react-native-webview";
import { ScrollView } from "react-native-gesture-handler";

const ArticleCard = (props: ArticleCardProps): JSX.Element => {
  const [article, setArticle] = useState<Article | undefined>(undefined);

  useEffect(() => {
    //TODO - replace with axios call to back-end
    const requestResponse = mockIndividualArticlesList.find((item: Article) => item.id === props.articleId);

    if (!requestResponse) {
      alert(`Article with id ${props.articleId} could not be found`);
    }

    setArticle(requestResponse);
  }, []);

  return (
    <ScrollView style={articleCardStyles.containerCard}>
      <Button children={"Close"} onPress={() => props.onArticleClosed()}></Button>
      <Text style={articleCardStyles.title} category="title1">{article?.title}</Text>
      <Image style={articleCardStyles.image} source={{uri: `${article?.image}`}}/>
      <WebView style={articleCardStyles.content} source={{ html: article ? article.content : "<p>No data</p>"}}/>
    </ScrollView>
  );
};

type ArticleCardProps = {
  articleId: number;
  onArticleClosed: () => void;
}

export default ArticleCard;