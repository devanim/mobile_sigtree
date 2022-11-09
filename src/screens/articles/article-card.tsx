import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Text } from 'react-native-paper';
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { webviewContent } from "../../utils/content"

import Error, { ErrorProps } from "../../components/error";
import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import Article from "../../models/article/article";
import ArticlePayload from "../../models/article/article-payload";
import { SCREEN_URL, SigtreeConfiguration } from "../../models/config";

const ArticleCard = (props: ArticleCardProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { token, realm } = useKeycloak();
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [webViewHeight, setWebViewHeight] = React.useState(20);

  const onGetHeight = (event: WebViewMessageEvent) => {
    setWebViewHeight(Number(event.nativeEvent.data))
  }

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
    <View style={styles.container}>
      <ScrollView>
        <Text variant="headlineMedium" style={{ flex: 0.1 }}>{article?.title}</Text>
        <Image style={styles.image} source={{ uri: `${article?.image}` }} />
        <View>
          <WebView 
            scrollEnabled={false}
            javaScriptEnabled={true}
            scalesPageToFit={true}
            onMessage={onGetHeight} 
            style={[styles.content, { flexGrow: 1, height: webViewHeight }]} 
            source={{ html: article ? webviewContent(article.content) : t("NO_DATA_HTML") }} />
        </View>
      </ScrollView>
    </View>
  );
};

type ArticleCardProps = {
  articleId: number;
}

const styles = StyleSheet.create({
  container: {
    padding: 15
    // alignContent: "center",
    // flexGrow: 1,
    // flexDirection: "column",
    // marginHorizontal: '5%'
  },
  image: {
    // flex: 0.2,
    // alignContent: "center",
    minHeight: 200,
    width: '100%',
    resizeMode: 'contain',
  },
  content: {
    minHeight: 300,
    minWidth: 400,
    flex: 0.3
  }
})

export default ArticleCard;
