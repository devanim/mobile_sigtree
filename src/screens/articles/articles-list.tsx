import { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";

import { ArticleParamList } from "../../routing/route-screens";
import LocalizationContext from "../../localization/localization-context";
import Text from "../../components/text";
import Error, { ErrorProps } from "../../components/error";
import ArticleListPayload from "../../models/article/article-list-payload";
import ArticleBrief from "../../models/article/article-brief";
import { CONFIG, SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import ArticleBriefCard from "./article-brief-card";

import { articleListStyles } from "./article-list-styles";
import ListFiltering from "../../components/list-filtering/list-filtering";
import { useKeycloak } from "../../keycloak/useKeycloak";

const ArticlesList = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { navigate } = useNavigation<NavigationProp<ArticleParamList>>();
  const { token, realm } = useKeycloak();

  const [articles, setArticles] = useState<ArticleBrief[]>([]);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [resetList, setResetList] = useState(false);
  const [maxId, setMaxId] = useState(0);

  useEffect(() => {
    setIsLoadingData(true);

    resetState();
    getArticles();

    setIsLoadingData(false);
  }, [page, selectedTag]);

  const resetState = () => {
    if (resetList) {
      setArticles([]);
      setMaxId(0);
      setResetList(false);
    }
  }

  const getArticles = async () => {
    try {
      const filteringTag = selectedTag.length > 0 ? `tag=${selectedTag}&` : "";
      const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.ARTICLES_URL)}?${filteringTag}fromId=${maxId}&count=${CONFIG.ITEMS_PER_PAGE}`;
      const response = await axios.get<ArticleListPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.status == 200) {
        //TODO - pagination is broken because of this
        //setArticles([...articles, ...(response.data.data.articles ?? [])]);
        setArticles(response.data.data.articles ?? []);
        setMaxId(getMaximumIdFromCurrentState());
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
  };

  const getMaximumIdFromCurrentState = () => {
    if (articles.length === 0) {
      return 0;
    }

    return Math.max(...articles.map((article) => article.id));
  };

  const onArticleSelected = (articleId: number) => {
    navigate("ArticleScreen", {
      screen: "ArticleScreen",
      params: { articleId: articleId },
    });
  };

  const onTagSelected = (tag: string) => {
    setSelectedTag(tag);
    setResetList(true);
    setMaxId(0);
  };

  const onCancelFiltering = () => {
    setResetList(true);
    setSelectedTag("");
    setMaxId(0);
  }

  const renderFooter = () => (
    <View style={articleListStyles.footerText}>
      {isLoadingData && <ActivityIndicator />}
      {!hasNextPage && <Text>No more articles at the moment</Text>}
    </View>
  );

  const renderItem = useCallback(({ item }) => {
    return (
      <ArticleBriefCard
        key={item.id}
        articleBrief={item}
        onArticleSelected={onArticleSelected}
        onTagSelected={onTagSelected}
      />
    );
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
    <>
      {selectedTag ? <ListFiltering tag={selectedTag} onCancel={onCancelFiltering}/> : <></>}
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
    </>
  );
};

export default ArticlesList;
