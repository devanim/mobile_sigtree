import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

const SectionTitle = (props: SectionTitleProps): JSX.Element => {
  return (
    <Text style={styles.sectionText}>
      {props.title}
    </Text>
  );
};

type SectionTitleProps = {
  title: string
}

const styles = StyleSheet.create({
  sectionText: {
    fontWeight: "bold",
    marginBottom: '2.5%'
  },
});

export default SectionTitle;