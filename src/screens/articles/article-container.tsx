import React, { useState } from "react";
import { View } from "react-native";
import ArticleCard from "./article-card";
import ArticlesList from "./articles-list";

const ArticleContainer = (): JSX.Element => {
  const [showArticlesList, setShowArticlesList] = useState(true);
  const [selectedArticleId, setSelectedArticleId] = useState(-1);

  const onArticleSelected = (articleId: number) => {
    setSelectedArticleId(articleId);
    setShowArticlesList(false);
  }

  const onArticleClosed = () => {
    setShowArticlesList(true);
  }

  const toggleArticlesList = (): JSX.Element => {
    if (showArticlesList)
      return <ArticlesList onArticleSelected={onArticleSelected}/>;
    
    return <ArticleCard articleId={selectedArticleId} onArticleClosed={onArticleClosed}/>;
  }

  return (
    <View>
      {toggleArticlesList()}
    </View>
  );
};

export default ArticleContainer;