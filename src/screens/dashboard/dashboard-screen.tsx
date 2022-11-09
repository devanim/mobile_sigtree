import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationType } from "../../models/dashboard/navigation-enum";
import BottomNavigation from "../../components/bottom-navigation";

import Container from "../../components/container";
import DashboardStatistics from "./dashboard-statistics";

const DashboardScreen = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <DashboardStatistics />
      <BottomNavigation type={NavigationType.DASHBOARD}/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    color: '#000'
  }
});

export default DashboardScreen;