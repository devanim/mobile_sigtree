import React, { useContext, useEffect, useState } from "react";
import { Image, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

import LocalizationContext from "../../localization/localization-context";
import Error, { ErrorProps } from "../../components/error";
import Article from "../../models/article/article";
import { SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import ArticlePayload from "../../models/article/article-payload";

import { articleCardStyles } from "./article-card-styles";
import { useKeycloak } from "../../keycloak/useKeycloak";

const ArticleCard = (props: ArticleCardProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { token, realm } = useKeycloak();
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [article, setArticle] = useState<Article | undefined>(undefined);

  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    try {
      const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.ARTICLE_URL)}/${props.articleId}`;
      const response = await axios.get<ArticlePayload>(reqUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        if (response.data.data.length > 0) {
          setArticle(response.data.data[0]);
        }
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

  if (error) {
    return (
      <Error
        friendlyMessage={error.friendlyMessage}
        errorMessage={error.errorMessage}
      />
    );
  }

  if (!article) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={articleCardStyles.containerCard}>
      <Image style={articleCardStyles.image} source={{uri: `${article?.image}`}}/>
      <Text style={articleCardStyles.title}>{article?.title}</Text>
      <WebView style={articleCardStyles.content} source={{ html: article ? article.content : t("NO_DATA_HTML")}}/>
    </ScrollView>
  );
};

type ArticleCardProps = {
  articleId: number;
}

export default ArticleCard;