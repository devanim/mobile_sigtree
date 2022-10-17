import React from "react";

import Container from "../../components/container";

import { homeScreenStyles } from "./home-screen-styles";
import RealmContainer from "./realm-handler/realm-container";

const HomeScreen = (): JSX.Element => {
  return (
    <Container style={homeScreenStyles.container}>
      <RealmContainer />
    </Container>
  );
};

export default HomeScreen;
