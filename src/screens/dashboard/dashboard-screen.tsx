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

const DashboardScreen = (): JSX.Element => {
  const layoutData = useLayout();
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const [articles, setArticles] = useState<ArticleBrief[] | undefined>([]);

  useEffect(() => {
    //TODO - replace with axios call to back-end
    const requestResponse = mockArticles;

    if (requestResponse.status === ResponseStatus.fail) {
      alert("Could not retrieve articles data from back-end");
    }

    setArticles(requestResponse.data?.articles);
  }, []);

  const onArticleSelected = (article: ArticleBrief) => {
    //TODO - redirect to article screen
    alert(`Selected article with title ${article.title}. Soon it will redirect there`);
  }

  const articleCarouselData = articles?.map((article: ArticleBrief) => {
    return {
      data: article,
      onSelected: () => onArticleSelected(article)
    }
  });

  return (<Container style={dashboardStyles.container}>
    <ScrollView
        contentContainerStyle={dashboardStyles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      >
        <Carousel name={"Articles"} data={articleCarouselData ?? []}/>
        {/* <Header />
        <BestSeller />
        <Gallery /> */}
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