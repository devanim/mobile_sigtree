import { useCallback, useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";

import ArticleBrief from "../../models/article/article-brief";
import { ResponseStatus } from "../../utils/response-status-enum";
import ArticleBriefCard from "./article-brief-card";
import { articleListStyles } from "./article-list.styles";
import { paginationMock } from "./mock-articles";
import Text from "../../components/Text";

const ArticlesList = (props: ArticleListProps): JSX.Element => {
  const [articles, setArticles] = useState<ArticleBrief[] | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    setIsLoadingData(true);
    //TODO - replace with axios call to back-end
    const requestResponse = paginationMock[page];

    setIsLoadingData(false);
    if (requestResponse.status === ResponseStatus.fail) {
      alert("Could not retrieve data from back-end");
    }

    if (!articles) {
      setArticles(requestResponse.data?.articles);
      return;
    }

    setArticles([...articles, ...requestResponse.data?.articles ?? []]);
    setHasNextPage(requestResponse.data?.more ?? false);
  }, [page]);

  const fetchNextPage = () => {
    if (hasNextPage) {
      setPage(page + 1);
    }
  }

  const onArticleSelected = (articleId: number) => {
    props.onArticleSelected(articleId);
  }

  const renderFooter = () => (
    <View style={articleListStyles.footerText}>
        {isLoadingData && <ActivityIndicator />}    
        {!hasNextPage && <Text>No more articles at the moment</Text>}
    </View>
)
  
  const renderItem = useCallback(({ item }) => {
    return <ArticleBriefCard key={item.id} articleBrief={item} onArticleSelected={onArticleSelected}/>
  }, []);

  return (
    <FlatList
      data={articles || []}
      renderItem={renderItem}
      keyExtractor={(i, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      contentContainerStyle={articleListStyles.contentContainerStyle}
      onEndReachedThreshold={0.2}
      onEndReached={fetchNextPage}
      ListFooterComponent={renderFooter}
    />
  );
};

interface ArticleListProps {
  onArticleSelected: Function;
}

export default ArticlesList;