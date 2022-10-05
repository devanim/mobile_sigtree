import { View, Text } from "react-native";
import sectionTitleStyles from "./section-title-styles";

const SectionTitle = (props: SectionTitleProps): JSX.Element => {
  return (
    <>
      <View style={sectionTitleStyles.breakLine} />
      <Text style={sectionTitleStyles.sectionText}>
        {props.title}
      </Text>
      <View style={sectionTitleStyles.breakLine} />
    </>
  );
};

type SectionTitleProps = {
  title: string
}

export default SectionTitle;