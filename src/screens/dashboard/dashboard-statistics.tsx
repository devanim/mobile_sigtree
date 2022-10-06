import React, { useEffect, useState } from "react";

import { ScrollView } from "react-native";
import { RefreshControl } from "react-native-web-refresh-control";

import Carousel from "../../components/carousel/carousel";
import ArticleBrief from "../../models/article/article-brief";
import { ResponseStatus } from "../../utils/response-status-enum";
import { mockArticles } from "../articles/mock-articles";
import { TicketBrief } from "../../models/ticket/ticket-brief";
import { mockTickets } from "../tickets/mock-tickets";
import ArticleBriefCard from "../articles/article-brief-card";
import TicketBriefCard from "../tickets/ticket-brief-card";
import { dashboardStatisticsStyles } from "./dashboard-statistics-styles";
import { AppStackParamList } from "src/routing/route-screens";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const DashboardStatistics = (): JSX.Element => {
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const [articles, setArticles] = useState<ArticleBrief[] | undefined>([]);
  const [tickets, setTickets] = useState<TicketBrief[] | undefined>([]);

  useEffect(() => {
    //TODO - replace with axios call to back-end
    const requestResponse = mockArticles;

    if (requestResponse.status === ResponseStatus.fail) {
      alert("Could not retrieve articles data from back-end");
    }

    setArticles(requestResponse.data?.articles);
  }, []);

  useEffect(() => {
    //TODO - replace with axios call to back-end
    const requestResponse = mockTickets;

    if (requestResponse.status === ResponseStatus.fail) {
      alert("Could not retrieve tickets data from back-end");
    }

    setTickets(requestResponse.data?.tickets);
  }, []);

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
  
  return (
    <ScrollView contentContainerStyle={dashboardStatisticsStyles.content} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl tintColor="#F0DF67" />}>
      <Carousel name={"Articles"} data={articleCarouselData ?? []}/>
      <Carousel name={"Tickets"} data={ticketCarouselData ?? []}/>
    </ScrollView>
  );
};

export default DashboardStatistics