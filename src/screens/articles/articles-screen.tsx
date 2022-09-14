import React from "react";
import { Text } from "react-native";

import Container from "../../../src/components/Container";
import { articlesScreenStyles } from "./articles-screen-styles";

const ArticlesScreen = (): JSX.Element => {
  return (<Container style={articlesScreenStyles.container}>
    <Text>
      {"Articles list placeholder here"}
    </Text>
  </Container>);
}

export default ArticlesScreen;