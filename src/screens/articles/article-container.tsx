import React, { useState } from "react";
import { View } from "react-native";
import ArticleCard from "./article-card";
import ArticlesList from "./articles-list";

const ArticleContainer = (): JSX.Element => {
  const [showArticlesList, setShowArticlesList] = useState(true);
  const [selectedArticleId, setSelectedArticleId] = useState(-1);

  const toggleArticlesList = (): JSX.Element => {
    if (showArticlesList)
      return <ArticlesList />;
    
    return <ArticleCard articleId={selectedArticleId}/>;
  }

  return (
    <View>
      {toggleArticlesList()}
    </View>
  );
};

export default ArticleContainer;