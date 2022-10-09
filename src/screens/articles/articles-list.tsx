import { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import axios from "axios";

import ArticleBrief from "../../models/article/article-brief";
import ArticleBriefCard from "./article-brief-card";
import { articleListStyles } from "./article-list-styles";
import Text from "../../components/text";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ArticleParamList } from "../../routing/route-screens";
import Error, { ErrorProps } from "../../components/error";
import { AUTH_MOCK, CONFIG, SCREEN_URL } from "../../models/mock-auth";
import ArticleListPayload from "../../models/article/article-list-payload";
import LocalizationContext from "../../localization/localization-context";

const ArticlesList = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { navigate } = useNavigation<NavigationProp<ArticleParamList>>();
  const [articles, setArticles] = useState<ArticleBrief[]>([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    setIsLoadingData(true);
    
    getArticles();

    setIsLoadingData(false);
  }, [page]);

  const getArticles = async () => {
    try {
      const maxIdFromState = getMaximumIdFromCurrentState();
      const reqUrl = `${SCREEN_URL.ARTICLES_URL}?fromId=${maxIdFromState}&count=${CONFIG.ITEMS_PER_PAGE}`;
      const response = await axios.get<ArticleListPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${AUTH_MOCK.TOKEN}` },
      });

      if (response.status == 200) {
        setArticles([...articles, ...response.data.data.articles ?? []]);
        setHasNextPage(response.data.data.more ?? false);
      } else {
        const friendlyMessage = t("FAILED_REQUEST");
        setError({
          friendlyMessage: friendlyMessage,
          errorMessage: response.data.error ?? "",
        });
      }
    } catch (error) {
      const friendlyMessage = t("FAILED_REQUEST");
      setError({
        friendlyMessage: friendlyMessage,
        errorMessage: JSON.stringify(error),
      });
    }
  };

  const fetchNextPage = () => {
    if (hasNextPage) {
      setPage(page + 1);
    }
  }

  const getMaximumIdFromCurrentState = () => {
    if (articles.length === 0) {
      return 0;
    }
    
    return Math.max(...articles.map(article => article.id));
  }

  const onArticleSelected = (articleId: number) => {
    navigate("ArticleScreen", { screen: "ArticleScreen", params: {articleId: articleId} });
  }

  const renderFooter = () => (
    <View style={articleListStyles.footerText}>
        {isLoadingData && <ActivityIndicator />}    
        {!hasNextPage && <Text>No more articles at the moment</Text>}
    </View>
  );
  
  const renderItem = useCallback(({ item }) => {
    return <ArticleBriefCard key={item.id} articleBrief={item} onArticleSelected={onArticleSelected}/>
  }, []);

  if (error) {
    return (
      <Error
        friendlyMessage={error.friendlyMessage}
        errorMessage={error.errorMessage}
      />
    );
  }

  if (!articles || articles.length == 0) {
    return <ActivityIndicator />;
  }

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

export default ArticlesList;