import { useEffect, useState } from "react";

import { ScrollView } from "react-native-gesture-handler";
import ArticleBrief from "src/models/article/article-brief";
import ArticleBriefCard from "./article-brief-card";
import { mockArticles } from "./mock-articles";

const ArticlesList = (): JSX.Element => {
  const [articles, setArticles] = useState<ArticleBrief[] | undefined>(undefined);

  useEffect(() => {
    //TODO - replace with axios call to back-end
    const requestResponse = mockArticles;

    if (requestResponse.status !== "ok") {
      alert("Could not retrieve data from back-end");
    }

    setArticles(requestResponse.data?.articles);
  }, []);

  const mapArticles = () => {
    return articles?.map(article => {
      return <ArticleBriefCard key={article.id} articleBrief={article}/>
    });
  }

  return (
    <ScrollView>
      {mapArticles()}
    </ScrollView>
  );
};

export default ArticlesList;