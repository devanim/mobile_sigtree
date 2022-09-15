import { useEffect, useState } from "react";

import { Text, View } from "react-native";
import ArticleBrief from "src/models/article/article-brief";
import ArticleListPayload from "src/models/article/article-payload";
import ArticleBriefCard from "./article-brief-card";

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
      return <ArticleBriefCard articleBrief={article}/>
    });
  }

  return (
    <View>
      {mapArticles()}
    </View>
  );
};

const mockArticles: ArticleListPayload = {
  status: "ok",
  message: "A message for the user",
  data: {
    articles: [
      {
        id: 1,
        tags: "tag1,tag2",
        title: "Title T1",
        excerpt: "Short description for article 1...",
        image: "data:image/jpeg;base64,...",
        timestamp: "2022-09-15T14:42:16.067Z"
      }, {
        id: 2,
        tags: "tag2",
        title: "Title T2",
        excerpt: "Short description for article 2...",
        image: "data:image/jpeg;base64,...",
        timestamp: "2022-09-14T14:42:16.067Z"
      }, {
        id: 3,
        tags: "tag1",
        title: "Title T3",
        excerpt: "Short description for article 3...",
        image: "data:image/jpeg;base64,...",
        timestamp: "2022-09-14T12:42:16.067Z"
      }, {
        id: 4,
        tags: "tag1,tag2, tag3",
        title: "Title T4",
        excerpt: "Short description for article 4...",
        image: "data:image/jpeg;base64,...",
        timestamp: "2022-09-14T14:43:16.067Z"
      }, {
        id: 5,
        tags: "tag1,tag3",
        title: "Title T5",
        excerpt: "Short description for article 5...",
        image: "data:image/jpeg;base64,...",
        timestamp: "2022-08-14T14:42:16.067Z"
      }, {
        id: 6,
        tags: "tag3",
        title: "Title T6",
        excerpt: "Short description article 6...",
        image: "data:image/jpeg;base64,...",
        timestamp: "2022-09-11T14:42:16.067Z"
      }
    ],
    more: true
  }
};

export default ArticlesList;