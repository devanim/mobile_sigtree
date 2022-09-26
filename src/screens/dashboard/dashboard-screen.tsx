import React, { useEffect, useState } from "react";
import { Layout } from "@ui-kitten/components";

import Container from "../../components/container";
import { dashboardStyles } from "./dashboard-screen-styles";
import NavigationAction from "../../components/navigation-action";
import useLayout from "../../hooks/useLayout";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native-web-refresh-control";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../routing/route-screens";
import Carousel from "../../components/carousel/carousel";
import ArticleBrief from "../../models/article/article-brief";
import { ResponseStatus } from "../../utils/response-status-enum";
import { mockArticles } from "../articles/mock-articles";
import { TicketBrief } from "../../models/ticket/ticket-brief";
import { mockTickets } from "../tickets/mock-tickets";
import ArticleBriefCard from "../articles/article-brief-card";
import TicketBriefCard from "../tickets/ticket-brief-card";

const DashboardScreen = (): JSX.Element => {
  const layoutData = useLayout();
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
    //TODO - redirect to article screen
    alert(`Selected article with title ${article.title}. Soon it will redirect there`);
  }

  const onTicketSelected = (ticket: TicketBrief) => {
    //TODO - redirect to ticket screen
    alert(`Selected ticket with id ${ticket.id}. Soon it will redirect there`);
  }

  const articleCarouselData = articles?.map((article: ArticleBrief) => {
    return {
      data: article,
      childComponent: (<ArticleBriefCard articleBrief={article} onArticleSelected={() => onArticleSelected(article)}/>)
    }
  });

  const ticketCarouselData = tickets?.map((ticket: TicketBrief) => {
    return {
      data: ticket,
      childComponent: (<TicketBriefCard ticketBrief={ticket} onTicketSelected={() => onTicketSelected(ticket)}/>)
    }
  });

  return (<Container style={dashboardStyles.container}>
    <ScrollView
        contentContainerStyle={dashboardStyles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      >
        <Carousel name={"Articles"} data={articleCarouselData ?? []}/>
        <Carousel name={"Tickets"} data={ticketCarouselData ?? []}/>
    </ScrollView>
    <Layout level="2" style={[dashboardStyles.bottomTab, { paddingBottom: layoutData.bottom  }]}>
      <NavigationAction icon="house" status="primary" size="medium" onPress={() => navigate("DashboardNavigator", {screen: "DashboardScreen"})} />
      <NavigationAction icon="book" status="snow" size="medium" onPress={() => navigate("DashboardNavigator", {screen: "ArticlesScreen"})} />
      <NavigationAction icon="calendar" status="snow" size="medium" onPress={() => navigate("DashboardNavigator", {screen: "TicketsScreen"})}/>
      <NavigationAction icon="user" status="snow" size="medium" onPress={() => navigate("DashboardNavigator", {screen: "UserScreen"})}/>
    </Layout>
  </Container>)
};

export default DashboardScreen;