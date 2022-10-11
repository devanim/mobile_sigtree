import React, { useContext, useEffect, useState } from "react";

import { ScrollView } from "react-native";
import { RefreshControl } from "react-native-web-refresh-control";
import axios from "axios";

import Carousel from "../../components/carousel/carousel";
import ArticleBrief from "../../models/article/article-brief";
import { TicketBrief } from "../../models/ticket/ticket-brief";
import ArticleBriefCard from "../articles/article-brief-card";
import TicketBriefCard from "../tickets/ticket-brief-card";
import { dashboardStatisticsStyles } from "./dashboard-statistics-styles";
import { AppStackParamList } from "src/routing/route-screens";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import LocalizationContext from "../../localization/localization-context";
import Error, { ErrorProps } from "../../components/error";
import { AUTH_MOCK, CONFIG, SCREEN_URL } from "../../models/mock-auth";
import ArticleListPayload from "src/models/article/article-list-payload";
import { TicketListPayload } from "src/models/ticket/ticket-list-payload";

const DashboardStatistics = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [articles, setArticles] = useState<ArticleBrief[]>([]);
  const [tickets, setTickets] = useState<TicketBrief[]>([]);

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

  const getArticles = async () => {
    try {
      const reqUrl = `${SCREEN_URL.ARTICLES_URL}?count=${CONFIG.ITEMS_PER_CAROUSEL}`;
      const response = await axios.get<ArticleListPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${AUTH_MOCK.TOKEN}` },
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
      const reqUrl = `${SCREEN_URL.TICKETS_URL}?count=${CONFIG.ITEMS_PER_CAROUSEL}`;
      const response = await axios.get<TicketListPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${AUTH_MOCK.TOKEN}` },
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

  const onArticleSelected = (article: ArticleBrief) => {
    navigate("ArticleScreen", { screen: "ArticleScreen", params: {articleId: article.id} });
  }

  const onTicketSelected = (ticket: TicketBrief) => {
    navigate("TicketScreen", { screen: "TicketScreen", params: {ticketId: ticket.id} });
  }
  
  const articleCarouselData = articles?.map((article: ArticleBrief, idx: number) => {
    return {
      data: article,
      childComponent: (<ArticleBriefCard key={idx} articleBrief={article} onArticleSelected={() => onArticleSelected(article)}/>)
    }
  });

  const ticketCarouselData = tickets?.map((ticket: TicketBrief, idx: number) => {
    return {
      data: ticket,
      childComponent: (<TicketBriefCard key={idx} ticketBrief={ticket} onTicketSelected={() => onTicketSelected(ticket)}/>)
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

  return (
    <ScrollView contentContainerStyle={dashboardStatisticsStyles.content} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl tintColor="#F0DF67" />}>
      <Carousel name={"Articles"} data={articleCarouselData ?? []}/>
      <Carousel name={"Tickets"} data={ticketCarouselData ?? []}/>
    </ScrollView>
  );
};

export default DashboardStatistics