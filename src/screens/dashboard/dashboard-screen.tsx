import React from "react";
import { StyleSheet } from "react-native";
import { NavigationType } from "../../models/dashboard/navigation-enum";
import BottomNavigation from "../../components/bottom-navigation";

import Container from "../../components/container";
import DashboardStatistics from "./dashboard-statistics";

const DashboardScreen = (): JSX.Element => {
  return (
    <Container style={styles.container}>
      <DashboardStatistics />
      <BottomNavigation type={NavigationType.DASHBOARD}/>
    </Container>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    color: '#000'
  }
});

export default DashboardScreen;