import React from "react";
import { Text } from "react-native";

import Container from "components/Container";
import { articlesListStyles } from "./articles-list-styles";

const ArticlesList = (): JSX.Element => {
  return (<Container style={articlesListStyles.container}>
    <Text>
      {"Articles list placeholder here"}
    </Text>
  </Container>);
}

export default ArticlesList;