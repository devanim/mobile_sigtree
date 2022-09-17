import { useEffect, useState } from "react";

import { ScrollView } from "react-native-gesture-handler";
import ArticleBrief from "../../models/article/article-brief";
import { ResponseStatus } from "../../utils/response-status-enum";
import ArticleBriefCard from "./article-brief-card";
import { mockArticles } from "./mock-articles";

const ArticlesList = (props: ArticleListProps): JSX.Element => {
  const [articles, setArticles] = useState<ArticleBrief[] | undefined>(undefined);

  useEffect(() => {
    //TODO - replace with axios call to back-end
    const requestResponse = mockArticles;

    if (requestResponse.status === ResponseStatus.fail) {
      alert("Could not retrieve data from back-end");
    }

    setArticles(requestResponse.data?.articles);
  }, []);

  const onArticleSelected = (articleId: number) => {
    props.onArticleSelected(articleId);
  }

  const mapArticles = () => {
    return articles?.map(article => {
      return <ArticleBriefCard key={article.id} articleBrief={article} onArticleSelected={onArticleSelected}/>
    });
  }

  return (
    <ScrollView>
      {mapArticles()}
    </ScrollView>
  );
};

interface ArticleListProps {
  onArticleSelected: Function;
}

export default ArticlesList;