import { StyleService, useStyleSheet } from "@ui-kitten/components";
import Container from "components/Container";
import React from "react";

const RealmSelector = () => {
  const styles = useStyleSheet(themedStyles);

  return <Container style={styles.container} level="1"></Container>;
};

export default RealmSelector;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  }
});