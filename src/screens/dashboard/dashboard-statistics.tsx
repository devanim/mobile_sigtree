import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView, Text, View } from "react-native";
import { Card, Title } from 'react-native-paper';
import { RefreshControl } from "react-native-web-refresh-control";
import { AppStackParamList } from "src/routing/route-screens";

import AppBar from "../../components/appbar/appbar";
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
      <AppBar title={t("DASHBOARD_TITLE").toUpperCase()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl tintColor="#CCC" />}>
        <Carousel name={t("ARTICLES_TITLE")} nodata={t("NO_DATA")} data={articleCarouselData ?? []} />
        <Carousel name={t("TICKETS_TITLE")} nodata={t("NO_DATA")} data={ticketCarouselData ?? []} />
        <Card style={{ margin: '5%', backgroundColor: '#fff' }} mode='contained'>
          <Card.Content>
            <Title>{t("STATISTICS_TITLE")}</Title>
            {statistics && statistics.count_all !== 0 ?
              <View style={{ flexDirection: 'column' }}>
                <RoundChart data={statistics} />
                <View style={{ flexDirection: 'column' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1 }}>{t("PRIORITY_LOW_COUNT")}</Text>
                    <Text style={{ flex: 1, textAlign: 'left' }}> {statistics.count_low}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1 }}>{t("PRIORITY_MEDIUM_COUNT")}</Text>
                    <Text style={{ flex: 1, textAlign: 'left' }}> {statistics.count_medium}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1 }}>{t("PRIORITY_HIGH_COUNT")}</Text>
                    <Text style={{ flex: 1, textAlign: 'left' }}> {statistics.count_high}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>{t("TOTAL_TICKETS_COUNT")}</Text>
                    <Text style={{ flex: 1, textAlign: 'left', fontWeight: 'bold' }}> {statistics.count_all}</Text>
                  </View>
                </View>
              </View>
              : <Text style={{ flex: 1 }}>{t("NO_DATA")}</Text>}
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

  }

});
export default DashboardStatistics;