import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView, Text } from "react-native";
import { Appbar, Card, Title } from 'react-native-paper';
import { RefreshControl } from "react-native-web-refresh-control";
import { AppStackParamList } from "src/routing/route-screens";

import Carousel from "../../components/carousel/carousel";
import RoundChart from "../../components/chart/round-chart";
import Error, { ErrorProps } from "../../components/error";
import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import ArticleBrief from "../../models/article/article-brief";
import ArticleListPayload from "../../models/article/article-list-payload";
import { CONFIG, SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import Statistics from "../../models/dashboard/statistics";
import StatisticsPayload from "../../models/dashboard/statistics-payload";
import { TicketBrief } from "../../models/ticket/ticket-brief";
import { TicketListPayload } from "../../models/ticket/ticket-list-payload";

const DashboardStatistics = (): JSX.Element => {
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [articles, setArticles] = useState<ArticleBrief[]>([]);
  const [tickets, setTickets] = useState<TicketBrief[]>([]);
  const [statistics, setStatistics] = useState<Statistics | undefined>(undefined);

  useEffect(() => {
    setIsLoadingData(true);

    getArticles();

    setIsLoadingData(false);
  }, []);

  useEffect(() => {
    setIsLoadingData(true);

    getTickets();

    setIsLoadingData(false);
  }, []);

  useEffect(() => {
    setIsLoadingData(true);

    getStatistics();

    setIsLoadingData(false);
  }, []);

  const getArticles = async () => {
    try {
      const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.ARTICLES_URL)}?count=${CONFIG.ITEMS_PER_CAROUSEL}`;
      const response = await axios.get<ArticleListPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        setArticles([...articles, ...response.data.data.articles ?? []]);
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

  const getTickets = async () => {
    try {
      const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.TICKETS_URL)}?count=${CONFIG.ITEMS_PER_CAROUSEL}`;
      const response = await axios.get<TicketListPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        setTickets([...tickets, ...response.data.data.tickets ?? []]);
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

  const getStatistics = async () => {
    try {
      const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.STATISTICS_URL)}`;
      const response = await axios.get<StatisticsPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        setStatistics(response.data.data.tickets);
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

  const { t } = useContext(LocalizationContext);
  const { token, realm, logout } = useKeycloak();
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  const onArticleSelected = (articleId: number) => {
    navigate("ArticleScreen", { screen: "ArticleScreen", params: { articleId: articleId } });
  }

  const onTicketSelected = (ticketId: number) => {
    navigate("TicketScreen", { screen: "TicketScreen", params: { ticketId: ticketId } });
  }

  const articleCarouselData = articles?.map((article: ArticleBrief, idx: number) => {
    return {
      id: article.id,
      title: article.title,
      onItemSelected: onArticleSelected
    }
  });

  const ticketCarouselData = tickets?.map((ticket: TicketBrief, idx: number) => {
    return {
      id: ticket.id,
      title: ticket.idtracking,
      onItemSelected: onTicketSelected
    }
  });

  if (error) {
    return (
      <Error
        friendlyMessage={error.friendlyMessage}
        errorMessage={error.errorMessage}
      />
    );
  }

  const onLogout = () => {
    logout();
    navigate("HomeScreen", { screen: "HomeScreen" });
  }

  return (
    <Layout style={styles.container} level='1'>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.BackAction disabled />
        <Appbar.Content title={t("DASHBOARD_TITLE").toUpperCase()} />
        <Appbar.Action icon="logout" onPress={onLogout} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl tintColor="#CCC" />}>
        <Carousel name={t("ARTICLES_TITLE")} data={articleCarouselData ?? []} />
        <Carousel name={t("TICKETS_TITLE")} data={ticketCarouselData ?? []} />
        <Card style={{ margin: '5%', backgroundColor: '#fff' }} mode='contained'>
          <Card.Content>
            <Title>{t("STATISTICS_TITLE")}</Title>
            {statistics ? <RoundChart data={statistics} /> : <></>}
            {statistics ? <Text style={styles.text}>{t("PRIORITY_LOW_COUNT")} {statistics.count_low}</Text> : <></>}
            {statistics ? <Text style={styles.text}>{t("PRIORITY_MEDIUM_COUNT")} {statistics.count_medium}</Text> : <></>}
            {statistics ? <Text style={styles.text}>{t("PRIORITY_HIGH_COUNT")} {statistics.count_high}</Text> : <></>}
            {statistics ? <Text style={styles.text}>{t("TOTAL_TICKETS_COUNT")} {statistics.count_all}</Text> : <></>}
          </Card.Content>
        </Card>
      </ScrollView>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingBottom: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFF"
  }
});
export default DashboardStatistics;