import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import ArticleBrief from "../../models/article/article-brief";
import { ResponseStatus } from "../../utils/response-status-enum";
import ArticleBriefCard from "./article-brief-card";
import { articleListStyles } from "./article-list.styles";
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
  
  const renderItem = useCallback(({ item }) => {
    return <ArticleBriefCard key={item.id} articleBrief={item} onArticleSelected={onArticleSelected}/>
  }, []);

  return (
    // <ScrollView>
    //   {mapArticles()}
    // </ScrollView>
    <FlatList
      data={articles || []}
      renderItem={renderItem}
      keyExtractor={(i, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      contentContainerStyle={articleListStyles.contentContainerStyle}
    />
  );
};

interface ArticleListProps {
  onArticleSelected: Function;
}

export default ArticlesList;